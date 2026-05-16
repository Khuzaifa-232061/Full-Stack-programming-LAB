export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">About Us</h1>
      <p className="text-gray-500 mb-8 text-lg">
        Learn more about who we are and what we do.
      </p>

      <div className="bg-white rounded-xl shadow p-8 mb-6">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          We are dedicated to building high-quality web applications using modern technologies.
          Our goal is to create fast, accessible, and beautiful digital experiences for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { label: "Founded", value: "2024" },
          { label: "Team Size", value: "10+ Engineers" },
          { label: "Projects", value: "50+ Delivered" },
          { label: "Tech Stack", value: "Next.js, TypeScript" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-400 uppercase tracking-wide">{item.label}</p>
            <p className="text-xl font-bold text-blue-700 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Values</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>User-first design and development</li>
          <li>Clean, maintainable code</li>
          <li>Continuous learning and improvement</li>
          <li>Collaboration and transparency</li>
        </ul>
      </div>
    </div>
  );
}
