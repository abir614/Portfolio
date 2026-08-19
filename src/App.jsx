import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer";
import Oneko from "./components/Oneko";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--neo-bg)] text-[var(--neo-text)] transition-colors duration-300 relative selection:bg-indigo-600 selection:text-white">
        <Oneko />
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;