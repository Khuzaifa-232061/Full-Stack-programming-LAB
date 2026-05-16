import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MyApp – Next.js",
  description: "A multi-page Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* Global Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-10">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
