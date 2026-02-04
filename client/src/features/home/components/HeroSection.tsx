import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 py-8 lg:flex-row">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }} // once: true for hero
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-foreground font-serif text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Timeless elegance
              <br />
              <span className="text-muted-foreground">meets modern design</span>
            </h1>

            <motion.p
              className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Discover our curated collection of premium fashion and
              accessories, crafted with exceptional quality and attention to
              detail.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  size="lg"
                  className="h-12 rounded-full px-8 text-base"
                  asChild
                >
                  <Link to="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full bg-transparent px-8 text-base"
                  asChild
                >
                  <Link to="#about">Our Story</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="relative flex-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-lg">
              <motion.div
                className="bg-muted absolute inset-0 -rotate-3 rounded-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              />
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <img
                  src="/hero-product.jpg"
                  alt="Premium leather handbag"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
