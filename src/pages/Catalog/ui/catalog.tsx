// import { useEffect, useMemo, useState } from "react";

// type Category = "Все" | "Пальто" | "Свитшоты" | "Кардиганы" | "Толстовки";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: Category;
// }

// const PRODUCTS: Product[] = [
//   { id: 1, name: "Футболка USA", price: 800, image: "/images/usa-tee.jpg", category: "Толстовки" },
//   { id: 2, name: "Купальник Glow", price: 800, image: "/images/glow.jpg", category: "Свитшоты" },
//   { id: 3, name: "Свитшот Sweet Shot", price: 800, image: "/images/sweet-shot.jpg", category: "Свитшоты" },
//   { id: 4, name: "Пальто Classic", price: 2400, image: "/images/coat-classic.jpg", category: "Пальто" },
//   { id: 5, name: "Кардиган Soft", price: 1500, image: "/images/cardigan-soft.jpg", category: "Кардиганы" },
//   { id: 6, name: "Толстовка Basic", price: 1200, image: "/images/hoodie-basic.jpg", category: "Толстовки" },
//   { id: 7, name: "Пальто Winter", price: 2600, image: "/images/coat-winter.jpg", category: "Пальто" },
//   { id: 8, name: "Кардиган Oversize", price: 1600, image: "/images/cardigan-oversize.jpg", category: "Кардиганы" },
//   { id: 9, name: "Свитшот Sweet Shot", price: 800, image: "/images/sweet-shot.jpg", category: "Свитшоты" },
//   { id: 10, name: "Футболка USA", price: 800, image: "/images/usa-tee.jpg", category: "Толстовки" },
//   { id: 11, name: "Купальник Glow", price: 800, image: "/images/glow.jpg", category: "Свитшоты" },
//   { id: 12, name: "Толстовка Zip", price: 1300, image: "/images/hoodie-zip.jpg", category: "Толстовки" },
//   { id: 13, name: "Пальто Beige", price: 2500, image: "/images/coat-beige.jpg", category: "Пальто" },
//   { id: 14, name: "Кардиган Wool", price: 1700, image: "/images/cardigan-wool.jpg", category: "Кардиганы" },
//   { id: 15, name: "Свитшот Retro", price: 900, image: "/images/sweet-retro.jpg", category: "Свитшоты" },
// ];


import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/entities/product";
const ITEMS_PER_PAGE = 9;

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="flex flex-col items-center no-underline">
      <div className="h-[478px] w-[350px] overflow-hidden bg-gray-100 mb-3">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-[20px] text-gray-900 text-center">{product.name}</h3>
      <p className="text-[15px] text-gray-500 text-center">{product.price} $</p>
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
        className="h-[41px] w-[41px] text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-[41px] w-[41px] text-sm border rounded ${
            page === currentPage ? "border-black text-black" : "border-gray-200 text-gray-500"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="h-[41px] w-[41px] text-sm text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Все");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProducts = useMemo<Product[]>(() => {
    if (activeCategory === "Все") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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

  return (
    <div className="max-w-[1110px] mx-auto px-6 py-10">
      <h1 className="text-[55px] font-medium ">Магазин</h1>
      <div className="text-[17px] text-[#000] mb-[214px]">
        Главная <span className="mx-1 text-gray-400">— Магазин</span>
      </div>

      <div className="flex justify-between mb-[92px]">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-[191px] h-[62px] text-[24px] border border-black ${
              activeCategory === category ? "bg-black text-white" : "text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="text-[17px] text-gray-400 mb-[65px]">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>

      {filteredProducts.length === 0 ? (
        <p className="text-[17px] text-gray-400 py-10 text-center">В этой категории пока нет товаров</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

       <p className="text-[17px] text-gray-400 my-[65px]">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
      </p>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}