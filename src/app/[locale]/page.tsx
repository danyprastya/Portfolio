import NavbarPorto from "../../components/NavbarPorto";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="relative w-full">
      <NavbarPorto/>
      <Hero/>
      <About/>
      <Projects/>
    </div>
  );
}
