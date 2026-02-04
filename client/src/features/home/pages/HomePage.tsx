import Featured from "../components/Featured";
import NewArrivals from "../components/NewArrivals";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-muted relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 font-serif text-4xl tracking-tight text-balance italic md:text-5xl lg:text-6xl">
            Welcome to a new dimension of home decor
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            Mush Studios blends intricate design, considered function and luxury
            materials to transform your home and awaken your senses.
          </p>
        </div>
      </section>

      <NewArrivals />
      <Featured />
    </div>
  );
}
