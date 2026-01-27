import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";

function AdminProductTile({ product, setCurrentEditedId, setOpen, setFormData, setOpenDelete}) {

  function handleEditProduct(id){
    setCurrentEditedId(id);
    setOpen(true);
    setFormData(product);
  }

  function handleDeleteProduct(id){
    setCurrentEditedId(id);
    setOpenDelete(true);
  }
  return (
    <Card className="w-full max-x-sm mx-auto !h-[max-content] !p-0">
      <div>
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="mb-2">
          <h2 className=" font-semibold mt-2 mb-2">{product.name}</h2>
          <div className="flex items-center justify-between">
            <p
              className={
                product?.salePrice > 0
                  ? "line-through font-semibold text-primary"
                  : `font-semibold text-primary`
              }
            >
              {typeof product.price === "number"
                ? `$${product.price.toFixed(2)}`
                : "No price"}
            </p>
            {product?.salePrice > 0 ? (
              <p className="font-semibold text-primary">
                Sale:
                <span className="text-red-600">
                  {" "}
                  {typeof product.salePrice === "number"
                    ? `$${product.salePrice.toFixed(2)}`
                    : " -"}
                </span>
              </p>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="mt-1 gap-4 mb-4">
          <Button className="!bg-gray-800" onClick={() => handleEditProduct(product._id)}>Edit</Button>
          <Button className="!bg-gray-800" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
