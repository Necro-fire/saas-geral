import { useStore } from '@/store/useStore';
import { StatCard, NeonCard } from '@/components/ui/neon-card';
import { TrendingUp, ShoppingBag, Receipt, PieChart, ArrowRight, ShoppingCart, Package, DollarSign, Users } from 'lucide-react';
import { fmt } from '@/lib/caixa-utils';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { sales, products } = useStore();

  const totalRevenue = sales.reduce((s, sale) => s + sale.total, 0) + 10;
  const totalSales = sales.length;
  const avgTicket = totalSales > 0 ? totalRevenue / totalSales : 0;
  const totalCost = sales.reduce(
    (s, sale) => s + sale.items.reduce((s2, i) => s2 + i.product.cost * i.quantity, 0), 0
  );
  const profit = totalRevenue - totalCost;
  const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

  const chartData = sales.slice(-7).map((sale, i) => ({
    name: `Venda ${i + 1}`,
    receita: sale.total,
    custo: sale.items.reduce((s, item) => s + item.product.cost * item.quantity, 0),
  }));

  const productSales: Record<string, { name: string; qty: number; revenue: number }> = {};
  sales.forEach((sale) => {
    sale.items.forEach((item) => {
      if (!productSales[item.product.id]) {
        productSales[item.product.id] = { name: item.product.name, qty: 0, revenue: 0 };
      }
      productSales[item.product.id].qty += item.quantity;
      productSales[item.product.id].revenue += item.product.price * item.quantity;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.qty - a.qty).slice(0, 5);

  const shortcuts = [
    { label: 'Abrir PDV', icon: ShoppingCart, to: '/pdv', color: 'bg-primary/10 text-primary' },
    { label: 'Produtos', icon: Package, to: '/produtos', color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Financeiro', icon: DollarSign, to: '/financeiro', color: 'bg-yellow-500/10 text-yellow-400' },
    { label: 'Clientes', icon: Users, to: '/clientes', color: 'bg-purple-500/10 text-purple-400' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Section title */}
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Visão geral do seu negócio</p>
        <div className="glow-line mt-3 w-24" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Faturamento" value={fmt(totalRevenue)} icon={TrendingUp} trend="+12% este mês" trendUp delay={0} />
        <StatCard label="Total Vendas" value={totalSales.toString()} icon={ShoppingBag} trend="+8 hoje" trendUp delay={100} />
        <StatCard label="Ticket Médio" value={fmt(avgTicket)} icon={Receipt} trend="+5.2%" trendUp delay={200} />
        <StatCard label="Margem" value={`${margin.toFixed(1)}%`} icon={PieChart} trend="Estável" trendUp delay={300} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <NeonCard className="lg:col-span-2" delay={400}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Receita vs Custo</h3>
          <div className="h-[220px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(82, 85%, 50%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(82, 85%, 50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(220, 8%, 55%)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 8%, 55%)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ 
                      background: 'hsl(220, 18%, 12%)', 
                      border: '1px solid hsl(220, 10%, 25%)', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      boxShadow: '0 10px 40px hsl(220 20% 4% / 0.5)',
                      backdropFilter: 'blur(20px)',
                    }}
                    labelStyle={{ color: 'hsl(220, 10%, 92%)' }}
                  />
                  <Area type="monotone" dataKey="receita" stroke="hsl(82, 85%, 50%)" fill="url(#colorReceita)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="custo" stroke="hsl(0, 72%, 51%)" fill="url(#colorCusto)" strokeWidth={1.5} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-xs">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p>Realize vendas para ver o gráfico</p>
                </div>
              </div>
            )}
          </div>
        </NeonCard>

        {/* Financial Summary */}
        <NeonCard delay={500}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Resultado Financeiro</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Receita bruta</span>
              <span className="tabular-nums font-medium">{fmt(totalRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Custo produtos</span>
              <span className="text-destructive tabular-nums">− {fmt(totalCost)}</span>
            </div>
            <div className="glow-line my-1" />
            <div className="flex justify-between font-semibold pt-1">
              <span>Lucro líquido</span>
              <span className={`tabular-nums ${profit >= 0 ? 'text-primary neon-text' : 'text-destructive'}`}>{fmt(profit)}</span>
            </div>
          </div>

          {/* Top Products */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Top Produtos</h3>
            {topProducts.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sem dados</p>
            ) : (
              <div className="space-y-2">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center justify-between text-xs group animate-fade-in" style={{ animationDelay: `${600 + i * 60}ms` }}>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-lg bg-primary/10 text-[10px] flex items-center justify-center font-bold text-primary group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">{i + 1}</span>
                      <span className="text-foreground group-hover:text-primary transition-colors duration-300">{p.name}</span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">{p.qty}×</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </NeonCard>
      </div>

      {/* Quick Shortcuts */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Atalhos Rápidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shortcuts.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="group card-3d rounded-2xl p-4 flex items-center gap-3 transition-all duration-500 hover:-translate-y-1 animate-pop-in inner-light relative overflow-hidden"
              style={{ animationDelay: `${600 + i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">{s.label}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
