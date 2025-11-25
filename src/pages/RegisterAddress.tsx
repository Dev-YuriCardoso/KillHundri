import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";

const RegisterAddress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cep: "",
    address: "",
    complement: "",
    city: "",
    state: "",
    neighborhood: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cep || !formData.address || !formData.city || !formData.state || !formData.neighborhood) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Usuário não encontrado");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      cep: formData.cep,
      street: formData.address,
      complement: formData.complement,
      city: formData.city,
      state: formData.state,
      neighborhood: formData.neighborhood,
      address_type: "home",
      is_default: true,
    });

    setLoading(false);

    if (error) {
      toast.error("Erro ao salvar endereço");
      console.error(error);
    } else {
      toast.success("Cadastro realizado com sucesso!");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      <div className="px-6 pb-6">
        <Logo className="mb-8" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              placeholder="00000-000"
              className="bg-card"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rua, Av..."
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complement">Compl.</Label>
              <Input
                id="complement"
                value={formData.complement}
                onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                placeholder="Nº"
                className="bg-card"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Sua cidade"
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">UF</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BA">BA</SelectItem>
                  <SelectItem value="SP">SP</SelectItem>
                  <SelectItem value="RJ">RJ</SelectItem>
                  <SelectItem value="MG">MG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              placeholder="Seu bairro"
              className="bg-card"
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Salvando..." : "Prosseguir"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAddress;
