import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: '作品', href: '#gallery' },
    { name: '關於', href: '#about' },
  ];

  return (
    <>
      <nav id="nav" className="fixed top-0 left-0 w-full z-50 py-8 px-6 md:px-12 flex justify-between items-center mix-blend-difference">
        <motion.a 
          href="/" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-serif tracking-widest text-white hover:opacity-50 transition-opacity"
        >
          LYC
        </motion.a>

        <div className="hidden md:flex gap-12">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm tracking-[0.2em] font-light hover:opacity-50 transition-opacity"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-serif tracking-widest hover:text-neutral-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </motion.div>
    </>
  );
}
