import Image from "next/image";
import "./globals.css";
import HeroSection from "./components/HeroSection";
import SecondSection from "./components/SecondSection";
import ResourceFeed from "./components/ResourceFeed";
import Cards from "./components/Cards";
import Finisher from "./components/Finisher";

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <SecondSection />
      <ResourceFeed />
      <Cards />
      <Finisher/>
    </div>
  );
}
