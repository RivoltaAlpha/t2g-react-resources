import { Clock, User } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";


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


export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id || '0'));
  
  if (!post) {
    return <Navigate to="/404" replace />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blogs" className="text-amber-700 hover:text-amber-900 mb-6 inline-flex items-center">
        ← Back to Blogs
      </Link>
      
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-amber-900">{post.title}</h1>
          
          <div className="flex items-center mb-6 text-gray-600">
            <User className="w-5 h-5 mr-2" />
            <span>By {post.author}</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">{post.excerpt}</p>
            <p className="text-lg leading-relaxed text-gray-700">{post.content}</p>
          </div>
        </div>
      </article>
      
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-amber-900">More Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id)
            .slice(0, 3)
            .map(relatedPost => (
              <Link
                key={relatedPost.id}
                to={`/blogs/${relatedPost.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2">{relatedPost.title}</h4>
                  <p className="text-sm text-gray-600">{relatedPost.excerpt.substring(0, 80)}...</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}