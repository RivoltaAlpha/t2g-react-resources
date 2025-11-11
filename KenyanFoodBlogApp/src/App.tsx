import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import HomePage from "./Pages/Landing";
import AboutPage from "./Pages/About";
import ServicesPage from "./Pages/Services";
import BlogsPage from "./Pages/Blogs";
import BlogPostPage from "./Pages/BlogPage";
import ContactPage from "./Pages/Contact";
import NotFoundPage from "./Pages/NotFound";

export default function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-amber-50">
        <Navigation />
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}