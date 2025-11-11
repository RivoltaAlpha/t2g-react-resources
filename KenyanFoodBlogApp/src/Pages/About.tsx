import { BookOpen, Coffee, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-amber-900">About KenyanTea</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop" 
            alt="Kenyan tea" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-amber-800">Our Story</h2>
          <p className="text-gray-700 mb-4">
            KenyanTea was founded in 2020 with a simple mission: to celebrate and share the rich tea culture of Kenya with the world. What started as a personal blog has grown into a comprehensive resource for tea enthusiasts everywhere.
          </p>
          <p className="text-gray-700 mb-4">
            Kenya is one of the world's largest tea producers, and tea is deeply woven into our daily lives. From the morning chai that starts our day to the afternoon tea break that brings communities together, tea is more than just a beverage - it's a way of life.
          </p>
          <p className="text-gray-700">
            Through our blog, we aim to preserve traditional recipes, explore modern tea culture, and connect tea lovers across Kenya and beyond.
          </p>
        </div>
      </div>
      
      <div className="bg-amber-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-amber-900 text-center">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-amber-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2 text-amber-800">Preserve Traditions</h3>
            <p className="text-gray-700">Keep traditional Kenyan tea recipes and practices alive for future generations.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2 text-amber-800">Educate & Inspire</h3>
            <p className="text-gray-700">Share knowledge about tea farming, preparation, and health benefits.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2 text-amber-800">Build Community</h3>
            <p className="text-gray-700">Connect tea lovers and create a space for sharing experiences.</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 text-amber-900">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { name: "Wanjiku Mwangi", role: "Founder & Editor" },
            { name: "James Omondi", role: "Content Writer" },
            { name: "Sarah Kimani", role: "Health Expert" },
            { name: "Peter Kariuki", role: "Cultural Researcher" }
          ].map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-amber-800" />
              </div>
              <h3 className="font-bold text-amber-900">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}