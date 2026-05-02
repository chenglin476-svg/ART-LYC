import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-40 px-6 md:px-12 bg-neutral-900/20">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-4"
        >
          <span className="text-xs tracking-[0.4em] text-neutral-500 uppercase">Artist profile</span>
          <h2 className="text-5xl font-serif">關於 LYC</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 text-neutral-300 font-light leading-relaxed tracking-wide"
        >
          <div className="space-y-6">
            <p>
              藝術不必總是解釋自己，不是每一筆都需要象徵，不是每一張畫都要有劇情。
            </p>
            <p>
              有時候，畫面本身就是答案。
            </p>
          </div>
          <div className="space-y-6">
            <p>
              畫畫不一定需要理由。有時創作只是把腦海中的景象，或眼中的世界留下來。不為說服誰，也不為解釋什麼，只是誠實地呈現，價值由自己定義。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
