import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">All Products</h1>
        <p className="text-gray-500 text-lg">Browse our full collection of premium items.</p>
      </div>
      <ProductList />
    </div>
  );
}
