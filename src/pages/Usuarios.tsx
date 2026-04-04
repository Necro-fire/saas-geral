import { useState } from 'react';
import { NeonCard } from '@/components/ui/neon-card';
import { Shield, User, Lock, Eye, Edit, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { fmtDate } from '@/lib/caixa-utils';

interface UserData {
  id: string;
  nome: string;
  cargo: string;
  role: 'admin' | 'employee';
  ativo: boolean;
  permissions: string[];
}

const mockUsers: UserData[] = [
  { id: '1', nome: 'Admin Principal', cargo: 'Gerente', role: 'admin', ativo: true, permissions: ['all'] },
  { id: '2', nome: 'João Operador', cargo: 'Atendente', role: 'employee', ativo: true, permissions: ['pdv', 'produtos'] },
  { id: '3', nome: 'Maria Caixa', cargo: 'Caixa', role: 'employee', ativo: true, permissions: ['pdv', 'caixa'] },
  { id: '4', nome: 'Pedro Ex-Func', cargo: 'Atendente', role: 'employee', ativo: false, permissions: ['pdv'] },
];

const permissionLabels: Record<string, string> = {
  all: 'Acesso Total',
  pdv: 'PDV',
  produtos: 'Produtos',
  caixa: 'Caixa',
  financeiro: 'Financeiro',
  clientes: 'Clientes',
  configuracoes: 'Configurações',
};

export default function Usuarios() {
  const { auditLogs } = useStore();
  const [tab, setTab] = useState<'usuarios' | 'auditoria'>('usuarios');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Usuários e Permissões</h1>
            <p className="text-xs text-muted-foreground">Controle de acesso e auditoria</p>
          </div>
        </div>
        <Button className="gap-2 text-xs"><Plus className="w-3.5 h-3.5" /> Novo Usuário</Button>
      </div>

      <div className="flex gap-1 bg-card border border-border rounded-lg p-1 w-fit">
        {[
          { key: 'usuarios' as const, label: 'Usuários', icon: User },
          { key: 'auditoria' as const, label: 'Auditoria', icon: History },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
              tab === t.key ? 'bg-primary text-primary-foreground neon-glow' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'usuarios' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockUsers.map((user, i) => (
            <NeonCard key={user.id} delay={i * 80} className={!user.ativo ? 'opacity-50' : ''}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {user.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.nome}</p>
                    <p className="text-[11px] text-muted-foreground">{user.cargo}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                }`}>
                  {user.role === 'admin' ? 'Admin' : 'Funcionário'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {user.permissions.map(p => (
                  <span key={p} className="text-[10px] px-2 py-0.5 bg-secondary rounded text-muted-foreground flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    {permissionLabels[p] || p}
                  </span>
                ))}
              </div>
              <div className="flex justify-end gap-1 mt-3">
                <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-3.5 h-3.5" /></button>
              </div>
            </NeonCard>
          ))}
        </div>
      )}

      {tab === 'auditoria' && (
        <NeonCard>
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {auditLogs.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">Nenhum registro</p>
            ) : (
              auditLogs.slice(0, 30).map((log, i) => (
                <div key={log.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/30 transition-colors text-xs animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{log.action}</span>
                    <span className="text-foreground">{log.details}</span>
                  </div>
                  <span className="text-muted-foreground tabular-nums">{fmtDate(log.date)}</span>
                </div>
              ))
            )}
          </div>
        </NeonCard>
      )}
    </div>
  );
}
