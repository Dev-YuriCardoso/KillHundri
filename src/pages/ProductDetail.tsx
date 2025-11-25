import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Star, Plus, Minus, Clock } from "lucide-react";
import { useState } from "react";
import burger from "@/assets/burger.jpg";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Hungry's Burger",
    price: 37.99,
    rating: 4.8,
    description: "Sabor e suculência em cada mordida! O Hungry's Burger é feito com pão macio com gergelim, hambúrguer artesanal 100% bovino grelhado no ponto ideal, queijo derretido, alface crocante, tomate fresco e um toque especial de molho da casa.",
    additionalInfo: "Perfeito para quem ama o verdadeiro sabor de um hambúrguer tradicional, com ingredientes frescos e de qualidade!",
    image: burger,
    estimatedTime: "40-50 min"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Product Image */}
      <div className="relative h-64 bg-primary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Product Details */}
      <div className="px-6 py-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              R$ {(product.price * quantity).toFixed(2)}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Tempo estimado: {product.estimatedTime}</span>
        </div>

        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">{product.description}</p>
          <p className="text-foreground leading-relaxed">{product.additionalInfo}</p>
        </div>

        <Button 
          size="lg" 
          className="w-full"
          onClick={() => navigate("/checkout")}
        >
          Compre agora
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
