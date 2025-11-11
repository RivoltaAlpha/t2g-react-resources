import { Home, Info, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-amber-900 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-amber-800">Get In Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions about Kenyan tea? Want to collaborate? We'd love to hear from you!
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-amber-700 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Email</h3>
                <p className="text-gray-700">info@kenyantea.co.ke</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-amber-700 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Phone</h3>
                <p className="text-gray-700">+254 712 345 678</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-amber-700 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Location</h3>
                <p className="text-gray-700">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-amber-50 p-6 rounded-lg">
            <h3 className="font-bold text-amber-900 mb-2">Office Hours</h3>
            <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="text-gray-700">Saturday: 10:00 AM - 2:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="What is this about?"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Tell us more..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-amber-900 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
