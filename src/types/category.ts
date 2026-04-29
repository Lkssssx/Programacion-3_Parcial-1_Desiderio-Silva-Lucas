import { CATEGORIAS } from "../data/data"

export interface ICategory {
    id: number,
    eliminado: boolean,
    createdAt: string,
    nombre: string,
    descripcion: string
};

export const getCategoryById = (id: number): ICategory | null => {
    const categoria: ICategory | null = CATEGORIAS.find(category => category.id === id) ?? null;
    return categoria;
}