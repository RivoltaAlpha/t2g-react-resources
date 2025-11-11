import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <Coffee className="w-24 h-24 text-amber-300 mx-auto mb-6" />
      <h1 className="text-6xl font-bold mb-4 text-amber-900">404</h1>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist. Perhaps it's time for a tea break?
      </p>
      <Link
        to="/"
        className="inline-block bg-amber-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
