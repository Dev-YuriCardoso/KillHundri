import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChevronRight, ShoppingBag, CreditCard, MapPin, Heart, LogOut, Edit, Utensils } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", session.user.id)
        .single();

      setUser({
        name: profile?.name || "Usuário",
        email: session.user.email || "",
      });
      setLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Erro ao fazer logout");
    } else {
      toast.success("Logout realizado com sucesso!");
      navigate("/login");
    }
  };

  const menuItems = [
    { icon: ShoppingBag, label: "Meus pedidos", path: "/orders" },
    { icon: CreditCard, label: "Forma de pagamento", path: "/payment-methods" },
    { icon: MapPin, label: "Meu endereço", path: "/addresses" },
    { icon: Heart, label: "Meus favoritos", path: "/home" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 py-8 text-primary-foreground">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Meu<br />Perfil</h1>
          <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center">
            <Utensils className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* User Info Card */}
        <Card className="p-4 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item) => (
            <Card
              key={item.label}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card
          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-destructive" />
            <span className="font-medium text-destructive">Sair</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
