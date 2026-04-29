import type { CartItem, Product } from "../types/product";

export const saveCart = (cartItems: CartItem[]): void => {
  localStorage.setItem("userCart", JSON.stringify(cartItems));
};

export const getCartItems = () => {
  return localStorage.getItem("userCart");
};

export const removeCartItem = () => {
  localStorage.removeItem("userCart");
};

export const getProducts = (): string | null => {
  return localStorage.getItem("products");
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem("products", JSON.stringify(products));
};