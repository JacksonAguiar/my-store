import { Navigate, Outlet } from "react-router-dom";

interface Props {
  user: any;
  onlyAdmin?: boolean;
  redirectPath?: any;
}

export const ProtectedRoute = ({
  user,
  onlyAdmin = false,
  redirectPath = "/auth",
}: Props) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  } else {
    if (onlyAdmin && !user.isAdmin) {
      return <Navigate to={"/"} replace />;
    } else if (!onlyAdmin && user.isAdmin) {
      return <Navigate to={"/admin/products"} replace />;
    }
  }
  return <Outlet />;
};
