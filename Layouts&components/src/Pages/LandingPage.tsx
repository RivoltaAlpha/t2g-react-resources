import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

export const LandingPage = () => {
  return (
    <div className="flex flex-col my-20">
      <Header />
      <div className="flex flex-row gap-20 mb-60">
        <div className="flex flex-col justify-center items-center align-center gap-6">
          <Hero />
        </div>
        <div>
          <img src="./images/hero-desktop.jpg" className="lg:w-[1200px]" alt="Hero Image Desktop" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
