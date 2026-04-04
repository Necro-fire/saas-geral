import { Bell, User, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/produtos': 'Gestão de Produtos',
  '/financeiro': 'Gestão Financeira',
  '/pdv': 'Ponto de Venda',
  '/clientes': 'Gestão de Clientes',
  '/checklists': 'Checklists',
  '/caixa': 'Caixa',
  '/usuarios': 'Usuários e Permissões',
  '/notificacoes': 'Notificações',
  '/configuracoes': 'Configurações',
};

export function AppHeader() {
  const { userRole } = useStore();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'FelizPro';

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 justify-between shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
        <p className="text-[11px] text-muted-foreground">Bem-vindo de volta</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar..."
            className="h-8 w-48 pl-9 pr-3 rounded-lg bg-secondary border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-105">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-destructive rounded-full text-[8px] text-destructive-foreground flex items-center justify-center font-bold animate-pulse">3</span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-foreground capitalize">{userRole === 'admin' ? 'Administrador' : 'Funcionário'}</p>
            <p className="text-[10px] text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
    </header>
  );
}
