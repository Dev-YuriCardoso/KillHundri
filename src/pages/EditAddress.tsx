import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EditAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    cep: "",
    street: "",
    complement: "",
    city: "",
    state: "",
    neighborhood: "",
    address_type: "home",
  });

  useEffect(() => {
    const loadAddress = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Erro ao carregar endereço");
        navigate("/addresses");
        return;
      }

      if (data) {
        setFormData({
          cep: data.cep,
          street: data.street,
          complement: data.complement || "",
          city: data.city,
          state: data.state,
          neighborhood: data.neighborhood,
          address_type: data.address_type,
        });
      }
    };

    loadAddress();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cep || !formData.street || !formData.city || !formData.state || !formData.neighborhood) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("addresses")
      .update({
        cep: formData.cep,
        street: formData.street,
        complement: formData.complement,
        city: formData.city,
        state: formData.state,
        neighborhood: formData.neighborhood,
        address_type: formData.address_type,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      toast.error("Erro ao atualizar endereço");
      console.error(error);
    } else {
      toast.success("Endereço atualizado com sucesso!");
      navigate("/addresses");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este endereço?")) {
      return;
    }

    setDeleting(true);
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    setDeleting(false);

    if (error) {
      toast.error("Erro ao excluir endereço");
      console.error(error);
    } else {
      toast.success("Endereço excluído com sucesso!");
      navigate("/addresses");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5 text-destructive-foreground" />
        </button>
      </div>

      <div className="px-6 pb-6">
        <h1 className="text-2xl font-bold mb-8">Editar Endereço</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address_type">Tipo de Endereço</Label>
            <Select 
              value={formData.address_type} 
              onValueChange={(value) => setFormData({ ...formData, address_type: value })}
            >
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Casa</SelectItem>
                <SelectItem value="work">Trabalho</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
              <Label htmlFor="street">Endereço</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
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
              <Select 
                value={formData.state} 
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
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
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
