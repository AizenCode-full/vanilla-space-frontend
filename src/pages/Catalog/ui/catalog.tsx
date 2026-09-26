import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, type Category, type Product } from "@/entities/product";
import type { JSX } from "react";

const ITEMS_PER_PAGE = 9;

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="flex flex-col items-center no-underline hover:opacity-90 transition-opacity group">
      <div className="w-full aspect-[3/4] max-w-[350px] overflow-hidden bg-gray-100 mb-4 rounded-xs shadow-xs">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
      </div>
      <h3 className="text-lg sm:text-[20px] text-gray-900 text-center font-medium group-hover:text-[#6E9C9F] transition-colors">{product.name}</h3>
      <p className="text-sm sm:text-[15px] text-[#6E9C9F] text-center mt-1 font-semibold">{product.price} \$</p>
    </Link>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-12 mb-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="h-9 w-9 sm:h-10.25 sm:w-10.25 flex items-center justify-center text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 rounded transition-colors"
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-9 w-9 sm:h-10.25 sm:w-10.25 text-xs sm:text-sm border rounded transition-all ${
            page === currentPage 
              ? "bg-[#6E9C9F] border-[#6E9C9F] text-white font-medium" 
              : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="h-9 w-9 sm:h-10.25 sm:w-10.25 flex items-center justify-center text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 rounded transition-colors"
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
}
export function Catalog(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<Category>("Все");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки");
        return response.json();
      })
      .then((data) => {
        const items = data.product || data.products || data;
        if (Array.isArray(items)) {
          const mappedProducts = items.map((item: any) => ({
            ...item,
            price: item.price || item.priceCurrent, 
          }));
          setProducts(mappedProducts);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка каталога:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = useMemo<Product[]>(() => {
    if (activeCategory === "Все") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo<Product[]>(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  function handleCategoryChange(category: Category) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-lg text-gray-400 font-sans">
        Загрузка коллекции Vanilla Space...
      </div>
    );
  }

  return (
    <div className="w-full xl:max-w-[1110px] mx-auto px-4 sm:px-6 py-10 font-sans select-none overflow-x-hidden animate-fade-in">
      <h1 className="text-4xl sm:text-[55px] font-medium mb-4 mt-6 lg:mt-12 text-black">Магазин</h1>
      <div className="text-sm sm:text-[17px] text-gray-800 mb-10 sm:mb-16">
        Главная <span className="mx-1 text-gray-400">— Магазин</span>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-12 sm:mb-16 justify-center sm:justify-start">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`min-w-[120px] sm:w-[191px] h-12 sm:h-15.5 px-4 text-sm sm:text-[18px] border transition-all rounded-xs font-medium tracking-wide ${
              activeCategory === category 
                ? "bg-black text-white border-black shadow-xs" 
                : "text-black border-gray-200 hover:border-black bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="text-sm sm:text-[17px] text-gray-400 mb-8 text-center sm:text-left">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>
      {filteredProducts.length === 0 ? (
        <p className="text-[17px] text-gray-400 py-20 text-center">В этой категории пока нет товаров</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16 justify-items-center">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <p className="hidden sm:block text-[17px] text-gray-400 my-10">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

    </div>
  );
}
