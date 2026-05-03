import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import NotionData from './components/NotionData';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="marble-overlay" />
      <div className="noise-bg" />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <NotionData />
        <About />
      </main>
      <Footer />
    </div>
  );
}

