import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white rounded-2xl p-12 mb-10 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to MyApp</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
          A modern Next.js application built with TypeScript and Tailwind CSS.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/about"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "⚡ Fast",
            desc: "Built with Next.js App Router for blazing-fast performance and SSR.",
          },
          {
            title: "🎨 Beautiful",
            desc: "Styled with Tailwind CSS for a clean, responsive, and modern UI.",
          },
          {
            title: "🔒 Reliable",
            desc: "Type-safe codebase using TypeScript for robust, maintainable code.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2 text-blue-700">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Quick Nav */}
      <section className="bg-white rounded-xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Explore Pages</h2>
        <div className="flex justify-center gap-6">
          <Link
            href="/about"
            className="text-blue-600 hover:underline font-medium"
          >
            → About
          </Link>
          <Link
            href="/contact"
            className="text-blue-600 hover:underline font-medium"
          >
            → Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
