import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full relative">
        <Hero />
        <section
          id="about"
          className="min-h-screen my-4 flex items-center justify-center"
        >
          <About />
        </section>
        <section id="services" className="py-8">
          <Services />
        </section>
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
        >
          <Projects />
        </section>
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
