import { PRODUCTS } from "../data/data";
import type { ICategory } from "./category";

export interface Product {
    id: number,
    eliminado: boolean,
    createdAt: string,
    nombre: string,
    precio: number,
    descripcion: string
    stock: number,
    imagen: string,
    disponible: boolean,
    categorias: ICategory[];
};

export interface CartItem {
    productId: number;  // Usamos una referencia a la id para no duplicar datos poniendo todo el producto
    cantidad: number;
}

export const getProductById = (id: number, products: Product[] = PRODUCTS): Product | null => {
    return products.find(product => product.id === id) ?? null;
};

export const getProductsByName = (name: string, products: Product[] = PRODUCTS): Product[] => {
    return products.filter(product => product.nombre.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
};

export const getProductsByCategoryId = (id: number, products: Product[] = PRODUCTS): Product[] => {
    return products.filter(product => product.categorias.some(categoria => categoria.id === id));
};