import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import { useState } from "react";


function AdminViewLayout() {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
        {/* Admin side-bar */}
        <AdminSideBar open={openSideBar} setOpen={setOpenSideBar}/>
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSideBar}/>
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminViewLayout;