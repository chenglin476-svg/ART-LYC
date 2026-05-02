import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="marble-overlay" />
      <div className="noise-bg" />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
}

