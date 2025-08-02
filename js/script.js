const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";
let productosData = [];

const categoriasProductos = ["Equipajes", "Accesorios", "Mochilas", "Carry-on"];
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function cargarProductos() {
    try {
        const response = await fetch(window.location.pathname.includes("/pages/") ? "../products.json" : "./products.json");
        const data = await response.json();
        productosData = [...data.equipajes, ...data.accesorios];
        renderizarProductos();
        actualizarContadorCarrito();
    } catch (error) {
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
}

function renderizarProductos() {
    const contenedorEquipajes = document.querySelector(".productos-seccion .card1");
    const contenedorAccesorios = document.querySelector(".productos-seccion .card1");

    if (contenedorEquipajes) {
        const equipajes = productosData.filter((p) => p.categoria === "equipajes" || p.categoria === "carry-on" || p.categoria === "mochilas");
        contenedorEquipajes.innerHTML = "";

        equipajes.forEach((producto) => {
            const productElement = crearElementoProducto(producto);
            contenedorEquipajes.appendChild(productElement);
        });
    }

    if (contenedorAccesorios && window.location.pathname.includes("accesorios")) {
        const accesorios = productosData.filter((p) => !["equipajes", "carry-on", "mochilas"].includes(p.categoria));
        contenedorAccesorios.innerHTML = "";

        accesorios.forEach((producto) => {
            const productElement = crearElementoProducto(producto);
            contenedorAccesorios.appendChild(productElement);
        });
    }
}

function crearElementoProducto(producto) {
    const article = document.createElement("article");
    article.className = "todos-equipajes";

    article.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
            <p>${producto.nombre}</p>
            <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
            <button type="button" onclick="agregarProductoAlCarrito('${producto.nombre}', ${producto.precio}, ${producto.id})">
                Añadir al carrito
            </button>
        </div>
    `;

    return article;
}

function agregarProductoAlCarrito(nombreProducto, precio, id) {
    const productoExistente = productosEnCarrito.find((p) => p.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        productosEnCarrito.push({
            id: id,
            nombre: nombreProducto,
            precio: precio,
            cantidad: 1,
        });
    }

    cantidadProductosCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    totalCarrito = productosEnCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarContadorCarrito();

    Swal.fire({
        title: "¡Producto agregado!",
        text: `${nombreProducto} se agregó al carrito`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
    });

    return `¡${nombreProducto} agregado al carrito!`;
}

function calcularDescuento(precio) {
    const descuento = precio * (DESCUENTO_EFECTIVO / 100);
    const precioFinal = precio - descuento;
    return precioFinal;
}

function mostrarResumenCarrito() {
    if (productosEnCarrito.length === 0) {
        Swal.fire("Carrito vacío", "No hay productos en el carrito", "info");
        return;
    }

    let resumen = `<div class="carrito-resumen">`;
    resumen += `<h3>Resumen del Carrito</h3>`;

    productosEnCarrito.forEach((producto, index) => {
        resumen += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <div>
                    <span>${producto.nombre}</span><br>
                    <small>Cantidad: ${producto.cantidad} | Precio: $${producto.precio.toLocaleString()}</small>
                </div>
                <div style="display: flex; gap: 5px; align-items: center;">
                    <span style="font-weight: bold;">$${(producto.precio * producto.cantidad).toLocaleString()}</span>
                    <button onclick="eliminarProducto(${producto.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px;">
                        🗑️
                    </button>
                </div>
            </div>
        `;
    });

    resumen += `<hr><strong>Total: $${totalCarrito.toLocaleString()}</strong>`;
    resumen += `</div>`;

    Swal.fire({
        title: "Tu Carrito",
        html: resumen,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Finalizar Compra",
        cancelButtonText: "Seguir Comprando",
        denyButtonText: "🗑️ Vaciar Carrito",
        denyButtonColor: "#dc3545",
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarFormularioCompra();
        } else if (result.isDenied) {
            vaciarCarrito();
        }
    });
}

