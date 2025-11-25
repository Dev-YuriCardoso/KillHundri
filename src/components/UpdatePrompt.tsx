import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Workbox } from "workbox-window";

export const UpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [wb, setWb] = useState<Workbox | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const workbox = new Workbox("/sw.js");

      workbox.addEventListener("waiting", () => {
        setShowPrompt(true);
      });

      workbox.register();
      setWb(workbox);
    }
  }, []);

  const handleUpdate = () => {
    if (wb) {
      wb.messageSkipWaiting();
      setShowPrompt(false);
      window.location.reload();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

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
          <RefreshCw className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-sm">Nova versão disponível!</h3>
          <p className="text-xs text-muted-foreground">
            Uma atualização do KillHungry's está pronta. Clique em atualizar para obter as últimas melhorias.
          </p>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleUpdate}
              size="sm"
              className="flex-1"
            >
              Atualizar agora
            </Button>
            <Button 
              onClick={handleDismiss}
              size="sm"
              variant="outline"
            >
              Depois
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
