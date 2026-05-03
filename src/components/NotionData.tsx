import { useEffect, useState } from 'react';

export default function NotionData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotionData = async () => {
      try {
        const response = await fetch('/api/notion');
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || '無法取得 Notion 資料');
        }
        
        setData(result);
        console.log("Notion 資料：", result);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotionData();
  }, []);

  if (loading) return <div className="text-neutral-500 tracking-[0.2em] text-center py-32 text-sm uppercase font-light">Loading...</div>;
  if (error) return <div className="text-red-500/50 text-center py-32 text-sm">Error: {error}</div>;

  return (
    <section id="portfolio" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
        {data.map((page: any, index: number) => {
          // 提取屬性
          const props = page.properties;
          if (!props) return null;

          // 提取作品名稱 (Title)
          const titleObj = props['作品名稱']?.title?.[0];
          const title = titleObj ? titleObj.plain_text : '未命名作品';

          // 提取內文 (Rich Text)
          const textObj = props['幹你娘']?.rich_text?.[0];
          const text = textObj ? textObj.plain_text : '';

          // 提取圖片 (Files)
          const filesArray = props['檔案和照片']?.files || [];
          let imageUrl = '';
          if (filesArray.length > 0) {
            const fileObj = filesArray[0];
            imageUrl = fileObj.type === 'file' ? fileObj.file.url : fileObj.external?.url;
          }

          return (
            <div key={page.id || index} className="group flex flex-col">
              {imageUrl ? (
                <div className="relative overflow-hidden aspect-[4/5] mb-8">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" 
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/5] bg-neutral-900/50 mb-8 flex items-center justify-center text-neutral-700 font-light tracking-widest text-sm uppercase">
                  No Image
                </div>
              )}
              <h3 className="text-3xl md:text-4xl font-serif tracking-wide text-white mb-4 group-hover:text-neutral-400 transition-colors duration-500">{title}</h3>
              <p className="text-neutral-400 whitespace-pre-wrap tracking-wide leading-relaxed font-light text-sm md:text-base">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
