import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../store/authStore";

const RequireAuth = () => {
  const { isAuthenticated } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
    })),
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
