import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import CompetitiveProgramming from "@/components/sections/CompetitiveProgramming";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import SummitJourney from "@/components/sections/SummitJourney";
import Contact from "@/components/sections/Contacts";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#070711] text-white overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <CompetitiveProgramming />
        <Projects />
        <Experience />
        <Achievements />
        <Certifications />
        <SummitJourney />
        <Contact />
      </main>
    </div>
  );
}
