import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { FilterIcon } from "lucide-react";

function ProductFilter({ filter, handleFilter }) {
  const isChecked = (group, id) =>
    Array.isArray(filter?.[group]) && filter[group].includes(id);

  const changeHandler = (group, opt) => {
    handleFilter(group, opt.id);
  };
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b flex gap-2 items-center">
        <h2 className="text-lg font-extrabold">Filters</h2>
        <FilterIcon className="h-5 w-5" />
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((option, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold border-b">{option}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[option].map((opt) => (
                  <div className="flex items-center space-x-2" key={opt.id}>
                    <input
                      type="checkbox"
                      id={opt.id}
                      checked={isChecked(option, opt.id)}
                      onChange={() => changeHandler(option, opt)}
                    />
                    <Label className="font-medium" htmlFor={opt.name}>
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
