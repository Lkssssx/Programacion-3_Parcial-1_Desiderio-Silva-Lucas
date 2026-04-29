import { getProducts, saveProducts } from "../../../utils/localStorage";
import { getCategoriesFromData, getProductsFromData } from "../../../data/data";
import { type ICategory } from "../../../types/category";
import { getProductById, getProductsByName, type Product, getProductsByCategoryId } from "../../../types/product";
import { addCartItem } from "../cart/cart";

const listaCategorias = document.getElementById("lista-categorias") as HTMLElement;
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLElement;
const searchInput = document.querySelector("#buscarProducto") as HTMLInputElement;
const categorias: ICategory[] = getCategoriesFromData();
const productosGuardados = getProducts();

if (!productosGuardados) {  // Nos aseguramos de que hayan productos guardados, y si no hay hacemos una primera inicializacion con los datos en data.ts
  saveProducts(getProductsFromData());
}

const todosLosProductos: Product[] = JSON.parse(getProducts()!); // "!" asegura a ts que no es null y que no de error


const cargarCategorias = () => {
    categorias.forEach((categoria) => {
        const div = document.createElement(`div`) as HTMLDivElement;
        div.innerHTML = `<button class="button-categoria" id="categoria_${categoria.id}">${categoria.nombre}</button>`;
        listaCategorias.appendChild(div);
    });
};


const cargarProductos = (productos: Product[]) => {
    // Borramos los productos cargados por si se vuelven a cargar al buscar por categoría o nombre
    contenedorProductos.innerHTML = "";
    if (productos.length === 0) {
        contenedorProductos.innerHTML = `<p id="no-productos"><strong>No se encontraron productos.</strong></p>`
        return
    };

    productos.forEach((prod) => {
        if (prod.eliminado) {
            return
        };

        const article = document.createElement(`article`) as HTMLElement;
        article.id = `cartProduct_${prod.id}`;

        article.innerHTML = `
        <img src="${prod.imagen}">
        <p class="nombre"><strong>${prod.nombre}</strong></p>
        <p class="categoria"><strong>Categoría:</strong> ${prod.categorias.map(cat => cat.nombre).join(", ")}</p>
        <p class="descripcion"><strong>Descripción:</strong> ${prod.descripcion}</p>
        <p class="precio"><strong>Precio:</strong> $${prod.precio}</p>
        <button class="agregar-producto">Agregar Producto</button>
        <span disable class="agregar-producto-rs" id="ag-pr_${prod.id}"></span>

        `;
        contenedorProductos.appendChild(article);
    });

    // Les damos utilidad a los botones de agregar productos renderizados dinamicamente
    const agregarProductos = document.querySelectorAll(".agregar-producto") as NodeListOf<HTMLButtonElement>;

    agregarProductos.forEach(boton => {
        boton.addEventListener('click', () => {
            const productId: number = Number(boton.parentElement?.id.split("_")[1]);
            const producto: Product | null = getProductById(productId, todosLosProductos);
            if (!producto) return;

            const isAdded = addCartItem(producto, 1);
            const spanResult = document.querySelector(`#ag-pr_${productId}`) as HTMLSpanElement;

            // Cancelamos cualquier timeout anterior guardado en el span
            clearTimeout(Number(spanResult.dataset.timeout));

            // Reiniciamos el span
            spanResult.classList.remove("visible");

            setTimeout(() => {
                spanResult.classList.remove("correctly-added", "not-added");
                spanResult.classList.add(isAdded ? "correctly-added" : "not-added");
                spanResult.innerText = isAdded
                    ? "Producto agregado correctamente!"
                    : "No se pudo agregar el producto, no hay stock disponible!";
                spanResult.classList.add("visible");

                // Guardamos el timeout en el dataset del span (donde se guarda el id del timeout)
                spanResult.dataset.timeout = String(setTimeout(() => {
                    spanResult.classList.remove("visible");
                    setTimeout(() => {
                        spanResult.innerText = "";
                        spanResult.classList.remove("correctly-added", "not-added");

                    }, 100);
                }, 3000));      // Ocultar el span y guardar el nuevo timeout en el propio span
            }, 100);            // Esperar la animación de salida y mostrar el nuevo estado
        });
    });
};

// Cargamos las categorías y los productos
cargarCategorias();
cargarProductos(todosLosProductos);


// Hacemos funcionar los botones de ver los productos por categorías
const buscarCategorias = document.querySelectorAll(".button-categoria") as NodeListOf<HTMLButtonElement>;
buscarCategorias.forEach(boton => {
    boton.addEventListener('click', () => {
        searchInput.value = "";
        const isActive = boton.classList.contains("clicked");

        // Sacamos clicked de todos siempre
        buscarCategorias.forEach(boton2 => boton2.classList.remove("clicked"));

        if (isActive) {
            // Si ya estaba activo volvemos a cargar todos los productos
            cargarProductos(todosLosProductos);
            return;
        }

        boton.classList.add("clicked");
        const categoryId: number = Number(boton.id.split("_")[1]);
        cargarProductos(getProductsByCategoryId(categoryId, todosLosProductos));
    });
});

// Hacemos funcionar la busqueda de productos
searchInput.addEventListener('input', () => {
    // Desmarcamos las categorías si había una clickeada
    buscarCategorias.forEach(boton => boton.classList.remove("clicked"));
     
    const products: Product[] = getProductsByName(searchInput.value, todosLosProductos);
    cargarProductos(products);
});