function eliminarProducto(id) {
    productosEnCarrito = productosEnCarrito.filter((producto) => producto.id !== id);

    cantidadProductosCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    totalCarrito = productosEnCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    actualizarContadorCarrito();

    Swal.fire({
        title: "Producto eliminado",
        text: "El producto se eliminó del carrito",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
    }).then(() => {
        mostrarResumenCarrito();
    });
}

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminarán todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, vaciar carrito",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito = [];
            cantidadProductosCarrito = 0;
            totalCarrito = 0;
            localStorage.removeItem("carrito");
            actualizarContadorCarrito();

            Swal.fire({
                title: "Carrito vaciado",
                text: "Todos los productos fueron eliminados",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            mostrarResumenCarrito();
        }
    });
}

function mostrarFormularioCompra() {
    Swal.fire({
        title: "🛒 Finalizar Compra",
        html: `
            <style>
                .checkout-form { max-height: 400px; overflow-y: auto; padding: 10px; }
                .form-group { margin-bottom: 15px; text-align: left; }
                .form-group label { display: block; font-weight: bold; margin-bottom: 5px; color: #333; }
                .form-input { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; }
                .form-input:focus { border-color: #28a745; outline: none; }
                .resumen-compra { background: #87c3bd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .payment-options { display: grid; gap: 10px; margin-top: 10px; }
                .payment-option { display: flex; align-items: center; padding: 12px; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; transition: all 0.3s; }
                .payment-option:hover { border-color: #28a745; background: #f8f9fa; }
                .payment-option input[type="radio"] { margin-right: 10px; }
                .payment-icon { font-size: 20px; margin-right: 8px; }
                .total-section { background: #87c3bd; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center; font-size: 18px; font-weight: bold; }
            </style>
            <div class="checkout-form">
                <div class="resumen-compra">
                    <h3 style="margin: 0 0 10px 0;">📋 Resumen de tu compra:</h3>
                    <p style="margin: 5px 0;"><strong>Productos:</strong> ${productosEnCarrito.length}</p>
                    <p style="margin: 5px 0;"><strong>Total:</strong> $${totalCarrito.toLocaleString()}</p>
                </div>
                
                <form id="checkout-form">
                    <div class="form-group">
                        <label for="nombre">📝 Nombre Completo *</label>
                        <input type="text" id="nombre" class="form-input" placeholder="Ej: Juan Pérez" value="Juan Pérez" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">📧 Email *</label>
                        <input type="email" id="email" class="form-input" placeholder="Ej: juan@email.com" value="juan@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefono">📱 Teléfono *</label>
                        <input type="tel" id="telefono" class="form-input" placeholder="Ej: +54 9 11 1234-5678" value="+54 9 11 1234-5678" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="direccion">🏠 Dirección *</label>
                        <input type="text" id="direccion" class="form-input" placeholder="Ej: Av. Ejemplo 123" value="Av. Ejemplo 123" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="ciudad">🏙️ Ciudad *</label>
                        <input type="text" id="ciudad" class="form-input" placeholder="Ej: Buenos Aires" value="Buenos Aires" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="codigoPostal">📮 Código Postal *</label>
                        <input type="text" id="codigoPostal" class="form-input" placeholder="Ej: 1234" value="1234" required>
                    </div>
                    
                    <div class="form-group">
                        <label>💳 Método de Pago *</label>
                        <div class="payment-options">
                            <label class="payment-option">
                                <input type="radio" name="metodoPago" value="efectivo" checked>
                                <span class="payment-icon">💵</span>
                                <strong>Efectivo (10% descuento)</strong>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="metodoPago" value="tarjeta">
                                <span class="payment-icon">💳</span>
                                <strong>Tarjeta de Crédito/Débito</strong>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="metodoPago" value="transferencia">
                                <span class="payment-icon">🏦</span>
                                <strong>Transferencia Bancaria</strong>
                            </label>
                        </div>
                    </div>
                    
                    <div class="total-section">
                        💰 Total a Pagar: $${totalCarrito.toLocaleString()}
                    </div>
                </form>
            </div>
        `,
        width: "600px",
        showCancelButton: true,
        confirmButtonText: "✅ Confirmar Compra",
        cancelButtonText: "❌ Cancelar",
        preConfirm: () => {
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const telefono = document.getElementById("telefono").value;
            const direccion = document.getElementById("direccion").value;
            const ciudad = document.getElementById("ciudad").value;
            const codigoPostal = document.getElementById("codigoPostal").value;
            const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

            if (!nombre || !email || !telefono || !direccion || !ciudad || !codigoPostal) {
                Swal.showValidationMessage("Por favor completa todos los campos obligatorios");
                return false;
            }

            return { nombre, email, telefono, direccion, ciudad, codigoPostal, metodoPago };
        },
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompra(result.value);
        }
    });
}

