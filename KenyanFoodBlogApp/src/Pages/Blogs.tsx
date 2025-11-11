import { Clock, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "The Perfect Kenyan Chai Recipe",
    author: "Wanjiku Mwangi",
    date: "2024-11-01",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=500&fit=crop",
    excerpt: "Learn how to make authentic Kenyan chai with this traditional recipe passed down through generations.",
    content: "Kenyan chai is more than just tea - it's a cultural experience. Start by boiling water with loose black tea leaves, add milk, sugar, and a hint of ginger. The secret is in the slow simmering process that creates that perfect creamy texture and rich flavor that Kenyans love."
  },
  {
    id: 2,
    title: "Exploring Nairobi's Best Tea Houses",
    author: "James Omondi",
    date: "2024-10-28",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=500&fit=crop",
    excerpt: "A comprehensive guide to the top tea houses in Nairobi where you can enjoy authentic Kenyan tea and snacks.",
    content: "From the bustling streets of downtown Nairobi to the quiet corners of Karen, we've explored the best tea houses. Our top picks include Mama Oliech's Tea Room, The Java House, and the hidden gem - Wanjiru's Corner Cafe. Each offers a unique tea experience with traditional accompaniments like mandazi and chapati."
  },
  {
    id: 3,
    title: "Health Benefits of Kenyan Tea",
    author: "Dr. Sarah Kimani",
    date: "2024-10-25",
    category: "Health",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=500&fit=crop",
    excerpt: "Discover the amazing health benefits of Kenyan tea and why it's more than just a delicious beverage.",
    content: "Kenyan tea is rich in antioxidants and has numerous health benefits. Studies show that regular tea consumption can improve heart health, boost immunity, and aid digestion. The addition of ginger, common in Kenyan chai, adds anti-inflammatory properties making it even more beneficial."
  },
  {
    id: 4,
    title: "Tea Farming in the Kenyan Highlands",
    author: "Peter Kariuki",
    date: "2024-10-20",
    category: "Culture",
    image: "https://imgs.search.brave.com/6pRpgNhhTf_Zr6RjX-0427Basvrv99YVUTE282P91p0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE3LzM5LzI1LzE5/LzM2MF9GXzE3Mzky/NTE5NjFfdldYU2pL/UGwwSlRDNElvOWlG/Z3QweUVnRWVwakxG/RkcuanBn",
    excerpt: "An inside look at tea farming in Kenya's lush highlands and the farmers who make it possible.",
    content: "Kenya is one of the world's leading tea producers. The highlands of Kericho and Nandi provide the perfect climate for tea cultivation. We spoke with local farmers about sustainable farming practices and the future of Kenya's tea industry."
  },
  {
    id: 5,
    title: "Pairing Kenyan Snacks with Tea",
    author: "Lucy Achieng",
    date: "2024-10-15",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=500&fit=crop",
    excerpt: "The best Kenyan snacks to pair with your afternoon tea for the ultimate experience.",
    content: "No Kenyan tea time is complete without the right snacks. From crispy mandazi to soft chapati, sweet mahamri to savory samosas - we explore the perfect pairings that will elevate your tea drinking experience to new heights."
  },
  {
    id: 6,
    title: "The History of Tea in Kenya",
    author: "Prof. Michael Ngugi",
    date: "2024-10-10",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1597318236337-b729607f6b10?w=800&h=500&fit=crop",
    excerpt: "Journey through time to discover how tea became an integral part of Kenyan culture and economy.",
    content: "Tea was introduced to Kenya in the early 1900s and has since become deeply woven into the fabric of Kenyan society. From colonial plantations to today's thriving tea industry, this beverage has shaped Kenya's economy and social traditions in profound ways."
  }
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-amber-900 text-center">Our Blog</h1>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === category
                  ? 'bg-amber-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Link
            key={post.id}
            to={`/blogs/${post.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-700 text-sm font-semibold">{post.category}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}