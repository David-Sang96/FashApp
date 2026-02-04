import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const floatingAnimation = {
    y: [-20, 20, -20],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const glitchAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  };

  const orbitAnimation = (delay: number, duration: number) => ({
    rotate: 360,
    transition: {
      duration,
      repeat: Infinity,
      ease: "linear" as const,
      delay,
    },
  });

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated orbiting circles - responsive sizing */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          className="border-primary/20 absolute h-[280px] w-[280px] rounded-full border sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]"
          animate={orbitAnimation(0, 20)}
        >
          <motion.div
            className="bg-primary absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full sm:h-3 sm:w-3"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="border-primary/10 absolute h-[360px] w-[360px] rounded-full border sm:h-[520px] sm:w-[520px] md:h-[700px] md:w-[700px]"
          animate={orbitAnimation(0.5, 30)}
          style={{ rotate: 45 }}
        >
          <motion.div
            className="bg-accent-foreground absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full sm:h-2 sm:w-2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Third orbit for larger screens */}
        <motion.div
          className="border-primary/5 absolute hidden h-[900px] w-[900px] rounded-full border md:block"
          animate={orbitAnimation(1, 40)}
        >
          <motion.div
            className="bg-primary/50 absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Pulsing background orbs */}
      <motion.div
        className="bg-primary/10 absolute top-1/4 left-1/4 h-96 w-96 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-accent-foreground/10 absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-primary/40 absolute h-1 w-1 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 px-6 text-center">
        {/* 404 Number with glitch effect */}
        <motion.div animate={floatingAnimation} className="mb-8">
          <motion.h1
            animate={glitchAnimation}
            className="text-gradient relative text-[8rem] leading-none font-extrabold tracking-tighter select-none md:text-[16rem]"
          >
            <motion.span
              className="text-primary/20 absolute inset-0"
              animate={{
                x: [0, 10, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
            >
              404
            </motion.span>
            404
          </motion.h1>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2
            className="text-foreground mb-4 text-2xl font-semibold md:text-3xl"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Page not found
          </motion.h2>
          <p className="text-muted-foreground mx-auto mb-10 max-w-md text-lg">
            The page you're looking for doesn't exist or has been moved to
            another location.
          </p>
        </motion.div>

        {/* Action buttons with hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="cursor-pointer gap-2 rounded-full font-medium"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 font-medium"
            >
              <Button
                onClick={() => navigate(-1)}
                className="cursor-pointer rounded-full text-black dark:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative line with shimmer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <motion.div
            className="via-primary mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent to-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
