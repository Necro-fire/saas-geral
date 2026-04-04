import { 
  LayoutDashboard, Package, DollarSign, ShoppingCart, Users, 
  CheckSquare, Shield, Bell, Settings, Wallet, Zap, Search, Menu, X
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';

const allNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/pdv', label: 'PDV', icon: ShoppingCart },
  { to: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { to: '/caixa', label: 'Caixa', icon: Wallet },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/checklists', label: 'Checklists', icon: CheckSquare },
  { to: '/usuarios', label: 'Usuários', icon: Shield },
  { to: '/notificacoes', label: 'Notificações', icon: Bell },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function FloatingTopNav() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cashRegister } = useStore();
  const isRegisterOpen = cashRegister && !cashRegister.closedAt;

  useEffect(() => {
    setMobileOpen(false);
    setExpandedItem(null);
  }, [location.pathname]);

  // Close expanded on outside click
  useEffect(() => {
    const handler = () => setExpandedItem(null);
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleIconClick = (to: string, e: React.MouseEvent) => {
    if (expandedItem === to) {
      setExpandedItem(null);
    } else {
      e.preventDefault();
      setExpandedItem(to);
    }
  };

  return (
    <div className="sticky top-0 z-50 px-4 pt-3 pb-0">
      <nav className="glass-strong rounded-2xl depth-2 inner-light transition-all duration-500">
        <div className="flex items-center h-14 px-5">
          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2.5 mr-6 group">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-all duration-300 group-hover:neon-glow group-hover:scale-110">
              <Zap className="w-4 h-4 text-primary" />
            </div>
          </NavLink>

          {/* Desktop Nav - Icons only */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {allNav.map((item) => {
              const isActive = location.pathname === item.to;
              const isExpanded = expandedItem === item.to;
              return (
                <div key={item.to} className="relative" onMouseDown={(e) => e.stopPropagation()}>
                  {/* Icon button */}
                  <button
                    onClick={(e) => handleIconClick(item.to, e)}
                    className={`nav-icon-btn group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-primary/15 text-primary nav-icon-active'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]' : ''}`} />
                    
                    {/* Glow effect on hover */}
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/5 pointer-events-none" />
                    
                    {/* Active indicator line */}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                    )}

                    {/* Caixa pulse */}
                    {item.to === '/caixa' && isRegisterOpen && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
                    )}

                    {/* Notification badge */}
                    {item.to === '/notificacoes' && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[8px] text-destructive-foreground flex items-center justify-center font-bold animate-pulse">3</span>
                    )}
                  </button>

                  {/* Expanded label tooltip */}
                  {isExpanded && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 animate-scale-in">
                      <NavLink
                        to={item.to}
                        className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl depth-2 inner-light text-xs font-medium whitespace-nowrap text-foreground hover:text-primary transition-colors duration-200"
                      >
                        <item.icon className="w-3.5 h-3.5 text-primary" />
                        <span>{item.label}</span>
                      </NavLink>
                      {/* Arrow */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass-strong" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {isRegisterOpen && (
              <span className="hidden sm:inline text-[10px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full font-medium animate-pulse-neon">
                Caixa Aberto
              </span>
            )}

            {/* Search */}
            <button className="hidden md:flex relative w-8 h-8 rounded-xl bg-secondary/50 items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-300 hover:scale-110">
              <Search className="w-4 h-4" />
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
            <div className="p-3 grid grid-cols-5 gap-1">
              {allNav.map((item, i) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-[10px] font-medium transition-all duration-200 animate-fade-in ${
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
