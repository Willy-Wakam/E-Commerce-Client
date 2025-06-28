import {
  Box,
  ChartNoAxesCombined,
  ShoppingCart,
  Star,
  User,
  LayoutDashboard,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const adminSideBarMenuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    label: "Admin Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Products",
    icon: <Box />,
    label: "Manage Products",
    path: "/admin/products",
  },
  {
    name: "Features",
    icon: <Star />,
    label: "Manage Features",
    path: "/admin/features",
  },
  {
    name: "Orders",
    icon: <ShoppingCart />,
    label: "Manage Orders",
    path: "/admin/orders",
  },
  {
    name: "Users",
    icon: <User />,
    label: "Manage Users",
  },
];
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen} className="">
        <SheetContent side="left" className="w-64 ">
          <div
            className="flex cursor-pointer flex-col h-full bg-gray-900 text-white"
          >
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-1 text-white ">
                <ChartNoAxesCombined className="w-7 h-7" />
                <span className="text-xl font-semibold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-4 ml-2">
              <ul key={"item.name"} className="mb-4">
                {adminSideBarMenuItems.map((item, index) => (
                  <li
                    key={item.name + index}
                    className="p-2 hover:bg-gray-700 flex gap-2 items-center cursor-pointer hover:text-foreground text-muted-foreground transition-colors
                hover:bg-muted hover:font-semibold rounded-md"
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="w-64 bg-gray-900 text-white h-[auto] hidden lg:flex flex-col border-r p-4">
        <div
          className="p-4 gap-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined className="w-7 h-7 text-white" />
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>
        <nav className="mt-4">
          <ul key={"item.name"} className="mb-4">
            {adminSideBarMenuItems.map((item, index) => (
              <li
                key={item.name + index}
                className="p-2 hover:bg-gray-700 flex gap-2 items-center cursor-pointer hover:text-foreground text-muted-foreground transition-colors
                hover:bg-muted hover:font-semibold rounded-md"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
