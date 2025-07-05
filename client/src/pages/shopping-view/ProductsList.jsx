import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOprions } from "@/config";
import { ArrowUpDown } from "lucide-react";
import { useSelector } from "react-redux";
import ProductTileShopping from "./Product-Tile";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
function ShoppingProductsList() {
  const { products } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);

    let copyFilters = { ...filter };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    }
    else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);

      if(indexOfCurrentOption === -1) copyFilters[getSectionId].push(getCurrentOption)
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1)
    }
    setFilter(copyFilters);
    sessionStorage.setItem('filters', JSON.stringify(copyFilters));
    
  }

  useEffect(() => {
    setSort('price-lowToHigh');
    setFilter(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, [sort])

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  
    console.log("Fliters: ", filter);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter}  handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products?.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center text-white hover:text-white gap-1 !bg-gray-900"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOprions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="hover:!bg-gray-900 hover:cursor-pointer hover:!text-white"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products?.map((product) => (
            <ProductTileShopping key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductsList;
