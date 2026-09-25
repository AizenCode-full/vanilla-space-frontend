import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, type Category, type Product } from "@/entities/product";
import Footer from "../../../widgets/footer/ui/footer"
const ITEMS_PER_PAGE = 9;

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="flex flex-col items-center no-underline hover:opacity-90 transition-opacity">
      <div className="h-[478px] w-[350px] overflow-hidden bg-gray-100 mb-3">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-[20px] text-gray-900 text-center font-medium">{product.name}</h3>
      <p className="text-[15px] text-[#6E9C9F] text-center mt-1">{product.price} \$</p>
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
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="h-10.25 w-10.25 text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Предыдущая страница"
      >
        ←
      </button>


      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10.25 w-10.25 text-sm border rounded transition-colors ${
            page === currentPage ? "bg-[#6E9C9F] border-[#6E9C9F] text-white" : "border-gray-200 text-gray-500 hover:border-gray-400"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="h-10.25 w-10.25 text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
}

export default function CatalogPage() {
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
      <div className="flex h-[60vh] items-center justify-center text-lg text-gray-400">
        Загрузка коллекции Vanilla Space...
      </div>
    );
  }

  return (
    <div className="max-w-[1110px] mx-auto px-6 py-10 animate-fade-in">
      <h1 className="text-[55px] font-medium mb-4">Магазин</h1>
      <div className="text-[17px] text-black mb-12">
        Главная <span className="mx-1 text-gray-400">— Магазин</span>
      </div>

      <div className="flex gap-4 mb-16">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-8 h-15.5 text-[18px] border transition-all ${
              activeCategory === category 
                ? "bg-black text-white border-black" 
                : "text-black border-gray-200 hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="text-[17px] text-gray-400 mb-8">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>

      {filteredProducts.length === 0 ? (
        <p className="text-[17px] text-gray-400 py-20 text-center">В этой категории пока нет товаров</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="text-[17px] text-gray-400 my-8">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <Footer />

    </div>
  );
}
