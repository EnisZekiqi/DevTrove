import Image from "next/image";
import "./globals.css";
import HeroSection from "./components/HeroSection";
export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection/>
    </div>
  );
}
