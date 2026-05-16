'use client';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="bg-wood-800 text-white text-xs py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><FaPhone className="text-primary" /> +1 (555) 123-4567</span>
          <span className="flex items-center gap-1"><FaEnvelope className="text-primary" /> info@rustikplank.com</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-wood-300">Free shipping on orders over £200</span>
          <div className="flex gap-2 ml-4">
            <FaFacebook className="hover:text-primary cursor-pointer transition-colors" />
            <FaTwitter className="hover:text-primary cursor-pointer transition-colors" />
            <FaInstagram className="hover:text-primary cursor-pointer transition-colors" />
            <FaPinterest className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
