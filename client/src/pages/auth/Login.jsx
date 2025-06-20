
import CommonForm from "@/components/common/Form";
import { loginControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};
function Login() {
 const [formData, setFormData] = useState(initialState);

  function handleFormSubmit(event) {
    event.preventDefault();}

  return (
    <div className="mx-auto max-w-md p-6 w-full space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login
        </h1>
        <p className="text-gray-600">Sign in to your account</p> <br />
        <CommonForm
          FormControls={loginControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
        />
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary !hover:underline"
            to="/auth/register"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;