const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";
let productosData = [];

const categoriasProductos = ["Equipajes", "Accesorios", "Mochilas", "Carry-on"];
let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function cargarProductos() {
    try {
        const response = await fetch('./products.json');
        const data = await response.json();
        productosData = [...data.equipajes, ...data.accesorios];
        renderizarProductos();
        actualizarContadorCarrito();
    } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
    }
}

function renderizarProductos() {
    const contenedorEquipajes = document.querySelector('.productos-seccion .card1');
    const contenedorAccesorios = document.querySelector('.productos-seccion .card1');
    
    if (contenedorEquipajes) {
        const equipajes = productosData.filter(p => p.categoria === 'equipajes' || p.categoria === 'carry-on' || p.categoria === 'mochilas');
        contenedorEquipajes.innerHTML = '';
        
        equipajes.forEach(producto => {
            const productElement = crearElementoProducto(producto);
            contenedorEquipajes.appendChild(productElement);
        });
    }
    
    if (contenedorAccesorios && window.location.pathname.includes('accesorios')) {
        const accesorios = productosData.filter(p => !['equipajes', 'carry-on', 'mochilas'].includes(p.categoria));
        contenedorAccesorios.innerHTML = '';
        
        accesorios.forEach(producto => {
            const productElement = crearElementoProducto(producto);
            contenedorAccesorios.appendChild(productElement);
        });
    }
}

function crearElementoProducto(producto) {
    const article = document.createElement('article');
    article.className = 'todos-equipajes';
    
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
    const productoExistente = productosEnCarrito.find(p => p.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        productosEnCarrito.push({
            id: id,
            nombre: nombreProducto,
            precio: precio,
            cantidad: 1
        });
    }
    
    cantidadProductosCarrito = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    totalCarrito = productosEnCarrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    actualizarContadorCarrito();
    
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${nombreProducto} se agregó al carrito`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
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
        Swal.fire('Carrito vacío', 'No hay productos en el carrito', 'info');
        return;
    }
    
    let resumen = `<div class="carrito-resumen">`;
    resumen += `<h3>Resumen del Carrito</h3>`;
    
    productosEnCarrito.forEach(producto => {
        resumen += `
            <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <span>${producto.nombre} (x${producto.cantidad})</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString()}</span>
            </div>
        `;
    });
    
    resumen += `<hr><strong>Total: $${totalCarrito.toLocaleString()}</strong>`;
    resumen += `</div>`;
    
    Swal.fire({
        title: 'Tu Carrito',
        html: resumen,
        showCancelButton: true,
        confirmButtonText: 'Finalizar Compra',
        cancelButtonText: 'Seguir Comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarFormularioCompra();
        }
    });
}

function mostrarFormularioCompra() {
    Swal.fire({
        title: 'Finalizar Compra',
        html: `
            <form id="checkout-form">
                <input type="text" id="nombre" placeholder="Nombre completo" value="Juan Pérez" required style="width: 100%; margin: 5px 0; padding: 10px;">
                <input type="email" id="email" placeholder="Email" value="juan@email.com" required style="width: 100%; margin: 5px 0; padding: 10px;">
                <input type="tel" id="telefono" placeholder="Teléfono" value="1234567890" required style="width: 100%; margin: 5px 0; padding: 10px;">
                <select id="pago" style="width: 100%; margin: 5px 0; padding: 10px;">
                    <option value="tarjeta">Tarjeta de Crédito</option>
                    <option value="efectivo">Efectivo (10% descuento)</option>
                </select>
            </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Compra',
        preConfirm: () => {
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const metodoPago = document.getElementById('pago').value;
            
            if (!nombre || !email || !telefono) {
                Swal.showValidationMessage('Por favor completa todos los campos');
                return false;
            }
            
            return { nombre, email, telefono, metodoPago };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompra(result.value);
        }
    });
}

