import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, ChevronRight, Clock, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import burger from "@/assets/burger.jpg";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleOrder = () => {
    toast.success("Pedido realizado com sucesso!");
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-card px-6 py-4 shadow-sm flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Compre agora</h1>
      </div>

      <div className="px-6 space-y-6">
        {/* Address Section */}
        <div>
          <h2 className="font-semibold mb-3">Endereço</h2>
          <Card className="p-4 cursor-pointer" onClick={() => navigate("/addresses")}>
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Casa</h3>
                  <p className="text-sm text-muted-foreground">R. Embira, 149</p>
                  <p className="text-sm text-muted-foreground">Patamares</p>
                  <p className="text-sm text-muted-foreground">Salvador/BA</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Order Info */}
        <div>
          <h2 className="font-semibold mb-3">Informações do pedido</h2>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4" />
              <span>Tempo estimado: 40-50 min</span>
            </div>

            <div className="flex gap-4">
              <img
                src={burger}
                alt="Hungry's Burger"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Hungry's Burger</h3>
                <p className="text-sm text-muted-foreground mb-2">1 item</p>
                <p className="text-lg font-bold text-primary">R$ 37,99</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="font-semibold mb-3">Forma de pagamento</h2>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <Card className="p-4 mb-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="credit" className="font-medium cursor-pointer">
                    Cartão de crédito
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  {paymentMethod === "credit" && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                  )}
                  <RadioGroupItem value="credit" id="credit" className="sr-only" />
                </div>
              </div>
            </Card>

            <Card className="p-4 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center">
                    <span className="text-[8px] text-background font-bold">PIX</span>
                  </div>
                  <Label htmlFor="pix" className="font-medium cursor-pointer">
                    Pix
                  </Label>
                </div>
                <RadioGroupItem value="pix" id="pix" />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="cash" className="font-medium cursor-pointer">
                    Dinheiro
                  </Label>
                </div>
                <RadioGroupItem value="cash" id="cash" />
              </div>
            </Card>
          </RadioGroup>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6">
        <Button size="lg" className="w-full" onClick={handleOrder}>
          Finalizar pedido
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
