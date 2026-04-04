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
        'card-3d rounded-2xl p-5 transition-all duration-500 animate-pop-in inner-light relative overflow-hidden',
        hover && 'hover:-translate-y-1 cursor-default',
        glow && 'animate-glow-pulse',
        float && 'animate-float-subtle',
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
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
        {value}
      </p>
      {trend && (
        <p className={`text-[11px] mt-1.5 font-medium flex items-center gap-1 ${trendUp ? 'text-primary' : 'text-destructive'}`}>
          <span className={`inline-block transition-transform duration-300 ${trendUp ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`}>
            {trendUp ? '↑' : '↓'}
          </span> 
          {trend}
        </p>
      )}
    </NeonCard>
  );
}
