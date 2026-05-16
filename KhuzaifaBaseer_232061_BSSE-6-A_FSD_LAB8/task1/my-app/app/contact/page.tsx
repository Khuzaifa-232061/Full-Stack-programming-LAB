export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Contact Us</h1>
      <p className="text-gray-500 mb-8 text-lg">
        Have a question or want to work with us? Fill out the form below.
      </p>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <button className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">
            Send Message
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600">
        {[
          { icon: "📧", label: "Email", value: "hello@myapp.com" },
          { icon: "📞", label: "Phone", value: "+1 (555) 000-1234" },
          { icon: "📍", label: "Location", value: "Rawalpindi, PK" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow p-4">
            <div className="text-2xl mb-1">{c.icon}</div>
            <p className="font-semibold text-gray-700">{c.label}</p>
            <p className="text-gray-500">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
