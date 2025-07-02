import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllproducts,
} from "@/store/admin/products";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "./Product-Tile";

const initialFormData = {
  name: "",
  description: "",
  brand: "",
  stock: 0,
  salePrice: 0,
  price: 0,
  category: "",
  imageUrl: "",
};
function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { products } = useSelector((state) => state.adminProducts);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  useEffect(() => {
    if (!open) {
      setImageFile(null);
      setUploadedImageUrl("");
    }
    dispatch(fetchAllproducts());
  }, [currentEditedId, dispatch, open, uploadedImageUrl]);

  function handleOnSubmit(e) {
    e.preventDefault();
    const newFormData = {
      ...formData,
      price: Number(formData.price),
      salePrice: Number(formData.salePrice),
      stock: Number(formData.stock),
    };
    if (currentEditedId)
      dispatch(
        editProduct({ id: currentEditedId, productData: newFormData })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllproducts()); // Fetch updated products after adding a new one
          setFormData(initialFormData); // Reset form data after successful submission
          setOpen(false); // Close the sheet after submission
          setCurrentEditedId(null);
          toast.success("Product edited successfully!"); // Show success message
          // Reset image loading state
        }
      });
    else {
      dispatch(addNewProduct(newFormData)).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllproducts()); // Fetch updated products after adding a new one
          setFormData(initialFormData); // Reset form data after successful submission
          setOpen(false); // Close the sheet after submission
          setUploadedImageUrl(""); // Reset uploaded image URL
          setImageLoadingState(false);
          setImageFile(null); // Reset image file state
          toast.success("Product added successfully!"); // Show success message
          // Reset image loading state
        }
      });
    }
  }

  function handleCancelDelete(){
    setCurrentEditedId(null);
    setOpenDelete(false);
  }

  function handleDeleteProduct(){
    dispatch(deleteProduct(currentEditedId)).then((data) => {
      console.log(data)
      if(data?.payload?.success){
        dispatch(fetchAllproducts());
        setOpenDelete(false);
      }
    })
  }


  return (
    <Fragment>
      <div className="mb-2 flex justify-end w-full">
        <Button
          className="text-white !font-semibold !bg-gray-800"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Sheet
            open={open}
            onOpenChange={() => {
              setOpen(false);
              setCurrentEditedId(null);
              setFormData(initialFormData);
            }}
            className="w-full"
          >
            <SheetContent
              side="right"
              className="w-full max-w-md p-6 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                  {currentEditedId ? "Edit" : "Add New"} Product
                </SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <CommonForm
                  FormControls={productFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={currentEditedId ? "Edit" : "Add Product"}
                  onSubmit={handleOnSubmit}
                  uploadedImageUrl={uploadedImageUrl}
                  setUploadedImageUrl={setUploadedImageUrl}
                  setImageLoadingState={setImageLoadingState}
                  imageLoadingState={imageLoadingState}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  isEditMode={currentEditedId !== null}
                />
              </div>
            </SheetContent>
          </Sheet>
          <Sheet
            open={openDelete}
            onOpenChange={() => setOpenDelete(false)}
            className="w-full"
          >
            <SheetContent
              side="right"
              className="w-full max-w-md p-6 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="" text-lg font-semibold>
                  Delete Product
                </SheetTitle>
              </SheetHeader>
              <p>
                Would you really want to delete the product: 
                <span className="font-bold">&nbsp; 
                  {
                    products.filter((prod) => prod._id === currentEditedId)[0]
                      ?.name
                  }
                </span>
              </p>
              <div className="flex justify-start gap-6">
                <Button className="!bg-gray-800" onClick={() => handleCancelDelete()}>Cancel</Button>
                <Button className="text-white !bg-red-500" onClick={() => handleDeleteProduct()}>Delete</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 &&
          products.map((product) => (
            <AdminProductTile
              setCurrentEditedId={setCurrentEditedId}
              setOpen={setOpen}
              setFormData={setFormData}
              key={product._id + product.name}
              product={product}
              setOpenDelete={setOpenDelete}
            />
          ))}
      </div>
    </Fragment>
  );
}

export default AdminProducts;
