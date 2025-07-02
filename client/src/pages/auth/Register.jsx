import CommonForm from "@/components/common/Form";
import { registerControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};
function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((response) => {
      console.log("Registration response:", response);
      if (response?.meta?.requestStatus === "fulfilled" && response?.payload?.success) {
        toast.success("Registration successful! Please log in.");
        // Registration successful, redirect to login page
        navigate("/auth/login");
      } else {
        toast.error("Email or Username already exists. Please try another one.");
        // Handle registration error
        console.error("Registration failed:", response.payload);
      }
    });
  }

  return (
    <div className="mx-auto max-w-md p-6 w-full space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Register
        </h1>
        <p className="text-gray-600">Create a new account</p> <br />
        <CommonForm
          FormControls={registerControls}
          buttonText={"Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
        />
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary !hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
