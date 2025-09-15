import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Skills  from "@/components/sections/Skills";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen w-full relative">
        
        {/* Your Content/Components */}
        {/* Hero Section */}
        <Hero />
        <section
          id="about"
          className="min-h-screen my-4 flex items-center justify-center"
        >
          <About />
        </section>
        <section
          id="skills"
          className="min-h-screen border-2 border-white flex items-center justify-center"
        >
          <Skills />
        </section>
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <h2 className="heading-lg">Projects Section</h2>
            <p className="body-lg">Coming soon...</p>
          </div>
        </section>
        <section
          id="resume"
          className="min-h-screen bg-card/30 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <h2 className="heading-lg">Resume Section</h2>
            <p className="body-lg">Coming soon...</p>
          </div>
        </section>
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <h2 className="heading-lg">Contact Section</h2>
            <p className="body-lg">Coming soon...</p>
          </div>
        </section>
      </div>
      ;
    </>
  );
}
