import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 text-center lg:py-32"
    >
      {/* Floating Cart Icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-muted mb-6 rounded-full p-6"
      >
        <ShoppingCart className="text-muted-foreground h-10 w-10" />
      </motion.div>

      <h2 className="text-lg font-semibold">Your cart is empty</h2>

      <p className="text-muted-foreground mt-2 max-w-xs text-sm">
        Looks like you haven’t added anything yet. Start shopping to fill it up.
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6"
      >
        <SheetClose asChild>
          <Button
            asChild
            className="flex cursor-pointer items-center gap-2 rounded-full"
          >
            <Link to={"/products"}>
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </SheetClose>
      </motion.div>
    </motion.div>
  );
};

export default EmptyCart;
