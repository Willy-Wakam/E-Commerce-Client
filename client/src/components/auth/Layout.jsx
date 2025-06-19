import { Outlet } from "react-router-dom";


function AuthLayout() {
  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
            <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full lg:w-1/2 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;