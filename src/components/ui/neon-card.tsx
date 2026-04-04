import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  float?: boolean;
  delay?: number;
}

export function NeonCard({ children, className, glow, hover = true, float, delay = 0 }: NeonCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-5 transition-all duration-300 animate-fade-in',
        hover && 'hover:border-primary/30 hover:shadow-[0_0_20px_hsl(82_85%_50%/0.1)] hover:-translate-y-0.5',
        glow && 'neon-glow',
        float && 'animate-float',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, trend, trendUp, delay = 0 }: StatCardProps) {
  return (
    <NeonCard delay={delay} className="group">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:neon-glow">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
        {value}
      </p>
      {trend && (
        <p className={`text-[11px] mt-1 font-medium ${trendUp ? 'text-primary' : 'text-destructive'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </NeonCard>
  );
}
