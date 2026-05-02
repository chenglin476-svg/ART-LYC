import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 bg-black">
      <div className="absolute inset-0 bg-black z-0" />

      <div className="relative z-10 text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-serif tracking-[0.1em]"
        >
          LYC
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-lg md:text-xl font-light tracking-[0.5em] uppercase bg-gradient-to-b from-[#D4AF37] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent"
        >
          TO LIVE IS TO RISK IT ALL
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.5 }}
           className="pt-12"
        >
          <a 
            href="#gallery"
            className="inline-block border border-white/30 rounded-full px-10 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-500 uppercase font-light"
          >
            探索作品
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-500"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
}
