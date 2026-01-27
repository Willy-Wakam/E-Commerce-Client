import { useLocation, Navigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton.jsx";

function CheckAuth({ isAuthenticated, isLoading, user, children }) {
  const location = useLocation();

    // Warten bis Profil geladen ist
  if (isLoading) {
    return <Skeleton className="h-96 w-full" />; // Hier kannst du ein Lade-Skelett anzeigen lassen
    // oder dein <LoadingPage /> verwenden
  }

  if (
    !isAuthenticated && 
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    ) 
  ) {
    return <Navigate to="/auth/login" replace/>;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/products" replace/>;
    } else return <Navigate to="/shop/home" replace/>;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/products" replace/>;
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" replace/>;
  }
  

  return children;
}

export default CheckAuth;
