const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10; // 10% de descuento
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";

const categoriasProductos = ["Equipajes", "Accesorios", "Mochilas", "Carry-on"];
let productosEnCarrito = []; // Array vacío que se va llenando
const preciosProductos = [89990, 65990, 42990, 58990, 75990];

function agregarProductoAlCarrito(nombreProducto, precio) {
    productosEnCarrito.push({
        nombre: nombreProducto,
        precio: precio,
    });

    cantidadProductosCarrito = cantidadProductosCarrito + 1;
    totalCarrito = totalCarrito + precio;

    console.log(`✅ Producto agregado: ${nombreProducto}`);
    console.log(`💰 Precio: $${precio}`);
    console.log(`🛒 Total en carrito: ${cantidadProductosCarrito} productos`);

    return `¡${nombreProducto} agregado al carrito!`;
}

function calcularDescuento(precio) {
    const descuento = precio * (DESCUENTO_EFECTIVO / 100);
    const precioFinal = precio - descuento;

    console.log(`💸 Precio original: $${precio}`);
    console.log(`🎯 Descuento (${DESCUENTO_EFECTIVO}%): $${descuento}`);
    console.log(`💵 Precio final: $${precioFinal}`);

    return precioFinal;
}
function mostrarResumenCarrito() {
    console.log("🛒 === RESUMEN DEL CARRITO ===");
    console.log(`Tienda: ${NOMBRE_TIENDA}`);
    console.log(`Cantidad de productos: ${cantidadProductosCarrito}`);
    console.log(`Total: $${totalCarrito}`);

    if (productosEnCarrito.length > 0) {
        console.log("📦 Productos en el carrito:");
        productosEnCarrito.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
        });
    } else {
        console.log("El carrito está vacío");
    }
}
function mostrarCategorias() {
    console.log("📋 === CATEGORÍAS DISPONIBLES ===");

    for (let i = 0; i < categoriasProductos.length; i++) {
        console.log(`${i + 1}. ${categoriasProductos[i]}`);
    }
}

function aplicarDescuentosAutomaticos() {
    console.log("💰 === APLICANDO DESCUENTOS AUTOMÁTICOS ===");

    let i = 0;

    while (i < preciosProductos.length) {
        const precio = preciosProductos[i];

        if (precio > 70000) {
            const precioConDescuento = calcularDescuento(precio);
            console.log(`🎯 Producto caro encontrado: $${precio} → $${precioConDescuento}`);
        } else {
            console.log(`✅ Precio normal: $${precio} (sin descuento)`);
        }

        i = i + 1;
    }
}

function clasificarCliente(cantidadCompras) {
    let tipoCliente = "";

    if (cantidadCompras >= 10) {
        tipoCliente = "Cliente VIP 🌟";
    } else if (cantidadCompras >= 5) {
        tipoCliente = "Cliente Frecuente 🎯";
    } else if (cantidadCompras >= 1) {
        tipoCliente = "Cliente Regular 😊";
    } else {
        tipoCliente = "Cliente Nuevo 👋";
    }

    console.log(`👤 Clasificación: ${tipoCliente}`);
    return tipoCliente;
}

function iniciarProcesoCompra() {
    nombreUsuario = prompt("👋 ¡Bienvenido a CALIGO! ¿Cuál es tu nombre?");

    if (nombreUsuario === null || nombreUsuario === "") {
        nombreUsuario = "Cliente";
    }

    console.log(`🎒 Hola ${nombreUsuario}, bienvenido a ${NOMBRE_TIENDA}`);

    alert(`¡Hola ${nombreUsuario}! Bienvenido a ${NOMBRE_TIENDA}\n✈️ Tu próxima aventura comienza aquí`);

    const quiereVerProductos = confirm("¿Te gustaría ver nuestros productos destacados?");

    if (quiereVerProductos) {
        mostrarProductosDestacados();

        const productoElegido = prompt("¿Qué producto te interesa?\n1. Valija Amayra ($89,990)\n2. Carry-on Tourister ($65,990)\n3. Mochila Discovery ($42,990)\n\nEscribe el número:");

        procesarEleccionProducto(productoElegido);
    } else {
        console.log("👋 ¡Esperamos verte pronto en CALIGO!");
        alert("¡Gracias por visitarnos! Vuelve cuando quieras 😊");
    }
}
