

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, type Product, type ProductColor, type Size } from "@/entities/product";

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  onSelect: (size: Size) => void;
}

function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`h-[41px] w-[41px] text-sm border rounded ${
            size === selectedSize
              ? "bg-black text-white border-black"
              : "border-gray-300 text-gray-700"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColorId: number;
  onSelect: (id: number) => void;
}

function ColorSelector({ colors, selectedColorId, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex gap-3">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color.id)}
          aria-label={`Выбрать цвет ${color.hex}`}
          className={`h-[28px] w-[28px] rounded-full border-2 ${
            color.id === selectedColorId ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}

interface RelatedProductCardProps {
  product: Product;
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="flex flex-col items-start no-underline">
      <div className="h-[220px] w-[220px] overflow-hidden bg-gray-100 mb-3">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-[16px] text-gray-900">{product.name}</h3>
      <p className="text-[14px] text-gray-500">{product.price} $</p>
    </Link>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [selectedColorId, setSelectedColorId] = useState<number>(product?.colors[0]?.id ?? 1);
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="max-w-[1110px] mx-auto px-6 py-10 text-center">
        <p className="text-[20px] text-gray-500 mb-6">Товар не найден</p>
        <Link to="/catalog" className="underline text-gray-700">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 2);

  function handleQuantityChange(value: number) {
    setQuantity(Math.max(1, value));
  }

  function handleAddToCart() {
    console.log("Добавлено в корзину:", {
      productId: product.id,
      size: selectedSize,
      colorId: selectedColorId,
      quantity,
    });
  }

  return (
    <div className="max-w-[1110px] mx-auto px-6 py-10">
      <h1 className="text-[55px] font-medium mb-[26px]">{product.name}</h1>
      <div className="text-[24px] text-gray-500 mb-[102px]">
        <Link to="/catalog" className="no-underline text-gray-500">
          Главная
        </Link>
        <span className="mx-1 text-gray-400">—</span> {product.category}{" "}
        <span className="mx-1 text-gray-400">—</span> {product.name}
      </div>

      <div className="flex gap-16 mb-20">
        <div className="h-[729px] w-[536px] overflow-hidden bg-gray-100 shrink-0">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-8 pt-2 w-[347px] h-[495px] my-[117px]">
          <div className="flex items-baseline gap-3 mb-[59px]">
            <span className="text-[40px] text-[#9C9C9C] font-medium">${product.price}</span>
            {product.oldPrice && (
              <span className="text-[18px] text-[#9C9C9C] line-through">${product.oldPrice}</span>
            )}
          </div>

          <div>
            <p className="text-[20px] text-[#000000] mb-[34px]">Выберите размер</p>
            <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelect={setSelectedSize} />
          </div>

          <div>
            <p className="text-[20px] text-[#000000] mb-[34px]">Выберите цвет</p>
            <ColorSelector
              colors={product.colors}
              selectedColorId={selectedColorId}
              onSelect={setSelectedColorId}
            />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="h-[41px] w-[60px] border border-gray-300 rounded text-center"
            />
            <button
              onClick={handleAddToCart}
              className="h-[41px] px-8 rounded text-white text-[15px]"
              style={{ backgroundColor: "#6f9a97" }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-[44px] font-medium mb-[67px]">Связанные товары</h2>
          <div className="flex gap-8">
            {relatedProducts.map((related) => (
              <RelatedProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}