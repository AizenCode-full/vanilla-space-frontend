export type Category = "Все" | "Пальто" | "Свитшоты" | "Кардиганы" | "Толстовки";

export type Size = "S" | "M" | "L" | "XL" | "2XL";

export interface ProductColor {
  id: number;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: Category;
  sizes: Size[];
  colors: ProductColor[];
}

const DEFAULT_SIZES: Size[] = ["S", "M", "L", "XL", "2XL"];

const DEFAULT_COLORS: ProductColor[] = [
  { id: 1, hex: "#5b4a45" },
  { id: 2, hex: "#c7c7c7" },
  { id: 3, hex: "#e08a8a" },
  { id: 4, hex: "#e8b98a" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Футболка USA", price: 800, image: "/images/usa-tee.jpg", category: "Толстовки", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 2, name: "Купальник Glow", price: 800, image: "/images/glow.jpg", category: "Свитшоты", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 3, name: "Свитшот Sweet Shot", price: 311, oldPrice: 450, image: "/images/sweet-shot.jpg", category: "Свитшоты", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 4, name: "Пальто Classic", price: 2400, image: "/images/coat-classic.jpg", category: "Пальто", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 5, name: "Кардиган Soft", price: 1500, image: "/images/cardigan-soft.jpg", category: "Кардиганы", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 6, name: "Толстовка Basic", price: 1200, image: "/images/hoodie-basic.jpg", category: "Толстовки", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 7, name: "Пальто Winter", price: 2600, image: "/images/coat-winter.jpg", category: "Пальто", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 8, name: "Кардиган Oversize", price: 1600, image: "/images/cardigan-oversize.jpg", category: "Кардиганы", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 9, name: "Свитшот Sweet Shot", price: 800, image: "/images/sweet-shot.jpg", category: "Свитшоты", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 10, name: "Футболка USA", price: 800, image: "/images/usa-tee.jpg", category: "Толстовки", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 11, name: "Купальник Glow", price: 800, image: "/images/glow.jpg", category: "Свитшоты", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 12, name: "Толстовка Zip", price: 1300, image: "/images/hoodie-zip.jpg", category: "Толстовки", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 13, name: "Пальто Beige", price: 2500, image: "/images/coat-beige.jpg", category: "Пальто", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 14, name: "Кардиган Wool", price: 1700, image: "/images/cardigan-wool.jpg", category: "Кардиганы", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
  { id: 15, name: "Свитшот Retro", price: 900, image: "/images/sweet-retro.jpg", category: "Свитшоты", sizes: DEFAULT_SIZES, colors: DEFAULT_COLORS },
];

export const CATEGORIES: Category[] = ["Все", "Пальто", "Свитшоты", "Кардиганы", "Толстовки"];