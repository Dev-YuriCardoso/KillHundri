import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Chrome, Share2, PlusSquare, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Install = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/home")}
          className="mb-6"
        >
          ← Voltar
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Como Instalar o App</h1>
            <p className="text-muted-foreground">
              Instale KillHungry's na sua tela inicial para acesso rápido e experiência offline!
            </p>
          </div>

          {/* Android Chrome */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-2">
                <Chrome className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Android (Chrome)</h2>
                <Badge variant="secondary">Mais comum</Badge>
              </div>
            </div>

            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Abra o site no navegador <strong>Chrome</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Toque nos <strong>três pontos</strong> (⋮) no canto superior direito</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar app"</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Confirme tocando em <strong>"Adicionar"</strong> ou <strong>"Instalar"</strong></span>
              </li>
            </ol>

            <div className="mt-4 p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Dica:</strong> O ícone do KillHungry's aparecerá na sua tela inicial como um app nativo!
              </p>
            </div>
          </Card>

          {/* iOS Safari */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 rounded-lg p-2">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">iPhone (Safari)</h2>
                <Badge variant="secondary">iOS</Badge>
              </div>
            </div>

            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Abra o site no navegador <strong>Safari</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div className="flex items-center gap-2">
                  <span>Toque no botão <strong>Compartilhar</strong></span>
                  <Share2 className="w-4 h-4 text-primary" />
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div className="flex items-center gap-2">
                  <span>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></span>
                  <PlusSquare className="w-4 h-4 text-primary" />
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <span>Confirme tocando em <strong>"Adicionar"</strong></span>
              </li>
            </ol>

            <div className="mt-4 p-3 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">
                ⚠️ <strong>Importante:</strong> No iPhone, use apenas o Safari. Outros navegadores não suportam instalação de PWA.
              </p>
            </div>
          </Card>

          {/* Benefícios */}
          <Card className="p-6 bg-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Por que instalar?</h2>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Acesso rápido:</strong> Abra direto da tela inicial, sem abrir o navegador</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Funciona offline:</strong> Veja o menu mesmo sem internet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Notificações:</strong> Receba atualizações sobre seus pedidos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Experiência nativa:</strong> Interface otimizada como um app de verdade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span><strong>Carregamento rápido:</strong> Abre instantaneamente</span>
              </li>
            </ul>
          </Card>

          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              Precisa de ajuda? Entre em contato com nosso suporte.
            </p>
            <Button onClick={() => navigate("/home")} size="lg">
              Voltar para o início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Install;
