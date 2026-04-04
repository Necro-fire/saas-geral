import { useState } from 'react';
import { NeonCard } from '@/components/ui/neon-card';
import { Users, Search, Plus, Mail, Phone, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  pedidos: number;
  totalGasto: number;
  ultimoPedido: string;
}

const mockClientes: Cliente[] = [
  { id: '1', nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-0001', pedidos: 12, totalGasto: 580, ultimoPedido: '2026-04-02' },
  { id: '2', nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 99999-0002', pedidos: 8, totalGasto: 420, ultimoPedido: '2026-04-01' },
  { id: '3', nome: 'Carlos Oliveira', email: 'carlos@email.com', telefone: '(11) 99999-0003', pedidos: 25, totalGasto: 1200, ultimoPedido: '2026-04-03' },
  { id: '4', nome: 'Ana Costa', email: 'ana@email.com', telefone: '(11) 99999-0004', pedidos: 5, totalGasto: 210, ultimoPedido: '2026-03-28' },
];

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const filtered = mockClientes.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Clientes</h1>
            <p className="text-xs text-muted-foreground">{mockClientes.length} cadastrados</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 text-xs bg-primary hover:bg-primary/90">
          <Plus className="w-3.5 h-3.5" /> Novo Cliente
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input placeholder="Buscar por nome ou email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary text-xs" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <NeonCard key={c.id} delay={i * 80} className="cursor-pointer" hover>
            <div onClick={() => setSelectedCliente(c)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {c.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.nome}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {c.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Pedidos</p>
                  <p className="text-sm font-bold text-primary">{c.pedidos}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Total</p>
                  <p className="text-sm font-bold">R$ {c.totalGasto.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase">Último</p>
                  <p className="text-sm font-medium text-muted-foreground">{new Date(c.ultimoPedido).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                </div>
              </div>
            </div>
          </NeonCard>
        ))}
      </div>

      <Dialog open={!!selectedCliente} onOpenChange={() => setSelectedCliente(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
          </DialogHeader>
          {selectedCliente && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg neon-glow">
                  {selectedCliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-base font-bold">{selectedCliente.nome}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedCliente.email}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedCliente.telefone}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-primary">{selectedCliente.pedidos}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Pedidos</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold">R$ {selectedCliente.totalGasto}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Total Gasto</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold">R$ {(selectedCliente.totalGasto / selectedCliente.pedidos).toFixed(0)}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Ticket Médio</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><History className="w-3 h-3" /> Histórico</h4>
                <p className="text-xs text-muted-foreground">Último pedido em {new Date(selectedCliente.ultimoPedido).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-sm">Novo Cliente</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome completo" className="bg-secondary text-sm" />
            <Input placeholder="Email" className="bg-secondary text-sm" />
            <Input placeholder="Telefone" className="bg-secondary text-sm" />
            <Button className="w-full">Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
