import { BookOpen, Briefcase, Coffee, Home, Info, Mail } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-amber-200 transition">
            <Coffee className="w-8 h-8" />
            <span>KenyanTea</span>
          </Link>
          
          <div className="flex gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
              }
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
              }
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </NavLink>
            
            <NavLink 
              to="/services" 
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
              }
            >
              <Briefcase className="w-5 h-5" />
              <span>Services</span>
            </NavLink>
            
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
              }
            >
              <BookOpen className="w-5 h-5" />
              <span>Blogs</span>
            </NavLink>
            
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
              }
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </NavLink>
          </div>
        <div className="flex gap-6">
          <NavLink 
            to="/login" 
            className={({ isActive }) => 
              `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
            }
          >
            <Coffee className="w-5 h-5" />
            <span>Login</span>
          </NavLink>
          
          <NavLink 
            to="/register" 
            className={({ isActive }) => 
              `flex items-center gap-2 hover:text-amber-200 transition ${isActive ? 'text-amber-300 font-semibold' : ''}`
            }
          >
            <Coffee className="w-5 h-5" />
            <span>Register</span>
          </NavLink>
        </div>
        </div>
        
      </div>
    </nav>
  );
}