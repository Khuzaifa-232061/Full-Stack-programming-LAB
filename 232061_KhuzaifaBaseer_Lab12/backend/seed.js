const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const categories = [
  { name: 'Beds', slug: 'beds', description: 'Handcrafted wooden beds', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400' },
  { name: 'Chairs', slug: 'chairs', description: 'Rustic wooden chairs', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
  { name: 'Tables', slug: 'tables', description: 'Solid wood dining and coffee tables', image: 'https://images.unsplash.com/photo-1530018352490-8d1b3e1d2a56?w=400' },
  { name: 'Bookcases', slug: 'bookcases', description: 'Wooden bookcase shelving', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { name: 'Cabinets', slug: 'cabinets', description: 'Storage cabinets and dressers', image: 'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=400' },
  { name: 'Boxes', slug: 'boxes', description: 'Decorative wooden boxes', image: 'https://images.unsplash.com/photo-1601924287811-e34de5d17476?w=400' },
];

const furnitureImages = {
  beds: [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
  ],
  chairs: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600',
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600',
  ],
  tables: [
    'https://images.unsplash.com/photo-1530018352490-8d1b3e1d2a56?w=600',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    'https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=600',
  ],
  bookcases: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600',
  ],
  cabinets: [
    'https://images.unsplash.com/photo-1595526051245-4506e0005bd0?w=600',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  ],
  boxes: [
    'https://images.unsplash.com/photo-1601924287811-e34de5d17476?w=600',
  ],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Create categories
    const cats = await Category.insertMany(categories);
    const catMap = {};
    cats.forEach(c => catMap[c.slug] = c._id);

    // Create admin user
    await User.create({ name: 'Admin User', email: 'admin@rustikplank.com', password: 'admin123', role: 'admin' });
    await User.create({ name: 'John Doe', email: 'john@example.com', password: 'user123', role: 'user' });

    const productData = [
      // Beds
      { name: 'Rustic Pine King Bed', slug: 'rustic-pine-king-bed', description: 'Handcrafted king-size bed from reclaimed pine wood. Features a stunning headboard with natural grain patterns.', price: 649, oldPrice: 799, category: catMap['beds'], images: furnitureImages.beds, stock: 8, isFeatured: true, isPopular: true, material: 'Reclaimed Pine', rating: 4.8, numReviews: 24 },
      { name: 'Walnut Queen Bed Frame', slug: 'walnut-queen-bed-frame', description: 'Elegant queen bed frame crafted from solid American walnut. Modern rustic design with smooth finish.', price: 549, oldPrice: null, category: catMap['beds'], images: furnitureImages.beds, stock: 5, isNew: true, material: 'Walnut', rating: 4.6, numReviews: 12 },
      { name: 'Oak Farmhouse Bed', slug: 'oak-farmhouse-bed', description: 'Classic farmhouse style bed in solid oak. Sturdy construction with beautiful natural finish.', price: 489, oldPrice: 599, category: catMap['beds'], images: furnitureImages.beds, stock: 10, isSpecial: true, material: 'Oak', rating: 4.5, numReviews: 18 },
      // Chairs
      { name: 'Reclaimed Wood Accent Chair', slug: 'reclaimed-wood-accent-chair', description: 'Unique accent chair made from 100% reclaimed wood. Each piece is one-of-a-kind with its own character.', price: 234, oldPrice: 289, category: catMap['chairs'], images: furnitureImages.chairs, stock: 15, isFeatured: true, isSpecial: true, material: 'Reclaimed Wood', rating: 4.7, numReviews: 31 },
      { name: 'Windsor Dining Chair', slug: 'windsor-dining-chair', description: 'Traditional Windsor-style dining chair in solid beech. Comfortable and timeless design.', price: 134, oldPrice: null, category: catMap['chairs'], images: furnitureImages.chairs, stock: 20, isPopular: true, material: 'Beech', rating: 4.4, numReviews: 45 },
      { name: 'Rocking Chair Oak', slug: 'rocking-chair-oak', description: 'Classic rocking chair in solid oak. Perfect for porches and living rooms alike.', price: 299, oldPrice: 349, category: catMap['chairs'], images: furnitureImages.chairs, stock: 7, isNew: true, material: 'Oak', rating: 4.9, numReviews: 8 },
      { name: 'Bar Stool Rustic', slug: 'bar-stool-rustic', description: 'Industrial rustic bar stool with wooden seat and metal frame.', price: 129, oldPrice: null, category: catMap['chairs'], images: furnitureImages.chairs, stock: 25, isPopular: true, material: 'Pine + Metal', rating: 4.3, numReviews: 22 },
      // Tables
      { name: 'Farmhouse Dining Table', slug: 'farmhouse-dining-table', description: 'Large 8-seater farmhouse dining table in reclaimed elm. The centerpiece your dining room deserves.', price: 899, oldPrice: 1099, category: catMap['tables'], images: furnitureImages.tables, stock: 4, isFeatured: true, isSpecial: true, material: 'Reclaimed Elm', rating: 4.9, numReviews: 16 },
      { name: 'Live Edge Coffee Table', slug: 'live-edge-coffee-table', description: 'Stunning live-edge walnut slab coffee table. Natural raw edges with epoxy fill.', price: 449, oldPrice: null, category: catMap['tables'], images: furnitureImages.tables, stock: 6, isNew: true, isFeatured: true, material: 'Walnut Slab', rating: 5.0, numReviews: 9 },
      { name: 'Trestle Side Table', slug: 'trestle-side-table', description: 'Simple yet beautiful trestle-style side table. Perfect beside sofas or beds.', price: 134, oldPrice: 159, category: catMap['tables'], images: furnitureImages.tables, stock: 18, isPopular: true, material: 'Pine', rating: 4.5, numReviews: 34 },
      // Bookcases
      { name: 'Industrial Bookcase', slug: 'industrial-bookcase', description: '5-shelf industrial bookcase with reclaimed wood shelves and black steel frame.', price: 389, oldPrice: 459, category: catMap['bookcases'], images: furnitureImages.bookcases, stock: 9, isFeatured: true, material: 'Wood + Steel', rating: 4.7, numReviews: 27 },
      { name: 'Floating Wall Shelves Set', slug: 'floating-wall-shelves-set', description: 'Set of 3 rustic floating wall shelves in solid pine. Easy to install.', price: 129, oldPrice: null, category: catMap['bookcases'], images: furnitureImages.bookcases, stock: 30, isNew: true, isPopular: true, material: 'Pine', rating: 4.6, numReviews: 52 },
      // Cabinets
      { name: 'Apothecary Cabinet', slug: 'apothecary-cabinet', description: 'Vintage-inspired apothecary cabinet with 20 small drawers. Stunning storage solution.', price: 699, oldPrice: 849, category: catMap['cabinets'], images: furnitureImages.cabinets, stock: 3, isFeatured: true, isSpecial: true, material: 'Mango Wood', rating: 4.8, numReviews: 11 },
      { name: 'Rustic Chest of Drawers', slug: 'rustic-chest-of-drawers', description: '5-drawer chest in distressed pine. Antique finish with iron hardware.', price: 459, oldPrice: null, category: catMap['cabinets'], images: furnitureImages.cabinets, stock: 7, isPopular: true, material: 'Distressed Pine', rating: 4.4, numReviews: 19 },
      // Boxes
      { name: 'Trinket Box Set', slug: 'trinket-box-set', description: 'Set of 3 handcrafted wooden trinket boxes. Perfect for jewelry and keepsakes.', price: 59, oldPrice: 79, category: catMap['boxes'], images: furnitureImages.boxes, stock: 40, isNew: true, isSpecial: true, material: 'Sheesham', rating: 4.6, numReviews: 63 },
      { name: 'Vintage Wine Box', slug: 'vintage-wine-box', description: 'Rustic wine storage box for 6 bottles. Makes a perfect gift.', price: 89, oldPrice: null, category: catMap['boxes'], images: furnitureImages.boxes, stock: 22, isPopular: true, material: 'Pine', rating: 4.5, numReviews: 28 },
    ];

    await Product.insertMany(productData);
    console.log('✅ Database seeded successfully!');
    console.log('👤 Admin: admin@rustikplank.com / admin123');
    console.log('👤 User: john@example.com / user123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
