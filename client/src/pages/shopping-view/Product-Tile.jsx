import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ProductTileShopping({ product, handleAddProduct }) {


  return (
    <Card className="w-full max-w-sm mx-auto !p-0">
      <div>
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[300px] rounded-t-lg object-cover"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 !bg-red-500 !hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <div className="justify-between flex items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category.replace(/^./, product?.category[0].toUpperCase())}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand.replace(/^./, product?.brand[0].toUpperCase())}
            </span>
          </div>
          <div className="justify-between flex items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold !text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold !text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="mb-2">
            <Button className="w-full !bg-gray-900 hover:font-semibold" onClick={() => handleAddProduct(product._id)}>Add to cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductTileShopping;
