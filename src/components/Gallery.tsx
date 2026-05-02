import { motion, AnimatePresence } from 'motion/react';
import { WORKS } from '../constants';
import { Plus, X, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Work, Category } from '../types';

export default function Gallery() {
  const [works, setWorks] = useState<Work[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newWork, setNewWork] = useState<Partial<Work>>({
    category: Category.ILLUSTRATION,
    year: new Date().getFullYear(),
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lyc_works');
    if (saved) {
      setWorks(JSON.parse(saved));
    } else {
      setWorks(WORKS);
    }
  }, []);

  // Save to localStorage whenever works change
  useEffect(() => {
    if (works.length > 0 || localStorage.getItem('lyc_works')) {
      localStorage.setItem('lyc_works', JSON.stringify(works));
    }
  }, [works]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setNewWork({ ...newWork, imageUrl: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWork.title || !newWork.imageUrl) return;

    const work: Work = {
      id: Date.now().toString(),
      title: newWork.title!,
      englishTitle: newWork.englishTitle || 'UNTITLED',
      year: newWork.year || new Date().getFullYear(),
      category: newWork.category as Category,
      imageUrl: newWork.imageUrl!,
    };

    setWorks([work, ...works]);
    setIsAdding(false);
    setPreviewUrl(null);
    setNewWork({ category: Category.ILLUSTRATION, year: new Date().getFullYear() });
  };

  const removeWork = (id: string) => {
    if (confirm('確定要刪除此作品嗎？')) {
      setWorks(works.filter(w => w.id !== id));
    }
  };

  return (
    <section id="gallery" className="py-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
        {/* Add New Button Card */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           onClick={() => setIsAdding(true)}
           className="group border border-dashed border-white/20 aspect-[3/4] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-white/50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="text-xs tracking-widest uppercase font-light text-neutral-500">新增作品</span>
        </motion.div>

        {/* Works List */}
        {works.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
            className="group relative"
          >
            <button 
              onClick={() => removeWork(work.id)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
            >
              <X size={16} />
            </button>

            <div className="relative overflow-hidden aspect-[3/4] mb-6">
              <motion.img
                src={work.imageUrl}
                alt={work.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] tracking-[0.2em] font-light uppercase border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {work.category}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-serif tracking-wide group-hover:text-neutral-400 transition-colors">
                {work.title}
              </h3>
              <p className="text-xs tracking-[0.2em] font-light text-neutral-500 uppercase">
                {work.englishTitle} · {work.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-lg glass-card p-8 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-serif">新增作品</h2>
                <button onClick={() => setIsAdding(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] tracking-widest uppercase text-neutral-500">作品圖片</label>
                  
                  <div className="relative aspect-video w-full bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden group cursor-pointer hover:border-white/40 transition-colors">
                    {previewUrl ? (
                      <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-neutral-500">
                        <Upload size={24} />
                        <span className="text-[10px] tracking-widest uppercase italic font-light">點擊上傳檔案</span>
                      </div>
                    )}
                    <input
                      required={!previewUrl}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-500">或使用圖片網址 (URL)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30"
                      value={newWork.imageUrl || ''}
                      onChange={e => {
                        setNewWork({...newWork, imageUrl: e.target.value});
                        setPreviewUrl(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-500">中文名稱</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30"
                      value={newWork.title || ''}
                      onChange={e => setNewWork({...newWork, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-500">英文名稱</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30"
                      value={newWork.englishTitle || ''}
                      onChange={e => setNewWork({...newWork, englishTitle: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-500">類別</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30"
                      value={newWork.category}
                      onChange={e => setNewWork({...newWork, category: e.target.value as Category})}
                    >
                      {Object.values(Category).map(c => (
                        <option key={c} value={c} className="bg-neutral-900">{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-neutral-500">年份</label>
                    <input
                      type="number"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-white/30"
                      value={newWork.year || ''}
                      onChange={e => setNewWork({...newWork, year: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black text-sm tracking-[0.2em] font-medium uppercase hover:bg-neutral-200 transition-colors"
                >
                  確認發佈
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

