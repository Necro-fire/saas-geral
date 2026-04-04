import { Outlet } from 'react-router-dom';
import { FloatingTopNav } from './FloatingTopNav';

export function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[100px]" />
      </div>

      <FloatingTopNav />
      <main className="flex-1 overflow-y-auto relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
