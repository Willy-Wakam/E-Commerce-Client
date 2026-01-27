import { useEffect, useRef } from "react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { FileIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton.jsx";

function ImageUpload({
  getControlItem,
  formData,
  setFormData,
  index,
  value,
  file,
  setFile,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const baseURL = import.meta.env.DEV? import.meta.env.VITE_API_BASE_URL_DEV : import.meta.env.VITE_API_BASE_URL;

  async function uploadFileToCloudinary() {
    const formData = new FormData();
    formData.append("my_file", file);

    const response = await axios.post(
      `${baseURL}/api/admin/products/upload-image`,
      formData
    );
    console.log("Response from Cloudinary:", response.data);
    if (response.data.success && response.data.url) {
      setFormData((prev) => ({
        ...prev,
        [getControlItem.name]: response.data.url, // ✅ sync into formData.image
      }));
      setImageLoadingState(false);
    }
  }

  // This component handles the image upload functionality
  // It allows users to upload an image file or provide a URL for the image
  useEffect(() => {
    if (file !== null) {
      uploadFileToCloudinary();
    }
  }, [file, isEditMode]);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const inputRef = useRef(null);

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = null; // Clear the file input
    }
  };

  return (
    <div className={isEditMode?'hidden' : `flex flex-col gap-2`}>
      {file ? (
        <>
          <div className="flex items-center">
            <div className="flex item-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium"> {file.name}</p>
            <Button
              variant="ghost"
              className="ml-2"
              size
              onClick={() => handleRemoveFile()}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only"> Remove File</span>
            </Button>
          </div>
        </>
      ) : imageLoadingState ? (
        <Skeleton className="h-10 !bg-gray-100" />
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Input
              name={getControlItem?.name}
              placeholder={getControlItem?.placeholder}
              id={getControlItem?.name + index}
              type="url"
              required={getControlItem?.required}
              validation={getControlItem?.validation}
              value={value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getControlItem?.name]: e.target.value,
                })
              }
            />
            <Button className="text-white !hover:font-bold !bg-gray-700">
              By link
            </Button>
          </div>
          <label
            type="button"
            className="h-10 w-[100%] border-2 border-dashed bg-transparent cursor-pointer rounded-lg p-6 text-2xl text-gray-600 flex items-center gap-2 justify-center shadow-md shadow-gray-300"
          >
            <input
              type="file"
              multiple
              name="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              ref={inputRef}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </label>
        </>
      )}
    </div>
  );
}

export default ImageUpload;