function procesarCompra(datosCompra) {
    let totalFinal = totalCarrito;
    
    if (datosCompra.metodoPago === 'efectivo') {
        totalFinal = totalCarrito - (totalCarrito * DESCUENTO_EFECTIVO / 100);
    }
    
    const compra = {
        fecha: new Date().toLocaleDateString(),
        productos: [...productosEnCarrito],
        cliente: datosCompra,
        total: totalFinal,
        metodoPago: datosCompra.metodoPago
    };
    
    let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    historial.push(compra);
    localStorage.setItem('historialCompras', JSON.stringify(historial));
    
    productosEnCarrito = [];
    cantidadProductosCarrito = 0;
    totalCarrito = 0;
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
    
    Swal.fire({
        title: '¡Compra Exitosa!',
        html: `
            <p>Gracias ${datosCompra.nombre}</p>
            <p>Total pagado: $${totalFinal.toLocaleString()}</p>
            <p>Método de pago: ${datosCompra.metodoPago}</p>
            ${datosCompra.metodoPago === 'efectivo' ? '<p style="color: green;">✓ Descuento del 10% aplicado</p>' : ''}
        `,
        icon: 'success'
    });
}

function mostrarCategorias() {
    const sidebar = document.querySelector('.menu-lateral ul');
    if (sidebar) {
        sidebar.innerHTML = '';
        
        const todasCategoria = document.createElement('li');
        todasCategoria.innerHTML = '<a href="#todos">Todos los productos</a>';
        sidebar.appendChild(todasCategoria);
        
        categoriasProductos.forEach(categoria => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#${categoria.toLowerCase()}">${categoria}</a>`;
            sidebar.appendChild(li);
        });
    }
}

function aplicarDescuentosAutomaticos() {
    productosData.forEach(producto => {
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
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = cantidadProductosCarrito;
    }
}

function crearBotonCarrito() {
    const botonCarrito = document.createElement('button');
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
    
    botonCarrito.addEventListener('click', mostrarResumenCarrito);
    document.body.appendChild(botonCarrito);
}

function iniciarProcesoCompra() {
    Swal.fire({
        title: '¡Bienvenido a CALIGO!',
        text: '¿Cuál es tu nombre?',
        input: 'text',
        inputValue: 'Cliente',
        showCancelButton: true,
        confirmButtonText: 'Continuar'
    }).then((result) => {
        if (result.isConfirmed) {
            nombreUsuario = result.value || "Cliente";
            
            Swal.fire({
                title: `¡Hola ${nombreUsuario}!`,
                text: `Bienvenido a ${NOMBRE_TIENDA}. ✈️ Tu próxima aventura comienza aquí`,
                icon: 'success',
                confirmButtonText: 'Ver productos'
            }).then(() => {
                mostrarProductosDestacados();
            });
        }
    });
}

function mostrarProductosDestacados() {
    const productosDestacados = productosData.slice(0, 3);
    let opciones = '';
    
    productosDestacados.forEach((producto, index) => {
        opciones += `${index + 1}. ${producto.nombre} ($${producto.precio.toLocaleString()})\n`;
    });
    
    Swal.fire({
        title: 'Productos Destacados',
        text: opciones,
        input: 'select',
        inputOptions: {
            '0': productosDestacados[0]?.nombre,
            '1': productosDestacados[1]?.nombre,
            '2': productosDestacados[2]?.nombre
        },
        showCancelButton: true,
        confirmButtonText: 'Agregar al carrito'
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
        title: '¿Método de pago?',
        text: `¿Vas a pagar en efectivo? (Obtén ${DESCUENTO_EFECTIVO}% de descuento)`,
        showCancelButton: true,
        confirmButtonText: 'Efectivo',
        cancelButtonText: 'Tarjeta'
    }).then((result) => {
        if (result.isConfirmed) {
            const precioConDescuento = calcularDescuento(producto.precio);
            Swal.fire({
                title: '¡Excelente!',
                text: `Con el descuento pagarías $${precioConDescuento.toLocaleString()} en lugar de $${producto.precio.toLocaleString()}`,
                icon: 'success'
            });
        } else {
            Swal.fire({
                title: 'Perfecto!',
                text: `El total es $${producto.precio.toLocaleString()}. Puedes pagar con tarjeta en 3 cuotas sin interés.`,
                icon: 'success'
            });
        }
        
        setTimeout(() => {
            mostrarResumenCarrito();
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    await cargarProductos();
    mostrarCategorias();
    aplicarDescuentosAutomaticos();
    crearBotonCarrito();
    
    const botonInteractivo = document.createElement('button');
    botonInteractivo.textContent = '🛒 Compra Interactiva';
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
    
    botonInteractivo.addEventListener('click', iniciarProcesoCompra);
    document.body.appendChild(botonInteractivo);
});