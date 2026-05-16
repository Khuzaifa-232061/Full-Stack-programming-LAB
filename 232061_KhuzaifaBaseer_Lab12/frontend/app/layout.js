import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import '@/styles/globals.css';

export const metadata = {
  title: 'Rustik Plank - Handcrafted Furniture',
  description: 'Premium reclaimed & hand-crafted wooden furniture. Shop beds, chairs, tables, bookcases and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
