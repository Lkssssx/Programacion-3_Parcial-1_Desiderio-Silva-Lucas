import type { CartItem, Product } from "../../../types/product";
import { getCartItems, saveProducts, getProducts, saveCart } from "../../../utils/localStorage";

const productsCart = document.querySelector("#productsCart") as HTMLElement;
const totalSection = document.querySelector("#total") as HTMLElement;
const cartItems: CartItem[] = JSON.parse(getCartItems() ?? "[]");

// Nos ayudan a consultar y actualizar utilizando principios de SSOT (single source of truth)
const getProductFromLS = (id: number): Product | null => {
    const productosGuardados: Product[] = JSON.parse(getProducts() ?? "[]");
    return productosGuardados.find(p => p.id === id) ?? null;
};

const updateProductStockInLS = (id: number, newStock: number): void => {
    const productosGuardados: Product[] = JSON.parse(getProducts() ?? "[]");
    const prodIndex = productosGuardados.findIndex(p => p.id === id);
    if (prodIndex !== -1) {
        productosGuardados[prodIndex].stock = newStock;
        saveProducts(productosGuardados);
    }
};

export const addCartItem = (producto: Product, cantidad: number = 1): boolean => {
    // Consultamos el stock real directamente desde localStorage
    const productoLS = getProductFromLS(producto.id);
    if (!productoLS || productoLS.stock < cantidad) return false;

    // Buscamos si ya está en el carrito
    const cartItem = cartItems.find((item) => item.productId === producto.id);

    if (cartItem) {
        cartItem.cantidad += cantidad;
    } else {
        cartItems.push({ productId: producto.id, cantidad: cantidad });
    }

    // Actualizamos el stock en products
    updateProductStockInLS(producto.id, productoLS.stock - cantidad);
    
    // Sincronizamos visualmente el stock del producto
    producto.stock -= cantidad; 

    // Guardamos el carrito
    saveCart(cartItems);
    return true;
};

const removeCartItemById = (id: number): void => {
    const index = cartItems.findIndex((item) => item.productId === id);
    if (index === -1) return; // findIndex devuelve -1 si no lo encuentra, por lo tanto cancelamos todo lo siguiente

    const item = cartItems[index];
    const productoLS = getProductFromLS(id);

    // Devolvemos 1 unidad de stock a la base de datos
    if (productoLS) {
        updateProductStockInLS(id, productoLS.stock + 1);
    }

    // Restamos o eliminamos el ítem del carrito
    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        cartItems.splice(index, 1); // Lo borramos del array
    }

    saveCart(cartItems);
};

// Eventos al eliminar un producto
const asignarEventosEliminar = () => {
    const eliminarProductoContainer = document.querySelectorAll(".eliminar-producto") as NodeListOf<HTMLButtonElement>;
    eliminarProductoContainer.forEach(button => {
        button.addEventListener("click", () => {
            // Encontramos el id del producto
            const productId: number = Number(button.parentElement?.id.split("_")[1]);
            // Lo sacamos del carrito o le bajamos la cantidad
            removeCartItemById(productId); 
            // Actualizamos los datos mostrados en la página
            cargarCarrito();
            cargarTotal();
        });
    });
};

// Función para cargar el carrito dinamicamente
const cargarCarrito = (): void => {
    if (!productsCart) return;

    if (cartItems.length === 0) {
        productsCart.innerHTML = `<p class="no-products"><strong>No hay elementos en el carrito.</strong></p>`;
        return;
    }

    // Reseteamos el carrito
    productsCart.innerHTML = "";

    cartItems.forEach((cartItem) => {
        // Buscamos los detalles visuales del producto en tiempo real
        const producto = getProductFromLS(cartItem.productId);
        if (!producto) return; // Si el producto fue borrado de la tienda, lo ignoramos

        const article = document.createElement(`article`) as HTMLElement;
        article.id = `product_${producto.id}`;
        article.innerHTML = `
        <img src="${producto.imagen}">
        <p class="nombre"><strong>${producto.nombre}</strong></p>
        <p class="categoria"><strong>Categoría:</strong> ${producto.categorias.map(cat => cat.nombre).join(", ")}</p>
        <p class="cantidad"><strong>Cantidad:</strong> ${cartItem.cantidad}</p>
        
        <p class="precio"><strong>Precio:</strong> $${producto.precio}</p>
        <button class="eliminar-producto">Eliminar Producto</button>
        <hr></hr>
        `;
        productsCart.appendChild(article);
    });

    // Damos útilidad a los botónes de eliminar dinamicamente
    asignarEventosEliminar();
};

// Función para cargar el total sumando los precios de los elementos en el carrito dependiendo de sus cantidades
const cargarTotal = (): void => {
    if (!totalSection) return;
    if (!cartItems || cartItems.length === 0) {
        totalSection.innerHTML = `<p class="precio"><strong>Total:</strong> $0</p>`;
        return;
    }

    const total: number = cartItems.reduce((acc, item) => {
        // Consultamos el precio en localStorage
        const producto = getProductFromLS(item.productId);

        // Si el producto existe usamos su precio y sino sumamos 0
        const precio = producto ? producto.precio : 0; 
        
        return acc + (precio * item.cantidad);
    }, 0);

    totalSection.innerHTML = `<p class="precio"><strong>Total:</strong> $${total}</p>`;
};

cargarCarrito();
cargarTotal();