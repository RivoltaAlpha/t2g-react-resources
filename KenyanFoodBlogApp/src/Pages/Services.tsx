import { BookOpen, Briefcase, Coffee, Info, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const services = [
    {
      title: "Tea Consulting",
      description: "Expert advice on tea selection, preparation, and brewing techniques for homes and businesses.",
      icon: <Coffee className="w-12 h-12" />
    },
    {
      title: "Recipe Development",
      description: "Custom tea-based recipes and menu development for restaurants and cafes.",
      icon: <BookOpen className="w-12 h-12" />
    },
    {
      title: "Tea Events",
      description: "Organize and host tea tasting events, workshops, and cultural experiences.",
      icon: <User className="w-12 h-12" />
    },
    {
      title: "Content Creation",
      description: "Professional blog posts, articles, and social media content about tea culture.",
      icon: <Mail className="w-12 h-12" />
    },
    {
      title: "Tea Tours",
      description: "Guided tours of Kenyan tea farms and processing facilities for enthusiasts and tourists.",
      icon: <Briefcase className="w-12 h-12" />
    },
    {
      title: "Training Programs",
      description: "Comprehensive training on tea farming, processing, and business management.",
      icon: <Info className="w-12 h-12" />
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-amber-900 text-center">Our Services</h1>
      <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
        We offer a range of professional services to help you explore, enjoy, and profit from Kenya's rich tea culture.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="text-amber-700 mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-amber-900">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-linear-to-r from-amber-800 to-amber-600 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8 text-lg">Contact us today to discuss how we can help with your tea-related needs.</p>
        <Link 
          to="/contact"
          className="inline-block bg-white text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-100 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
