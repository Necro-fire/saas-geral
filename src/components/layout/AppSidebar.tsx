import { 
  LayoutDashboard, Package, DollarSign, ShoppingCart, Users, 
  CheckSquare, Shield, Bell, Settings, ChevronLeft, ChevronRight,
  Wallet, Zap
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/produtos', label: 'Produtos', icon: Package },
  { to: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { to: '/pdv', label: 'PDV', icon: ShoppingCart },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/checklists', label: 'Checklists', icon: CheckSquare },
  { to: '/caixa', label: 'Caixa', icon: Wallet },
  { to: '/usuarios', label: 'Usuários', icon: Shield },
  { to: '/notificacoes', label: 'Notificações', icon: Bell },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { cashRegister } = useStore();
  const isRegisterOpen = cashRegister && !cashRegister.closedAt;

  return (
    <aside className={`${collapsed ? 'w-[68px]' : 'w-[240px]'} h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 neon-glow">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold text-foreground tracking-tight whitespace-nowrap animate-fade-in">
              Feliz<span className="text-primary">Pro</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 relative ${
                isActive 
                  ? 'bg-primary/10 text-primary neon-glow' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              <item.icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
              {item.to === '/caixa' && isRegisterOpen && !collapsed && (
                <span className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
              )}
              {item.to === '/notificacoes' && !collapsed && (
                <span className="ml-auto text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full font-bold">3</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </aside>
  );
}
