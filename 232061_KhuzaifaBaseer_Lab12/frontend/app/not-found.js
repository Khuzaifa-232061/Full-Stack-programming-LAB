import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-8xl font-heading font-black text-primary mb-4">404</h1>
        <h2 className="text-3xl font-heading font-bold text-wood-800 mb-4">Page Not Found</h2>
        <p className="text-wood-400 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist. Maybe it was moved, or the URL is wrong.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">Go Home</Link>
          <Link href="/shop" className="btn-outline px-8 py-3">Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
