import { 
  LayoutDashboard, Package, DollarSign, ShoppingCart, Users, 
  CheckSquare, Shield, Bell, Settings, Wallet, Zap, ChevronDown, Menu, X
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pdv', label: 'PDV', icon: ShoppingCart },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { to: '/caixa', label: 'Caixa', icon: Wallet },
];

const moreNav = [
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/checklists', label: 'Checklists', icon: CheckSquare },
  { to: '/usuarios', label: 'Usuários', icon: Shield },
  { to: '/notificacoes', label: 'Notificações', icon: Bell },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function FloatingTopNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { cashRegister } = useStore();
  const isRegisterOpen = cashRegister && !cashRegister.closedAt;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const isMoreActive = moreNav.some(item => location.pathname === item.to);

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 pb-0">
      <nav className="glass-strong rounded-2xl depth-2 inner-light transition-all duration-500">
        <div className="flex items-center h-14 px-5">
          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2.5 mr-8 group">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all duration-300 group-hover:neon-glow group-hover:scale-110">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-bold tracking-tight hidden sm:block">
              Feliz<span className="gradient-text">Pro</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/15 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 transition-all duration-300 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                  <span>{item.label}</span>
                  {item.to === '/caixa' && isRegisterOpen && (
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </NavLink>
              );
            })}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                  isMoreActive 
                    ? 'bg-primary/15 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <span>Mais</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 glass-strong rounded-xl depth-3 inner-light overflow-hidden animate-slide-down">
                  <div className="py-1.5">
                    {moreNav.map((item, i) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={`flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all duration-200 animate-fade-in ${
                            isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                          }`}
                          style={{ animationDelay: `${i * 40}ms` }}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                          {item.to === '/notificacoes' && (
                            <span className="ml-auto text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full font-bold">3</span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {isRegisterOpen && (
              <span className="hidden sm:inline text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full font-medium animate-pulse-neon">
                Caixa Aberto
              </span>
            )}

            {/* Notification bell */}
            <button className="relative w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 hover:scale-110">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-destructive rounded-full text-[8px] text-destructive-foreground flex items-center justify-center font-bold animate-pulse">3</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/30 animate-slide-down">
            <div className="p-3 grid grid-cols-2 gap-1">
              {[...mainNav, ...moreNav].map((item, i) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 animate-fade-in ${
                      isActive 
                        ? 'bg-primary/15 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                    }`}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