function procesarCompra(datosCompra) {
    let totalFinal = totalCarrito;

    if (datosCompra.metodoPago === "efectivo") {
        totalFinal = totalCarrito - (totalCarrito * DESCUENTO_EFECTIVO) / 100;
    }

    const compra = {
        fecha: new Date().toLocaleDateString(),
        productos: [...productosEnCarrito],
        cliente: datosCompra,
        total: totalFinal,
        metodoPago: datosCompra.metodoPago,
    };

    let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push(compra);
    localStorage.setItem("historialCompras", JSON.stringify(historial));

    productosEnCarrito = [];
    cantidadProductosCarrito = 0;
    totalCarrito = 0;
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();

    Swal.fire({
        title: "🎉 ¡Compra Exitosa!",
        html: `
            <div style="text-align: center; padding: 20px;">
                <h3>✅ Pedido Confirmado</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Cliente:</strong> ${datosCompra.nombre}</p>
                    <p><strong>Email:</strong> ${datosCompra.email}</p>
                    <p><strong>Teléfono:</strong> ${datosCompra.telefono}</p>
                    <p><strong>Dirección:</strong> ${datosCompra.direccion}</p>
                    <p><strong>Ciudad:</strong> ${datosCompra.ciudad} (${datosCompra.codigoPostal})</p>
                </div>
                <div style="background: #87c3bd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>💰 Total pagado:</strong> $${totalFinal.toLocaleString()}</p>
                    <p><strong>💳 Método de pago:</strong> ${datosCompra.metodoPago}</p>
                    ${datosCompra.metodoPago === "efectivo" ? '<p style="color: #28a745; font-weight: bold;">✓ Descuento del 10% aplicado</p>' : ""}
                </div>
                <p style="color: #6c757d; font-size: 14px;">
                    📧 Recibirás un email de confirmación en breve<br>
                    📦 Tu pedido será procesado en las próximas 24hs
                </p>
            </div>
        `,
        icon: "success",
        confirmButtonText: "🏠 Volver al Inicio",
    });
}

function mostrarCategorias() {
    const sidebar = document.querySelector(".menu-lateral ul");
    if (sidebar) {
        sidebar.innerHTML = "";

        const todasCategoria = document.createElement("li");
        todasCategoria.innerHTML = '<a href="#todos">Todos los productos</a>';
        sidebar.appendChild(todasCategoria);

        categoriasProductos.forEach((categoria) => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#${categoria.toLowerCase()}">${categoria}</a>`;
            sidebar.appendChild(li);
        });
    }
}

