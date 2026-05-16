import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex gap-2 items-center">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-indigo-600">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.title}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Product Header */}
        <div className="bg-indigo-50 p-10 text-center">
          <div className="text-8xl mb-4">{product.image}</div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500 bg-indigo-100 rounded-full px-3 py-1">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{product.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-extrabold text-indigo-700">
              ${product.price.toFixed(2)}
            </span>
            <div>
              <p className="text-yellow-500 font-medium">
                {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
              </p>
              <p className="text-sm text-gray-400">{product.rating} / 5 rating</p>
            </div>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex gap-4">
            <button className="flex-1 bg-indigo-700 text-white font-bold py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 border border-indigo-700 text-indigo-700 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="mt-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline"
        >
          ← Back to All Products
        </Link>
      </div>
    </div>
  );
}
