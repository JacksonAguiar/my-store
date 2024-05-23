import { Navigate, Outlet } from "react-router-dom";

interface Props {
  user: any;
  redirectPath?: any;
}

export const UnprotectedRoute = ({
  user,
  redirectPath = "/",
}: Props) => {
  if (user) {
    if (user.isAdmin) return <Navigate to={"/admin/products"} replace />;
    else return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
