import { useState, useEffect } from "react";
import type { JSX } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Product as ProductType, Size } from "@/entities/product";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  onSelect: (size: Size) => void;
}

function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`h-10 w-10 text-sm border rounded transition-all font-medium ${
            size === selectedSize
              ? "bg-black text-white border-black shadow-xs"
              : "border-gray-200 text-gray-700 bg-white hover:border-black"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

interface ColorSelectorProps {
  colors: any[];
  selectedColorId: number;
  onSelect: (id: number) => void;
}

function ColorSelector({ colors, selectedColorId, onSelect }: ColorSelectorProps) {
  if (!colors || !Array.isArray(colors)) return null;
  
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.id || color.color || color}
          onClick={() => onSelect(color.id || 1)}
          aria-label="Выбрать цвет"
          className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
            (color.id || 1) === selectedColorId ? "border-black scale-105" : "border-gray-200"
          }`}
          style={{ backgroundColor: color.hex || color.color || '#6E9C9F' }}
        />
      ))}
    </div>
  );
}

interface RelatedProductCardProps {
  product: ProductType;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="flex flex-col items-center sm:items-start no-underline text-black group w-full max-w-55">
      <div className="w-full aspect-square overflow-hidden bg-gray-50 mb-3 rounded-xs shadow-xs">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-base font-medium group-hover:text-[#6E9C9F] transition-colors text-center sm:text-left">{product.name}</h3>
      <p className="text-sm font-semibold text-[#6E9C9F] mt-1">{product.price || (product as any).priceCurrent} \$</p>
    </Link>
  );
}

export function Product(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [selectedColorId, setSelectedColorId] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка сервера");
        return res.json();
      })
      .then((data) => {
        const items = data.products || data.product || data;
        if (Array.isArray(items)) {
          setAllProducts(items);
          const found = items.find((p: any) => String(p.id) === String(id));
          if (found) {
            setProduct({
              ...found,
              price: found.price || found.priceCurrent
            });
            if (found.colors && found.colors[0]) {
              setSelectedColorId(found.colors[0].id || 1);
            }
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки товара:", err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-base text-gray-400 font-sans">
        Загрузка параметров товара Vanilla Space...
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="w-full xl:max-w-277.5 mx-auto px-4 py-20 text-center font-sans">
        <p className="text-xl text-gray-500 mb-6">Товар не найден в коллекции</p>
        <button 
          onClick={() => navigate('/catalog')}
          className="px-6 py-2 bg-[#6E9C9F] text-white rounded-xs font-medium hover:bg-[#52777a] transition-colors"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 2);

  function handleQuantityChange(value: number) {
    setQuantity(Math.max(1, value));
  }

  function handleAddToCart() {
    console.log("Добавлено в корзину:", {
      productId: product!.id,
      size: selectedSize,
      colorId: selectedColorId,
      quantity,
    });
  }

  return (
    <div className="w-full xl:max-w-277.5 mx-auto px-4 py-10 font-sans select-none overflow-x-hidden animate-fade-in">
      <h1 className="text-3xl sm:text-[55px] font-medium mb-4 mt-6 lg:mt-12 text-black">{product.name}</h1>
      <div className="text-sm sm:text-lg text-gray-500 mb-12 flex flex-wrap gap-1.5">
        <Link to="/" className="no-underline text-gray-500 hover:text-[#6E9C9F] transition-colors">Главная</Link>
        <span className="text-gray-300">—</span> 
        <Link to="/catalog" className="no-underline text-gray-500 hover:text-[#6E9C9F] transition-colors">{product.category || "Одежда"}</Link>
        <span className="text-gray-300">—</span> 
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 items-center lg:items-start">
        
        <div className="lg:col-span-6 w-full aspect-536/729 max-h-182.25 overflow-hidden bg-gray-50 rounded-xs shadow-xs">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="lg:col-span-6 flex flex-col gap-8 w-full max-w-md mx-auto lg:mx-0 pt-2 justify-center h-full">
          
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-3xl sm:text-[40px] text-[#6E9C9F] font-semibold">\${product.price}</span>
            {(product as any).priceOld && (
              <span className="text-lg sm:text-[18px] text-gray-400 line-through">\${(product as any).priceOld}</span>
            )}
          </div>

          <div>
            <p className="text-base sm:text-[20px] font-medium text-black mb-4">Выберите размер</p>
            <SizeSelector sizes={product.sizes || ["S", "M", "L"]} selectedSize={selectedSize} onSelect={setSelectedSize} />
          </div>

          <div>
            <p className="text-base sm:text-[20px] font-medium text-black mb-4">Выберите цвет</p>
            <ColorSelector
              colors={(product as any).colors || [{ id: 1, hex: "#6E9C9F" }]}
              selectedColorId={selectedColorId}
              onSelect={setSelectedColorId}
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="h-11 w-16 border border-gray-300 rounded-xs text-center font-medium focus:outline-none"
            />
            <button
              onClick={handleAddToCart}
              className="h-11 flex-1 sm:flex-none px-8 rounded-xs text-white text-base font-medium transition-colors"
              style={{ backgroundColor: "#6f9a97" }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <h2 className="text-2xl sm:text-[44px] font-medium mb-10 text-black text-center sm:text-left">Связанные товары</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 justify-items-center sm:justify-items-start">
            {relatedProducts.map((related) => (
              <RelatedProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
