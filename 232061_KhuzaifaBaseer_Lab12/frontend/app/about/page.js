import Link from 'next/link';

export const metadata = { title: 'About Us - Rustik Plank' };

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" alt="About" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-wood-900/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">About Rustik Plank</h1>
          <p className="text-wood-200">Home / <span className="text-primary">About Us</span></p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Our Story</p>
            <h2 className="text-4xl font-heading font-bold text-wood-800 mb-4">Handcrafted With Heart Since 2008</h2>
            <div className="orange-bar" />
            <p className="text-wood-500 leading-relaxed mb-4">
              Rustik Plank was born from a deep love of wood and the stories it carries. Founded in 2008 by master craftsman James Plank, our workshop in the Cotswolds has been creating heirloom-quality furniture from reclaimed and sustainably sourced timber ever since.
            </p>
            <p className="text-wood-500 leading-relaxed mb-8">
              Every knot, grain and imperfection in our wood is a feature, not a flaw. We celebrate the natural beauty of timber and create pieces that will be passed down through generations.
            </p>
            <Link href="/shop" className="btn-primary px-8 py-3">Explore Our Collection</Link>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1530018352490-8d1b3e1d2a56?w=700&q=80" alt="Workshop" className="w-full rounded-sm shadow-2xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[['15+', 'Years Experience'], ['2000+', 'Pieces Crafted'], ['500+', 'Happy Customers'], ['100%', 'Sustainable Wood']].map(([num, label]) => (
            <div key={label} className="text-center bg-wood-50 p-8 rounded-sm">
              <p className="text-4xl font-heading font-black text-primary mb-2">{num}</p>
              <p className="text-wood-600 font-bold text-sm uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-10">
          <h2 className="section-title text-center">Meet Our Craftsmen</h2>
          <div className="orange-bar mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'James Plank', role: 'Founder & Master Craftsman', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
            { name: 'Sarah Wood', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
            { name: 'Tom Oak', role: 'Senior Carpenter', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
          ].map(m => (
            <div key={m.name} className="text-center">
              <img src={m.img} alt={m.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-primary/20" />
              <h3 className="font-heading font-bold text-wood-800 text-lg">{m.name}</h3>
              <p className="text-wood-400 text-sm">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
