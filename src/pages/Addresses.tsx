import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Briefcase, MapPin, Plus, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Address {
  id: string;
  address_type: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

const Addresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAddresses = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      setLoading(false);

      if (error) {
        toast.error("Erro ao carregar endereços");
        console.error(error);
      } else {
        setAddresses(data || []);
      }
    };

    loadAddresses();
  }, [navigate]);

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return Home;
      case "work":
        return Briefcase;
      default:
        return MapPin;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "home":
        return "Casa";
      case "work":
        return "Trabalho";
      default:
        return "Outro";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Meu endereço</h1>
        </div>
        <Button
          onClick={() => navigate("/register/address")}
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo
        </Button>
      </div>

      <div className="px-6 py-6">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Carregando...
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Você ainda não tem endereços cadastrados
            </p>
            <Button onClick={() => navigate("/register/address")}>
              Adicionar Primeiro Endereço
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => {
              const Icon = getIcon(address.address_type);
              return (
                <Card key={address.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <h3 className="font-semibold">{getTypeLabel(address.address_type)}</h3>
                    </div>
                    <button
                      onClick={() => navigate(`/addresses/${address.id}`)}
                      className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:bg-secondary"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="ml-13 space-y-1 text-sm text-foreground">
                    <p>{address.street}</p>
                    <p>{address.neighborhood}</p>
                    <p>{address.city} - {address.state}</p>
                    {address.complement && (
                      <p className="text-muted-foreground">{address.complement}</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
