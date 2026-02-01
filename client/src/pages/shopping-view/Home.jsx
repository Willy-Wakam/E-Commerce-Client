import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bagGif from "@/assets/grocery.gif";

function ShoppingHome() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <h1 className="text-4xl font-bold mb-4 text-black ">Welcome to our Shopping App</h1>
            <p className="text-lg mb-8 text-foreground ">
                Explore our products and enjoy your shopping experience!
            </p>
            <img
                src={bagGif}
                alt="Shopping bag"
                className="w-60 h-60 mb-6"
            />

            <Button onClick={() => navigate("/shop/products")}>Start Shopping</Button>
        </div>
    );
}

export default ShoppingHome;
