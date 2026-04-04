import { NeonCard } from '@/components/ui/neon-card';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'Estoque baixo', message: 'Pizza Margherita com estoque mínimo atingido', type: 'critical', date: '2026-04-04T10:30:00', read: false },
  { id: '2', title: 'Conta vencida', message: 'Energia elétrica venceu em 05/04', type: 'critical', date: '2026-04-04T09:00:00', read: false },
  { id: '3', title: 'Novo cliente', message: 'Ana Costa se cadastrou no sistema', type: 'success', date: '2026-04-03T18:00:00', read: false },
  { id: '4', title: 'Venda recorde', message: 'Faturamento do dia superou a meta em 20%', type: 'info', date: '2026-04-03T22:00:00', read: true },
  { id: '5', title: 'Checklist pendente', message: 'Checklist de fechamento não foi concluído ontem', type: 'warning', date: '2026-04-03T08:00:00', read: true },
];

const typeConfig = {
  critical: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  warning: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  success: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/30' },
};

export default function Notificacoes() {
  // Sort: unread first, then by date desc. Critical first among unread.
  const sorted = [...mockNotifications].sort((a, b) => {
    if (a.read !== b.read) return a.read ? 1 : -1;
    if (!a.read && !b.read) {
      if (a.type === 'critical' && b.type !== 'critical') return -1;
      if (b.type === 'critical' && a.type !== 'critical') return 1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
          <Bell className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Notificações</h1>
          <p className="text-xs text-muted-foreground">{mockNotifications.filter(n => !n.read).length} não lidas</p>
        </div>
      </div>

      <div className="space-y-2">
        {sorted.map((n, i) => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          return (
            <NeonCard
              key={n.id}
              delay={i * 60}
              className={`flex items-start gap-3 ${!n.read ? `border ${config.border}` : 'opacity-60'}`}
              hover
            >
              <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0 ${n.type === 'critical' ? 'animate-pulse' : ''}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm font-semibold ${n.type === 'critical' && !n.read ? 'text-destructive' : ''}`}>{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                  {new Date(n.date).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </NeonCard>
          );
        })}
      </div>
    </div>
  );
}
