import { ContentProvider } from "@/lib/content";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Work from "@/components/sections/Work";
import Roles from "@/components/sections/Roles";
import Record from "@/components/sections/Record";
import Events from "@/components/sections/Events";
import Contact from "@/components/sections/Contact";

export default function Site() {
  return (
    <ContentProvider>
      <Nav />
      <main>
        <Hero />
        <Profile />
        <Work />
        <Roles />
        <Record />
        <Events />
        <Contact />
      </main>
    </ContentProvider>
  );
}
