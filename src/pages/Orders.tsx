import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import burger from "@/assets/burger.jpg";
import pizza from "@/assets/pizza.jpg";
import sushi from "@/assets/sushi.jpg";

const Orders = () => {
  const navigate = useNavigate();

  const currentOrder = {
    id: 1,
    name: "Hungry's Burger",
    quantity: 1,
    date: "06 out.",
    status: "Em andamento",
    price: 37.99,
    estimatedTime: "40-50 min",
    image: burger,
  };

  const pastOrders = [
    {
      id: 2,
      name: "Hungry's Pizza",
      date: "03 out.",
      status: "Cancelado",
      image: pizza,
    },
    {
      id: 3,
      name: "Hungry's Sushi",
      date: "28 set.",
      status: "Entregue",
      image: sushi,
    },
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
        <h1 className="text-xl font-bold">Meus pedidos</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Order */}
        <div>
          <h2 className="font-semibold mb-4">Resumo do pedido</h2>
          <Card className="p-4">
            <Badge className="bg-warning text-warning-foreground mb-3">
              {currentOrder.status}
            </Badge>

            <div className="flex gap-4 mb-4">
              <img
                src={currentOrder.image}
                alt={currentOrder.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{currentOrder.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {currentOrder.quantity} item
                </p>
                <p className="text-sm text-muted-foreground">
                  Pedido realizado em: {currentOrder.date}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Tempo estimado: {currentOrder.estimatedTime}</span>
              </div>
            </div>

            <div className="text-right text-2xl font-bold text-primary mb-4">
              R$ {currentOrder.price.toFixed(2)}
            </div>

            <Button size="lg" className="w-full">
              Acompanhar pedido
            </Button>
          </Card>
        </div>

        {/* Past Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Pedidos anteriores</h2>
            <button className="text-primary text-sm font-medium">Ver todos</button>
          </div>

          <div className="space-y-3">
            {pastOrders.map((order) => (
              <Card
                key={order.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{order.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Pedido realizado em: {order.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      className={
                        order.status === "Entregue"
                          ? "bg-success text-success-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }
                    >
                      {order.status}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
