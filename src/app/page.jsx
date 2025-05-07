import Features from "./components/Features";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="space-y-24">
     <Hero/>
     <Features/>
     <Testimonials/>
      
    </div>
  );
}
