import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Hero } from "@/components/hero/hero";
import { ProjectsComponent } from "./components/Projects";
import { Services } from "@/components/services/services";
import { Faq } from "@/components/faq/faq";
import { Stats } from "@/components/stats/stats";

export function HomePage() {
  return (
    <>
      <Hero />

      <Services />
      
      <ProjectsComponent />
      
      <About />
      
      <Contact />
      
      <Faq />
      
      <Stats />
    </>
  );
}
