import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-indigo-700 text-white rounded-2xl p-12 mb-10 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to ShopNext</h1>
        <p className="text-xl text-indigo-100 mb-8 max-w-xl mx-auto">
          Discover top-quality products delivered fast. Built with Next.js & Tailwind CSS.
        </p>
        <Link
          href="/products"
          className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link href="/products" className="text-indigo-600 text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Ready to explore?</h2>
        <p className="text-gray-500 mb-4">Browse our full collection of premium products.</p>
        <Link
          href="/products"
          className="inline-block bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors"
        >
          Browse All Products
        </Link>
      </section>
    </div>
  );
}
