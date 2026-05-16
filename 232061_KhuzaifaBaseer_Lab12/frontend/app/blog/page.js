import Link from 'next/link';

export const metadata = { title: 'Blog - Rustik Plank' };

const posts = [
  { id: 1, title: 'How to Care for Reclaimed Wood Furniture', category: 'Tips', date: 'Jan 15, 2025', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', excerpt: 'Reclaimed wood furniture is beautiful and durable, but it needs the right care to last for generations. Here are our top tips...' },
  { id: 2, title: 'The Beauty of Live Edge Tables', category: 'Design', date: 'Feb 2, 2025', img: 'https://images.unsplash.com/photo-1530018352490-8d1b3e1d2a56?w=600&q=80', excerpt: 'Live edge furniture celebrates the natural form of wood, preserving the organic edges and contours of the original tree...' },
  { id: 3, title: 'Choosing the Right Bed Frame for Your Bedroom', category: 'Guide', date: 'Mar 10, 2025', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80', excerpt: 'Your bed frame sets the tone for your entire bedroom. Here\'s how to choose the perfect wooden bed frame...' },
  { id: 4, title: 'Sustainable Sourcing: Our Commitment to the Planet', category: 'Sustainability', date: 'Apr 5, 2025', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', excerpt: 'At Rustik Plank, we believe that beautiful furniture and environmental responsibility go hand in hand...' },
  { id: 5, title: 'The Farmhouse Aesthetic: A Design Guide', category: 'Design', date: 'Apr 20, 2025', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80', excerpt: 'The farmhouse style brings warmth, simplicity and natural beauty into the home. Learn how to achieve this timeless look...' },
  { id: 6, title: 'Behind the Scenes: A Day in Our Workshop', category: 'Workshop', date: 'May 1, 2025', img: 'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600&q=80', excerpt: 'Come join us for a day in the Rustik Plank workshop and see how our craftsmen bring raw timber to life...' },
];

export default function BlogPage() {
  return (
    <div>
      <div className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80" alt="Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-wood-900/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Our Blog</h1>
          <p className="text-wood-200">Home / <span className="text-primary">Blog</span></p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="text-center mb-12">
          <h2 className="section-title text-center">Wood, Design & Craftsmanship</h2>
          <div className="orange-bar mx-auto" />
          <p className="text-wood-400 max-w-xl mx-auto">Tips, inspiration and stories from the Rustik Plank workshop</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white border border-wood-100 rounded-sm overflow-hidden card-hover">
              <div className="overflow-hidden aspect-video">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-sm">{post.category}</span>
                  <span className="text-xs text-wood-400">{post.date}</span>
                </div>
                <h2 className="font-heading font-bold text-wood-800 text-lg leading-snug mb-3 hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                <p className="text-wood-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="text-sm font-bold text-primary hover:underline cursor-pointer flex items-center gap-1">Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
