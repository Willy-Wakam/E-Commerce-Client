import CommonForm from "@/components/common/Form";
import { registerControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};
function Register() {
  const [formData, setFormData] = useState(initialState);

  function handleFormSubmit(event) {
    event.preventDefault();}

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
