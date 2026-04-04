import { useState } from 'react';
import { NeonCard } from '@/components/ui/neon-card';
import { CheckSquare, Check, Sun, Moon, Building2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

interface ChecklistGroup {
  id: string;
  title: string;
  icon: React.ElementType;
  items: ChecklistItem[];
}

const initialChecklists: ChecklistGroup[] = [
  {
    id: 'abertura', title: 'Abertura', icon: Sun,
    items: [
      { id: 'a1', text: 'Verificar estoque de insumos', done: false },
      { id: 'a2', text: 'Ligar equipamentos', done: false },
      { id: 'a3', text: 'Conferir caixa inicial', done: false },
      { id: 'a4', text: 'Limpar área de trabalho', done: false },
      { id: 'a5', text: 'Verificar pedidos pendentes', done: false },
    ],
  },
  {
    id: 'fechamento', title: 'Fechamento', icon: Moon,
    items: [
      { id: 'f1', text: 'Fechar o caixa', done: false },
      { id: 'f2', text: 'Limpar equipamentos', done: false },
      { id: 'f3', text: 'Conferir estoque final', done: false },
      { id: 'f4', text: 'Desligar equipamentos', done: false },
      { id: 'f5', text: 'Trancar o estabelecimento', done: false },
    ],
  },
  {
    id: 'setores', title: 'Setores', icon: Building2,
    items: [
      { id: 's1', text: 'Cozinha - inspeção de limpeza', done: false },
      { id: 's2', text: 'Salão - organização das mesas', done: false },
      { id: 's3', text: 'Estoque - inventário rápido', done: false },
      { id: 's4', text: 'Banheiros - limpeza e reposição', done: false },
    ],
  },
];

export default function Checklists() {
  const [checklists, setChecklists] = useState(initialChecklists);

  const toggleItem = (groupId: string, itemId: string) => {
    setChecklists(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, items: g.items.map(item => item.id === itemId ? { ...item, done: !item.done } : item) }
        : g
    ));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center neon-glow">
          <CheckSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Checklists</h1>
          <p className="text-xs text-muted-foreground">Abertura, fechamento e setores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {checklists.map((group, gi) => {
          const doneCount = group.items.filter(i => i.done).length;
          const total = group.items.length;
          const progress = total > 0 ? (doneCount / total) * 100 : 0;
          const allDone = doneCount === total;

          return (
            <NeonCard key={group.id} delay={gi * 100} glow={allDone}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  allDone ? 'bg-primary/20 neon-glow' : 'bg-secondary'
                }`}>
                  <group.icon className={`w-4 h-4 ${allDone ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{group.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{doneCount}/{total} concluídos</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-secondary rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${allDone ? 'bg-primary neon-glow' : 'bg-primary/60'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Items */}
              <div className="space-y-1">
                {group.items.map((item, ii) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(group.id, item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all duration-300 group animate-fade-in ${
                      item.done
                        ? 'bg-primary/5 border border-primary/20'
                        : 'bg-secondary/30 border border-transparent hover:border-border hover:bg-secondary/50'
                    }`}
                    style={{ animationDelay: `${gi * 100 + ii * 50}ms` }}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      item.done
                        ? 'bg-primary border-primary neon-glow scale-110'
                        : 'border-border group-hover:border-primary/50'
                    }`}>
                      {item.done && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    <span className={`transition-all duration-300 ${item.done ? 'text-primary line-through opacity-70' : 'text-foreground'}`}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </NeonCard>
          );
        })}
      </div>
    </div>
  );
}
