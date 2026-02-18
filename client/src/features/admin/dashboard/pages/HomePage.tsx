import Loader from "@/common/components/Loader";
import { useGetAdminProductsQuery } from "@/store/api/adminApi";
import { useGetProductsMetaQuery } from "@/store/api/productApi";
import { useGetAllUsersQuery } from "@/store/api/userApi";
import Chart from "../components/Chart";
import LowStock from "../components/LowStock";
import Recent from "../components/Recent";
import StatBlock from "../components/StatBlock";

const HomePage = () => {
  const {
    data: userResponse,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUsersQuery();
  const {
    data: productResponse,
    isLoading: productLoading,
    isError: productError,
  } = useGetAdminProductsQuery();

  const {
    data: productMetaResponse,
    isLoading: productMetaLoading,
    isError: productMetaError,
  } = useGetProductsMetaQuery();

  if (userLoading || productLoading || productMetaLoading) return <Loader />;

  if (userError || !userResponse) {
    return <p className="text-center text-gray-500">Failed to load users</p>;
  }
  if (productError || !productResponse) {
    return <p className="text-center text-gray-500">Failed to load products</p>;
  }
  if (productMetaError || !productMetaResponse) {
    return <p className="text-center text-gray-500">Failed to load products</p>;
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-foreground text-xl font-medium">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Overview of users &amp; products
        </p>
      </div>
      <StatBlock
        products={productResponse.result}
        users={userResponse.users}
        productsMeta={productMetaResponse}
      />
      <Chart productsMeta={productMetaResponse} users={userResponse.users} />
      <Recent
        productMeta={productMetaResponse}
        products={productResponse.result}
      />
      <LowStock products={productResponse.result} />
    </section>
  );
};

export default HomePage;
