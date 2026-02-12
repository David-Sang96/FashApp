import Loader from "@/common/components/Loader";
import { useGetAdminProductsQuery } from "@/store/api/adminApi";
import { DataTable } from "../components/DataTable";

const HomePage = () => {
  const { data, isLoading, isError } = useGetAdminProductsQuery();

  if (isLoading) return <Loader />;

  if (isError || !data) {
    return <p className="text-center text-gray-500">Failed to load products</p>;
  }
  return <DataTable data={data.result} />;
};

export default HomePage;