function aplicarDescuentosAutomaticos() {
    productosData.forEach((producto) => {
        if (producto.precio > 70000) {
            const precioConDescuento = calcularDescuento(producto.precio);
        }
    });
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

    return tipoCliente;
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = cantidadProductosCarrito;
    }

    const contadorPrincipal = document.querySelector(".btn-carrito .contador");
    if (contadorPrincipal) {
        contadorPrincipal.textContent = cantidadProductosCarrito;
    }

    const botones = document.querySelectorAll("button, .btn, a");
    botones.forEach((boton) => {
        if (boton.textContent && boton.textContent.includes("Carrito")) {
            boton.innerHTML = boton.innerHTML.replace(/\(\d+\)/, `(${cantidadProductosCarrito})`);
        }
    });

    document.title = `CALIGO - Carrito (${cantidadProductosCarrito})`;
}

function crearBotonCarrito() {
    const botonCarrito = document.createElement("button");
    botonCarrito.innerHTML = '🛒 Carrito (<span id="contador-carrito">0</span>)';
    botonCarrito.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    botonCarrito.addEventListener("click", mostrarResumenCarrito);
    document.body.appendChild(botonCarrito);
}

function iniciarProcesoCompra() {
    Swal.fire({
        title: "¡Bienvenido a CALIGO!",
        text: "¿Cuál es tu nombre?",
        input: "text",
        inputValue: "Cliente",
        showCancelButton: true,
        confirmButtonText: "Continuar",
    }).then((result) => {
        if (result.isConfirmed) {
            nombreUsuario = result.value || "Cliente";

            Swal.fire({
                title: `¡Hola ${nombreUsuario}!`,
                text: `Bienvenido a ${NOMBRE_TIENDA}. ✈️ Tu próxima aventura comienza aquí`,
                icon: "success",
                confirmButtonText: "Ver productos",
            }).then(() => {
                mostrarProductosDestacados();
            });
        }
    });
}

function mostrarProductosDestacados() {
    const productosDestacados = productosData.slice(0, 3);
    let opciones = "";

    productosDestacados.forEach((producto, index) => {
        opciones += `${index + 1}. ${producto.nombre} ($${producto.precio.toLocaleString()})\n`;
    });

    Swal.fire({
        title: "Productos Destacados",
        text: opciones,
        input: "select",
        inputOptions: {
            "0": productosDestacados[0]?.nombre,
            "1": productosDestacados[1]?.nombre,
            "2": productosDestacados[2]?.nombre,
        },
        showCancelButton: true,
        confirmButtonText: "Agregar al carrito",
    }).then((result) => {
        if (result.isConfirmed) {
            const productoSeleccionado = productosDestacados[parseInt(result.value)];
            if (productoSeleccionado) {
                procesarEleccionProducto(productoSeleccionado);
            }
        }
    });
}

function procesarEleccionProducto(producto) {
    agregarProductoAlCarrito(producto.nombre, producto.precio, producto.id);

    Swal.fire({
        title: "¿Método de pago?",
        text: `¿Vas a pagar en efectivo? (Obtén ${DESCUENTO_EFECTIVO}% de descuento)`,
        showCancelButton: true,
        confirmButtonText: "Efectivo",
        cancelButtonText: "Tarjeta",
    }).then((result) => {
        if (result.isConfirmed) {
            const precioConDescuento = calcularDescuento(producto.precio);
            Swal.fire({
                title: "¡Excelente!",
                text: `Con el descuento pagarías $${precioConDescuento.toLocaleString()} en lugar de $${producto.precio.toLocaleString()}`,
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Perfecto!",
                text: `El total es $${producto.precio.toLocaleString()}. Puedes pagar con tarjeta en 3 cuotas sin interés.`,
                icon: "success",
            });
        }

        setTimeout(() => {
            mostrarResumenCarrito();
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    cantidadProductosCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    totalCarrito = productosEnCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    await cargarProductos();
    mostrarCategorias();
    aplicarDescuentosAutomaticos();
    crearBotonCarrito();

    const botonInteractivo = document.createElement("button");
    botonInteractivo.textContent = "🛒 Compra Interactiva";
    botonInteractivo.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    botonInteractivo.addEventListener("click", iniciarProcesoCompra);
    document.body.appendChild(botonInteractivo);
});
