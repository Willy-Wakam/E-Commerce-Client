import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ShoppingHome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Shopping App</h1>
      <p className="text-lg mb-8">
        Explore our products and enjoy your shopping experience!
      </p>
      <Button onClick={() => navigate("/shop/products")}>Start Shopping</Button>
    </div>
  );
}

export default ShoppingHome;
