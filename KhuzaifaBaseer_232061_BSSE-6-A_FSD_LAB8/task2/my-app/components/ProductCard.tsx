import Link from "next/link";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 flex flex-col">
      <div className="text-6xl text-center mb-4">{product.image}</div>
      <span className="text-xs font-semibold uppercase tracking-wide text-indigo-500 bg-indigo-50 rounded-full px-3 py-1 self-start mb-3">
        {product.category}
      </span>
      <h2 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h2>
      <p className="text-gray-500 text-sm flex-grow line-clamp-2 mb-4">
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-2xl font-extrabold text-indigo-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-yellow-500">{"★".repeat(Math.round(product.rating))} {product.rating}/5</p>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
