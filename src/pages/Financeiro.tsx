import { useState } from 'react';
import { NeonCard } from '@/components/ui/neon-card';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, PieChart } from 'lucide-react';
import { fmt } from '@/lib/caixa-utils';
import { useStore } from '@/store/useStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from 'recharts';

export default function Financeiro() {
  const { sales, cashRegister, cashHistory } = useStore();
  const [tab, setTab] = useState<'fluxo' | 'pagar' | 'receber'>('fluxo');

  const totalReceita = sales.reduce((s, sale) => s + sale.total, 0);
  const totalCusto = sales.reduce((s, sale) => s + sale.items.reduce((s2, i) => s2 + i.product.cost * i.quantity, 0), 0);
  const lucro = totalReceita - totalCusto;

  // Payment method breakdown for pie chart
  const paymentTotals: Record<string, number> = {};
  sales.forEach(sale => {
    sale.payments.forEach(p => {
      const label = p.method === 'dinheiro' ? 'Dinheiro' : p.method === 'pix' ? 'Pix' : 'Cartão';
      paymentTotals[label] = (paymentTotals[label] || 0) + p.amount;
    });
  });
  const pieData = Object.entries(paymentTotals).map(([name, value]) => ({ name, value }));
  const COLORS = ['hsl(82, 85%, 50%)', 'hsl(200, 80%, 50%)', 'hsl(280, 70%, 55%)'];

  // Mock contas a pagar/receber
  const contasPagar = [
    { id: '1', desc: 'Fornecedor de insumos', valor: 2500, vencimento: '2026-04-10', status: 'pendente' },
    { id: '2', desc: 'Aluguel do espaço', valor: 3800, vencimento: '2026-04-15', status: 'pendente' },
    { id: '3', desc: 'Energia elétrica', valor: 890, vencimento: '2026-04-05', status: 'vencida' },
  ];

  const contasReceber = [
    { id: '1', desc: 'Evento corporativo', valor: 4500, vencimento: '2026-04-08', status: 'pendente' },
    { id: '2', desc: 'Delivery - empresa X', valor: 1200, vencimento: '2026-04-12', status: 'pendente' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NeonCard delay={0} glow>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Receita Total</p>
              <p className="text-xl font-bold text-primary neon-text">{fmt(totalReceita)}</p>
            </div>
          </div>
        </NeonCard>
        <NeonCard delay={100}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Custos</p>
              <p className="text-xl font-bold text-destructive">{fmt(totalCusto)}</p>
            </div>
          </div>
        </NeonCard>
        <NeonCard delay={200}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Lucro Líquido</p>
              <p className={`text-xl font-bold ${lucro >= 0 ? 'text-primary' : 'text-destructive'}`}>{fmt(lucro)}</p>
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-lg p-1 w-fit">
        {[
          { key: 'fluxo' as const, label: 'Fluxo de Caixa' },
          { key: 'pagar' as const, label: 'Contas a Pagar' },
          { key: 'receber' as const, label: 'Contas a Receber' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
              tab === t.key ? 'bg-primary text-primary-foreground neon-glow' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'fluxo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NeonCard delay={300}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Vendas por Método</h3>
            <div className="h-[200px]">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RPieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(150, 8%, 10%)', border: '1px solid hsl(150, 6%, 18%)', borderRadius: '8px', fontSize: '12px' }} />
                  </RPieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-xs">Sem dados</div>
              )}
            </div>
          </NeonCard>
          <NeonCard delay={400}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Histórico de Turnos</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {cashHistory.length === 0 ? (
                <p className="text-xs text-muted-foreground">Nenhum turno registrado</p>
              ) : (
                cashHistory.slice(-5).reverse().map(h => (
                  <div key={h.id} className="flex items-center justify-between py-2 border-b border-border/50 text-xs group hover:bg-secondary/20 rounded px-2 transition-colors">
                    <span className="text-muted-foreground tabular-nums">{new Date(h.openedAt).toLocaleDateString('pt-BR')}</span>
                    <span>{h.sales.length} vendas</span>
                    <span className="text-primary font-semibold tabular-nums">{fmt(h.sales.reduce((s, sale) => s + sale.total, 0))}</span>
                  </div>
                ))
              )}
            </div>
          </NeonCard>
        </div>
      )}

      {tab === 'pagar' && (
        <NeonCard>
          <div className="space-y-3">
            {contasPagar.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50 hover:border-destructive/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <ArrowDownRight className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.desc}</p>
                    <p className="text-[11px] text-muted-foreground">Vence: {new Date(c.vencimento).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-destructive tabular-nums">{fmt(c.valor)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    c.status === 'vencida' ? 'bg-destructive/20 text-destructive' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>{c.status}</span>
                </div>
              </div>
            ))}
          </div>
        </NeonCard>
      )}

      {tab === 'receber' && (
        <NeonCard>
          <div className="space-y-3">
            {contasReceber.map(c => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.desc}</p>
                    <p className="text-[11px] text-muted-foreground">Receber: {new Date(c.vencimento).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary tabular-nums neon-text">{fmt(c.valor)}</p>
              </div>
            ))}
          </div>
        </NeonCard>
      )}
    </div>
  );
}
