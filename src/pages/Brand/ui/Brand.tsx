
import type { JSX } from 'react';
import { useAppSelector } from '@/hooks'; // Чтение из Redux
import { useNavigate } from 'react-router-dom';

export function Brand(): JSX.Element {
  const brandState = useAppSelector((state) => state.brand);
  const navigate = useNavigate();
  if (!brandState || !brandState.blocks) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-sm font-medium text-gray-400">
        Загрузка пространства Vanilla Space...
      </div>
    );
  }

  const { title, blocks } = brandState;
  return (
    <div className="brand-page max-w-277.5 mx-auto px-6 py-10 font-sans animate-fade-in"> 
        <div className="brand-page__header bg-white mb-16 mt-20">
          <h1 className="text-5xl font-medium text-black mb-6">{title || "О бренде"}</h1>
          <p className="text-sm font-normal text-[#909090] tracking-wide">
            <span onClick={() => navigate('/')} className="hover:text-[#6E9C9F] cursor-pointer transition-colors">
              Главная
            </span>
            <span className="mx-2 text-gray-300">—</span>О бренде
          </p>
        </div>
        <div className="brand-page__sections flex flex-col gap-24">
          {blocks.map((block) => (
            <div 
              key={block.id} 
              className={`brand-section flex flex-col justify-between items-center gap-12 ${
                block.isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="brand-section__image-wrapper w-110.5 h-136.75 bg-gray-50 overflow-hidden shadow-xs rounded-sm">
                {block.image ? (
                  <img className="w-full h-full object-cover" src={block.image} alt={block.title} />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">📸 Нет фото</div>
                )}
              </div>
              <div className="brand-section__content w-136.25 flex flex-col gap-6">
                <h2 className="text-2xl font-medium text-black tracking-wide">{block.title}</h2>
                <p className="text-sm font-medium text-black leading-relaxed mt-2">{block.textFirst}</p>
                <p className="text-sm font-medium text-black leading-relaxed">{block.textSecond}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-20">
          <button 
            onClick={() => navigate('/shop')}
            className="w-65 h-17 bg-[#6E9C9F] text-white text-sm font-bold uppercase tracking-widest text-center hover:bg-[#5b8588] transition-colors rounded-sm shadow-xs"
          >
            Перейти в магазин
          </button>
        </div>

    </div>
  );
}
