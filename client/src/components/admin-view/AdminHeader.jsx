import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminHeader({ setOpen }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogOut(){
    dispatch(logOutUser()).then((data) =>{
      if(data.payload.success) navigate("/auth/login");
      toast.success("Logout successful")
    })
  }
  return (
    <header className=" flex items-center justify-between bg-background border-b text-white p-4 py-3">
      <Button
        className="lg:hidden sm:block text-white !bg-gray-800"
        onClick={() => setOpen((prev) => !prev)}
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white">
            <span className="sr-only">Notifications</span>
            <span className="icon">🔔</span>
          </Button>
          <Button variant="ghost" className="text-white">
            <span className="sr-only">Profile</span>
            <span className="icon">👤</span>
          </Button>
          <Button variant="ghost" className="text-white" disabled>
            <span className="sr-only">Settings</span>
            <span className="icon">⚙️</span>
          </Button>
        </div>
        <Button onClick={() => handleLogOut()}  className="text-black inline-flex items-center space-x-2">
          <LogOut />
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
