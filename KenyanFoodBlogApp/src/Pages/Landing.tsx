import { BookOpen, Clock, Coffee, User } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1588595758195-2d1d9b194f86?w=800&h=500&fit=crop",
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

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 bg-linear-to-r from-amber-800 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to KenyanTea</h1>
          <p className="text-xl mb-8">Discover the rich flavors and traditions of Kenyan tea culture</p>
          <Link 
            to="/blogs" 
            className="bg-white text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-100 transition"
          >
            Explore Our Blogs
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Why KenyanTea?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <Coffee className="w-12 h-12 text-amber-700 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-amber-900">Authentic Recipes</h3>
            <p className="text-gray-700">Traditional Kenyan tea recipes passed down through generations.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <BookOpen className="w-12 h-12 text-amber-700 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-amber-900">Expert Content</h3>
            <p className="text-gray-700">Articles written by tea enthusiasts and industry experts.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <User className="w-12 h-12 text-amber-700 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-amber-900">Community</h3>
            <p className="text-gray-700">Join a vibrant community of Kenyan tea lovers.</p>
          </div>
        </div>
      </div>
      
      {/* Latest Blogs Preview */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
              <Link 
                key={post.id}
                to={`/blogs/${post.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-amber-700 text-sm font-semibold">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/blogs" 
              className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-800 transition"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}