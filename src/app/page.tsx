import Image from "next/image";
import "./globals.css";
import HeroSection from "./components/HeroSection";
import SecondSection from "./components/SecondSection";
export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <SecondSection/>
    </div>
  );
}
