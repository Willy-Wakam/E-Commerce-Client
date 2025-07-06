import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Minus, Plus, StarIcon } from "lucide-react";

function ProductDetails({ open, setOpen, product, numberOfProduct, handleNumberOfProduct }) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90v] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              width={600}
              height={600}
              className="aspect-square w-full object cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-3xl font-extrabold">{product?.name}</h1>
              <p className="text-muted-foreground text-2xl my-1">
                {product?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold !text-primary`}
              >
                ${product?.price}
              </p>
              {product?.salePrice > 0 ? (
                <p className="text-lg font-semibold !text-primary">
                  ${product?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex tems-center gap-2">
              <div className="flex items-center gap-0 5">
                <StarIcon className="w-5 h-5 !fill-yellow-500" />
                <StarIcon className="w-5 h-5 !fill-yellow-500" />
                <StarIcon className="w-5 h-5 !fill-yellow-500" />
                <StarIcon className="w-5 h-5 !fill-yellow-500" />
                <StarIcon className="w-5 h-5 !fill-none" />
              </div>
              <span className="text-muted-foreground">(4)</span>
            </div>
            <div className="mt-2 mb-2 flex gap-4">
              <div className="flex justify-between items-center gap-2">
              <Button className="text-black-900 text-bold !border-gray-900" onClick={() => handleNumberOfProduct("Minus")} disabled={numberOfProduct == 1}>
                <Minus />
              </Button>
                  <Avatar className="border-2">
                    <AvatarFallback className="!bg-white">
                     {numberOfProduct}
                    </AvatarFallback>
                  </Avatar>
              <Button className="text-black-900 text-bold !border-gray-900" onClick={() => handleNumberOfProduct("Plus")}>
                <Plus />
              </Button>
              </div>
              <Button className="!bg-gray-900 text-white w-[50%]">
                Add to Cart
              </Button>
            </div>
            <hr />
            <div className="max-h-[200px] overflow-auto">
              <h2 className="text-xl font-bold mb-2">Reviews</h2>
              <div className="grid gap-4">
                <div className="flex gap-2">
                  <Avatar className="!bg-gray-900">
                    <AvatarFallback className="!bg-gray-900 text-white font-extrabold">
                      D
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Durando</h3>
                    </div>
                    <div className="flex items-center gap-0 5">
                      <StarIcon className="w-5 h-5 !fill-yellow-500" />
                      <StarIcon className="w-5 h-5 !fill-yellow-500" />
                      <StarIcon className="w-5 h-5 !fill-yellow-500" />
                      <StarIcon className="w-5 h-5 !fill-yellow-500" />
                      <StarIcon className="w-5 h-5 !fill-none" />
                    </div>
                    <p className="text-muted-foreground">
                      This is an awesome product
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Input placeholder="Write a review" />
                <Button className="!bg-gray-900 text-white">Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductDetails;
