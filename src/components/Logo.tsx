import { Utensils } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary border-4 border-accent flex items-center justify-center shadow-lg">
          <Utensils className="w-12 h-12 text-primary-foreground" />
        </div>
      </div>
      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">KillHungry's</h1>
        <p className="text-sm text-muted-foreground italic">Sem tempo pra fome!</p>
      </div>
    </div>
  );
};
