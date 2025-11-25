import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Só mostra o prompt se o usuário ainda não instalou
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      if (!isInstalled) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA instalado com sucesso!");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  // Não mostra nada se o prompt não estiver disponível ou já foi dispensado
  if (!showPrompt || !deferredPrompt) return null;

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 p-4 shadow-lg border-primary/20 bg-background/95 backdrop-blur-sm">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <Download className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-sm">Instalar KillHungry's</h3>
          <p className="text-xs text-muted-foreground">
            Adicione o app à sua tela inicial para acesso rápido e experiência offline!
          </p>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleInstallClick}
              size="sm"
              className="flex-1"
            >
              Instalar
            </Button>
            <Button 
              onClick={handleDismiss}
              size="sm"
              variant="outline"
            >
              Agora não
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
