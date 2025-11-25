import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, CreditCard } from "lucide-react";

const PaymentMethods = () => {
  const navigate = useNavigate();

  const creditCards = [
    { id: 1, brand: "Mastercard", last4: "1234" },
    { id: 2, brand: "Mastercard", last4: "9876" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card px-6 py-4 shadow-sm flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Forma de pagamento</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Credit Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Cartão de crédito</h2>
            <button className="text-primary text-sm font-medium">Adicionar</button>
          </div>

          <div className="space-y-3">
            {creditCards.map((card) => (
              <Card key={card.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-destructive opacity-80" />
                      <div className="w-6 h-6 rounded-full bg-warning opacity-80 -ml-3" />
                    </div>
                    <span className="font-medium">{card.brand}-{card.last4}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Payment Methods */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Mercado Pago</h2>
            <button className="text-primary text-sm font-medium">Adicionar</button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">ApplePay</h2>
            <button className="text-primary text-sm font-medium">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
