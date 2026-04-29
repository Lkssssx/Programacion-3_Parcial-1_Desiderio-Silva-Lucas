# 🍔 Food Store - E-commerce

## ✍️ Descripción
Food Store es un proyecto de e-commerce desarrollado con **HTML, CSS y TypeScript**. Simula una tienda de comida interactiva donde los usuarios pueden explorar productos, filtrar por categorías o por nombre, y gestionar un carrito de compras funcional. 

El estado de la aplicación (como el stock dinámico de los productos y los elementos agregados al carrito) se maneja persistiendo los datos de forma local en el navegador mediante `localStorage`.

**Características principales:**
* Catálogo dinámico de productos generados a partir de datos estructurados.
* Búsqueda y filtrado interactivo.
* Carrito de compras con cálculo de totales y control de stock en tiempo real.

## 🛠️ Tecnologías Utilizadas
* HTML5 & CSS3
* TypeScript
* Vite (Entorno de desarrollo)
* LocalStorage (Persistencia de datos)

## 🚀 Instrucciones para ejecutarlo

Para correr este proyecto en tu entorno local, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Puedes usar `npm` o `pnpm`.

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Lkssssx/Parcial-1_Programacion-3_Desiderio-Silva-Lucas.git](https://github.com/Lkssssx/Parcial-1_Programacion-3_Desiderio-Silva-Lucas.git)

    Instalar las dependencias:
    Abre la terminal en la carpeta raíz del proyecto y ejecuta:
    Bash

    npm install
    # o si usas pnpm:
    pnpm install

    Iniciar el servidor de desarrollo:
    Bash

    npm run dev
    # o con pnpm:
    pnpm dev

    Abrir la aplicación:
    La terminal te mostrará una URL (generalmente http://localhost:5173). Ábrela en tu navegador para ver y probar la tienda.

📁 Estructura del Proyecto

    assets/: Imágenes de los productos y recursos gráficos.

    css/: Hojas de estilo de la aplicación divididas por vistas.

    data/: Contiene la base de datos inicial (data.ts) de productos y categorías.

    pages/: Vistas de la aplicación (home y cart) con sus respectivos archivos HTML y lógica en TypeScript.

    types/: Interfaces de TypeScript para mantener un tipado estricto y seguro (product.ts, category.ts).

    utils/: Lógica reutilizable y modular, incluyendo la gestión de localStorage.

👤 Autor

    Lucas Desiderio Silva
