import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Utensils, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InstallPrompt } from "@/components/InstallPrompt";
import { UpdatePrompt } from "@/components/UpdatePrompt";
import burger from "@/assets/burger.jpg";
import pizza from "@/assets/pizza.jpg";
import sushi from "@/assets/sushi.jpg";
import beef from "@/assets/beef.jpg";
import friesPromo from "@/assets/fries-promo.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", "Hambúrguer", "Pizza", "Sushi"];

  const products = [
    { id: 1, name: "Hungry's Burger", price: 37.99, image: burger, category: "Hambúrguer" },
    { id: 2, name: "Hungry's Pizza", price: 49.99, image: pizza, category: "Pizza" },
    { id: 3, name: "Hungry's Sushi", price: 45.99, image: sushi, category: "Sushi" },
    { id: 4, name: "Hungry's Beef", price: 52.99, image: beef, category: "Todos" },
  ];

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Página inicial</h1>
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          >
            <Utensils className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar"
            className="pl-10 bg-secondary"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0"
            >
              <div
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Promotion Banner */}
      <div className="px-6 mb-6">
        <Card className="relative overflow-hidden bg-primary p-6 text-primary-foreground">
          <div className="relative z-10">
            <Badge className="bg-accent text-accent-foreground mb-2">Oferta de hoje</Badge>
            <h3 className="text-xl font-bold mb-2">Porção grátis de fritas</h3>
            <p className="text-sm opacity-90">Em qualquer compra abaixo de R$ 59,99</p>
          </div>
          <img
            src={friesPromo}
            alt="Fritas"
            className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
          />
        </Card>
      </div>

      {/* Featured Products */}
      <div className="px-6">
        <h2 className="text-xl font-bold mb-4">Em destaque</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <InstallPrompt />
      <UpdatePrompt />
    </div>
  );
};

export default Index;
