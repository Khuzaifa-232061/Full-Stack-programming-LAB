export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-soft ear cushions for all-day comfort. Compatible with all Bluetooth 5.0 devices.",
    price: 199.99,
    category: "Electronics",
    rating: 4.8,
    image: "🎧",
  },
  {
    id: 2,
    title: "Mechanical Gaming Keyboard",
    description:
      "Dominate every game with this RGB mechanical keyboard. Features tactile Cherry MX switches, anti-ghosting, N-key rollover, and a durable aluminum frame built to last millions of keystrokes.",
    price: 129.99,
    category: "Gaming",
    rating: 4.6,
    image: "⌨️",
  },
  {
    id: 3,
    title: "4K Ultra HD Monitor 27\"",
    description:
      "Stunning 4K resolution with IPS panel technology for vivid colours and wide viewing angles. 144Hz refresh rate and 1ms response time make it perfect for both professional work and competitive gaming.",
    price: 349.99,
    category: "Electronics",
    rating: 4.7,
    image: "🖥️",
  },
  {
    id: 4,
    title: "Ergonomic Office Chair",
    description:
      "Designed for long hours of comfortable sitting. Adjustable lumbar support, headrest, armrests, and seat height. Breathable mesh back keeps you cool while the memory foam cushion supports your posture.",
    price: 249.99,
    category: "Furniture",
    rating: 4.5,
    image: "🪑",
  },
  {
    id: 5,
    title: "Smart Fitness Watch",
    description:
      "Track your health and fitness goals with precision. Monitors heart rate, SpO2, sleep quality, and over 100 workout modes. Water-resistant up to 50m with a 7-day battery life and AMOLED display.",
    price: 179.99,
    category: "Wearables",
    rating: 4.4,
    image: "⌚",
  },
  {
    id: 6,
    title: "Portable Bluetooth Speaker",
    description:
      "Take your music anywhere with 360° surround sound, deep bass, and up to 24 hours of playtime. IPX7 waterproof rating makes it perfect for outdoors. Pairs instantly with any Bluetooth device.",
    price: 89.99,
    category: "Electronics",
    rating: 4.3,
    image: "🔊",
  },
];
