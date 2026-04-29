# 🍔 Food Store - E-commerce

## ✍️ Descripción

Food Store es un proyecto de e-commerce desarrollado con **HTML, CSS y TypeScript**. Simula una tienda de comida interactiva donde los usuarios pueden explorar productos, filtrar por categorías o por nombre, y gestionar un carrito de compras funcional.

El estado de la aplicación (como el stock dinámico de los productos y los elementos agregados al carrito) se maneja persistiendo los datos de forma local en el navegador mediante `localStorage`.

**Características principales:**

- Catálogo dinámico de productos generados a partir de datos estructurados.
- Búsqueda y filtrado interactivo.
- Carrito de compras con cálculo de totales y control de stock en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 & CSS3 | Estructura y estilos de la interfaz |
| TypeScript | Lógica de la aplicación con tipado estricto |
| Vite | Entorno de desarrollo y bundler |
| LocalStorage | Persistencia de datos en el navegador |

---

## 🚀 Instrucciones para ejecutarlo

Para correr este proyecto en tu entorno local, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Podés usar `npm` o `pnpm`.

**1. Clonar el repositorio:**
```bash
git clone https://github.com/Lkssssx/Parcial-1_Programacion-3_Desiderio-Silva-Lucas.git
```

**2. Instalar las dependencias:**

Abrí la terminal en la carpeta raíz del proyecto y ejecutá:
```bash
npm install
# o si usás pnpm:
pnpm install
```

**3. Iniciar el servidor de desarrollo:**
```bash
npm run dev
# o con pnpm:
pnpm dev
```

**4. Abrir la aplicación:**

La terminal mostrará una URL (generalmente `http://localhost:5173`). Abrila en tu navegador para ver y probar la tienda.

---

## 📁 Estructura del Proyecto

```
📂 src/
├── 📂 assets/
│   └── 📂 productos/        → Imágenes de los productos
├── 📂 css/
│   ├── home.css             → Estilos de la vista del catálogo
│   └── cart.css             → Estilos de la vista del carrito
├── 📂 pages/
│   └── 📂 store/
│       ├── 📂 home/
│       │   ├── home.html    → Catálogo de productos
│       │   └── home.ts      → Lógica: render, búsqueda, filtros
│       └── 📂 cart/
│           ├── cart.html    → Vista del carrito
│           └── cart.ts      → Lógica: render, cantidades, total
├── 📂 types/
│   ├── product.ts           → Interfaces Product y CartItem
│   └── categoria.ts         → Interface ICategoria
└── 📂 data/
    └── data.ts              → PRODUCTS y getCategories()
```

---

## 👤 Autor

**Lucas Desiderio Silva**  
Parcial N°1 — Programación 3
Universidad Tecnologica Nacional
