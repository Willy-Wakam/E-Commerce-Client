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
  FormControls: formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
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
            type={getControlItem.type}
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
        break;
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
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem?.options.length > 0
                ? getControlItem.options.map((option, optionIndex) => (
                    <SelectItem
                      key={optionIndex + option.id}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
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
        break;
      // Add more cases for different component types as needed
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name + index}
            type={getControlItem.type}
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
        {formControls.map((control, index) => (
          <div key={index} className="grid w-full gap-1.5">
            <Label htmlFor={control.name} className="mb-1 font-semibold">
              {control.label}
            </Label>
            {renderInputsByComponentType(control, index)}
          </div>
        ))}
      </div>
      <Button type="submit" className="m-2 w-full !bg-primary text-white ">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
