export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">About ShopNext</h1>
      <p className="text-gray-500 mb-8 text-lg">Who we are and what drives us.</p>

      <div className="bg-white rounded-xl shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          ShopNext was created as a learning project to demonstrate the power of Next.js with
          dynamic routing, reusable components, and Tailwind CSS styling. We believe great
          software starts with clean code and thoughtful design.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Products", value: "6+" },
          { label: "Categories", value: "4" },
          { label: "Happy Users", value: "1K+" },
          { label: "Tech", value: "Next.js" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow p-5 text-center">
            <p className="text-2xl font-extrabold text-indigo-700">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Next.js 14 with App Router</li>
          <li>TypeScript for type safety</li>
          <li>Tailwind CSS for styling</li>
          <li>Dynamic routing with [id] pages</li>
        </ul>
      </div>
    </div>
  );
}
