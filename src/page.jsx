import FeaturedCollections from "../src/Components/FeaturedCollection/FeaturedCollections";
// import CreativeInspirations from "../src/Components/CreativeInspiration/CreativeInspirations";
import CreativeShowcase from "../src/Components/CreativeShowcase/CreativeShowcase";
import Features from "../src/Components/Features/Features";
import Footer from "../src/Components/Footer/Footer";
import Hero from "../src/Components/Hero/Hero";
// import ProductGrid from "../public/Components/ProductGrid";
// import SplineScene from "../src/Components/SplineScene/SplineScene";
import Softwares from "../src/Components/Software/Softwares";
import Navbar from "../src/Components/Navbar/Navbar";
export default function Home() {
  return (
    <>
      <Hero />
      <Softwares/>
      {/* <ProductGrid /> */}
      <Features />
      <FeaturedCollections />
      {/* <SplineScene /> */}
      <CreativeShowcase />
      {/* <CreativeInspirations /> */}
      {/* <MarketPlace/> */}
    </>
  );
}
