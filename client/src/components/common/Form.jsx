import ImageUpload from "../admin-view/ImageUpload";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
function CommonForm({
  FormControls: FormControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  setUploadedImageUrl,
  imageLoadingState,
  imageFile,
  setImageFile,
  setImageLoadingState,
  isEditMode
}) {
    function isFormValid(){
    return Object.keys(formData).map(key => formData[key] !== "").every(item => item.label !== "Notes")
  }

  function renderInputsByComponentType(getControlItem, index) {
    let element = null;
    
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name + index}
            type={getControlItem.componentType}
            required={getControlItem.required}
            validation={getControlItem.validation}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        return element;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(val) => {
              setFormData({
                ...formData,
                [getControlItem.name]: val,
              });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem?.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem
                      key={`${getControlItem.name}-${option.value}`}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        return element;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name + index}
            required={getControlItem.required}
            validation={getControlItem.validation}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        return element;
      case "checkbox":
        element = (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={getControlItem.name + index}
              name={getControlItem.name}
              checked={value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [getControlItem.name]: e.target.checked,
                })
              }
            />
            <Label htmlFor={getControlItem.name + index}>
              {getControlItem.label}
            </Label>
          </div>
        );
        return element;
      case "radio":
        element = (
          <div className="flex items-center space-x-2">
            {getControlItem.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-1">
                <input
                  type="radio"
                  id={`${getControlItem.name}-${option.value}`}
                  name={getControlItem.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [getControlItem.name]: e.target.value,
                    })
                  }
                />
                <Label htmlFor={`${getControlItem.name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        );
        return element;
      case "url":
        element = (
          <ImageUpload
            file={imageFile}
            setFile={setImageFile}
            setUploadedImageUrl={setUploadedImageUrl}
            getControlItem={getControlItem}
            formData={formData}
            setFormData={setFormData}
            index={index}
            value={value}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={isEditMode}
          />
        );
        return element;
      // Add more cases for different component types as needed
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name + index}
            type={getControlItem.componentType}
            required={getControlItem.required}
            validation={getControlItem.validation}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        return element;
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {FormControls.map((control, index) => (
          <div key={index} className="grid w-full gap-1.5">
            <Label
              htmlFor={control.name}
              className={
                isEditMode && control.name === "imageUrl"
                  ? "hidden"
                  : `mb-1 font-semibold`
              }
            >
              {control.label}
            </Label>
            {renderInputsByComponentType(control, index)}
          </div>
        ))}
      </div>
      <Button type="submit" className="m-2 w-full !bg-primary text-white " disabled={!isFormValid()}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
