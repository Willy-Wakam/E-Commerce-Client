import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";


function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
        <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;