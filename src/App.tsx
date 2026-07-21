import { useState } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Research } from "./components/Research";
import { Lab } from "./components/Lab";
import { StackContact } from "./components/StackContact";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Research />
        <Lab />
        <StackContact />
      </main>
    </div>
  );
}
