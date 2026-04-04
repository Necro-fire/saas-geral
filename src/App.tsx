import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Financeiro from "./pages/Financeiro";
import PDV from "./pages/PDV";
import Clientes from "./pages/Clientes";
import Checklists from "./pages/Checklists";
import Caixa from "./pages/Caixa";
import Usuarios from "./pages/Usuarios";
import Notificacoes from "./pages/Notificacoes";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="pdv" element={<PDV />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="checklists" element={<Checklists />} />
            <Route path="caixa" element={<Caixa />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="notificacoes" element={<Notificacoes />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
