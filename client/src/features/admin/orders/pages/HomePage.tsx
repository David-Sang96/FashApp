import { FAKE_ORDER } from "@/lib/fakeOrder";
import OrderTable from "../components/OrderTable";
import Recent from "../components/Recent";

const OrderHomePage = () => {
  return (
    <section className="space-y-5">
      <Recent orders={FAKE_ORDER} />
      <OrderTable orders={FAKE_ORDER} />
    </section>
  );
};

export default OrderHomePage;
