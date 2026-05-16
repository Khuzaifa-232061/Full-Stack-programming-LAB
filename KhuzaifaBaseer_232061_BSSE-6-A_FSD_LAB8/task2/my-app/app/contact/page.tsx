export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">Contact Us</h1>
      <p className="text-gray-500 mb-8 text-lg">We'd love to hear from you.</p>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <button className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-lg hover:bg-indigo-800 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
