'use client';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSending(false);
    }, 1500);
  };

  return (
    <div>
      <div className="relative h-64 flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-wood-900/70" />
        <div className="relative container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">Contact Us</h1>
          <p className="text-wood-200">Home / <span className="text-primary">Contact</span></p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-heading font-bold text-wood-800 mb-2">Get In Touch</h2>
            <div className="orange-bar" />
            <p className="text-wood-400 mb-8">Have a question about our furniture or a bespoke order? We'd love to hear from you.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[['name','Your Name','text'],['email','Email Address','email']].map(([key, ph, type]) => (
                  <div key={key}>
                    <input type={type} value={form[key]} onChange={e => setForm(f => ({...f,[key]:e.target.value}))} placeholder={ph} required
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
              </div>
              <input value={form.subject} onChange={e => setForm(f => ({...f,subject:e.target.value}))} placeholder="Subject" required
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
              <textarea value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} placeholder="Your message..." required rows={6}
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none" />
              <button type="submit" disabled={sending} className="btn-primary px-10 py-3 text-base disabled:opacity-60">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-wood-800 mb-2">Find Us</h2>
            <div className="orange-bar" />
            {[
              { icon: FaMapMarkerAlt, title: 'Address', lines: ['123 Woodcraft Lane', 'London, EC1A 1BB', 'United Kingdom'] },
              { icon: FaPhone, title: 'Phone', lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'] },
              { icon: FaEnvelope, title: 'Email', lines: ['info@rustikplank.com', 'support@rustikplank.com'] },
              { icon: FaClock, title: 'Opening Hours', lines: ['Mon–Fri: 9am – 6pm', 'Saturday: 10am – 4pm', 'Sunday: Closed'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-wood-800 text-sm mb-1">{title}</p>
                  {lines.map(l => <p key={l} className="text-wood-400 text-sm">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
