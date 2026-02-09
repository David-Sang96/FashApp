import { Navigate } from "react-router";

const AdminHomePage = () => {
  return <Navigate to={"/admin/dashboard"} replace={true} />;
};

export default AdminHomePage;
