import BestDeatls from "../components/BestDeatls";
import NewArrivals from "../components/NewArrivals";

const HomePage = () => {
  return (
    <section className="space-y-20 p-2">
      <NewArrivals />
      <BestDeatls />
    </section>
  );
};

export default HomePage;
