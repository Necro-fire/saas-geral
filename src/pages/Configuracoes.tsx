import { useState } from 'react';
import { NeonCard } from '@/components/ui/neon-card';
import { Settings as SettingsIcon, Palette, Image, Percent, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function Configuracoes() {
  const [nomeEmpresa, setNomeEmpresa] = useState('FelizPro');
  const [taxaEntrega, setTaxaEntrega] = useState('5.00');
  const [taxaServico, setTaxaServico] = useState('10');
  const [darkMode, setDarkMode] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
          <SettingsIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Configurações</h1>
          <p className="text-xs text-muted-foreground">Preferências do sistema</p>
        </div>
      </div>

      {/* General */}
      <NeonCard delay={0}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" /> Geral
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1 block">Nome da Empresa</label>
            <Input value={nomeEmpresa} onChange={e => setNomeEmpresa(e.target.value)} className="bg-secondary text-sm" />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1 block">Logo</label>
            <div className="w-20 h-20 bg-secondary rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              <Image className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </div>
      </NeonCard>

      {/* Taxes */}
      <NeonCard delay={100}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Percent className="w-3.5 h-3.5" /> Taxas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1 block">Taxa de Entrega (R$)</label>
            <Input value={taxaEntrega} onChange={e => setTaxaEntrega(e.target.value)} className="bg-secondary text-sm" placeholder="0.00" />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1 block">Taxa de Serviço (%)</label>
            <Input value={taxaServico} onChange={e => setTaxaServico(e.target.value)} className="bg-secondary text-sm" placeholder="10" />
          </div>
        </div>
      </NeonCard>

      {/* Theme */}
      <NeonCard delay={200}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Palette className="w-3.5 h-3.5" /> Aparência
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Modo Escuro</p>
              <p className="text-[11px] text-muted-foreground">Tema neon dark futurista</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Notificações</p>
              <p className="text-[11px] text-muted-foreground">Alertas e avisos do sistema</p>
            </div>
            <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
          </div>
        </div>
      </NeonCard>

      <Button onClick={handleSave} className="w-full gap-2 neon-glow">
        <Save className="w-4 h-4" /> Salvar Configurações
      </Button>
    </div>
  );
}
