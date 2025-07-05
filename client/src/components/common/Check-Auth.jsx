import { useLocation, Navigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

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
    return <Navigate to="/auth/login" />;
  }
  if(!isAuthenticated && location.pathname.endsWith("/")) return <Navigate to="/auth/login" />

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else return <Navigate to="/shop/home" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  return children;
}

export default CheckAuth;
