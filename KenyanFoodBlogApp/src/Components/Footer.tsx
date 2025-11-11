import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Coffee className="w-6 h-6" />
              KenyanTea
            </h3>
            <p className="text-amber-200">
              Celebrating Kenya's rich tea culture and traditions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-300 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition">About</Link></li>
              <li><Link to="/blogs" className="hover:text-amber-300 transition">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <p className="text-amber-200">Email: info@kenyantea.co.ke</p>
            <p className="text-amber-200">Phone: +254 712 345 678</p>
            <p className="text-amber-200">Nairobi, Kenya</p>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-8 pt-6 text-center text-amber-300">
          <p>&copy; 2024 KenyanTea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}