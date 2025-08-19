const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";
let productosEnCarrito = [];
let todosLosProductos = [];

async function cargarProductos() {
    try {
        const response = await fetch('./products.json');
        const data = await response.json();
        
        todosLosProductos = [
            ...data.equipajes.map(producto => ({...producto, seccion: 'equipajes'})),
            ...data.accesorios.map(producto => ({...producto, seccion: 'accesorios'}))
        ];
        
        return todosLosProductos;
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        return [];
    }
}

function renderizarProductos(productos) {
    const contenedorProductos = document.querySelector('.card1');
    
    if (!contenedorProductos) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    contenedorProductos.innerHTML = '';
    
    if (productos.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="no-productos">
                <p>🔍 No se encontraron productos para esta categoría</p>
            </div>
        `;
        return;
    }
    
    productos.forEach(producto => {
        const productoHTML = `
            <article class="todos-equipajes" data-categoria="${producto.categoria}" data-seccion="${producto.seccion}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div>
                    <p>${producto.nombre}</p>
                    <p><strong>Precio:</strong> $${producto.precio.toLocaleString()}</p>
                    <p class="descripcion">${producto.descripcion}</p>
                    <button type="button" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                        Añadir al carrito
                    </button>
                </div>
            </article>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
    
    conectarBotonesCarrito();
}

function filtrarProductos(categoria) {
    let productosFiltrados;
    
    switch(categoria) {
        case 'todos':
        case 'todos-equipajes':
        case 'todos-losaccesorios':
            productosFiltrados = todosLosProductos;
            break;
        case 'equipajes':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'equipajes');
            break;
        case 'carry-on':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'carry-on');
            break;
        case 'mochilas':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'mochilas');
            break;
        case 'antifaz':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'antifaz');
            break;
        case 'riñonera':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'riñonera');
            break;
        case 'balanza':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'balanza');
            break;
        case 'candados':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'candados');
            break;
        case 'botellas':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'botellas');
            break;
        case 'agenda':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'agenda');
            break;
        default:
            productosFiltrados = todosLosProductos;
    }
    
    renderizarProductos(productosFiltrados);
    actualizarFiltroActivo(categoria);
}

function actualizarFiltroActivo(categoriaActiva) {
    const todosLosEnlaces = document.querySelectorAll('.menu-lateral a');
    todosLosEnlaces.forEach(enlace => {
        enlace.classList.remove('filtro-activo');
    });
    
    const enlaceActivo = document.querySelector(`.menu-lateral a[href="#${categoriaActiva}"]`);
    if (enlaceActivo) {
        enlaceActivo.classList.add('filtro-activo');
    }
}

function configurarFiltros() {
    const menuLateral = document.querySelector('.menu-lateral');
    
    if (!menuLateral) {
        return;
    }
    
    const enlacesFiltros = menuLateral.querySelectorAll('a');
    
    enlacesFiltros.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const categoria = href.replace('#', '');
            
            filtrarProductos(categoria);
            
            const seccionProductos = document.querySelector('.productos-seccion');
            if (seccionProductos) {
                seccionProductos.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function agregarProductoAlCarrito(nombreProducto, precio) {
    productosEnCarrito.push({
        nombre: nombreProducto,
        precio: precio
    });
    
    cantidadProductosCarrito = cantidadProductosCarrito + 1;
    totalCarrito = totalCarrito + precio;
    
    actualizarContadorCarrito();
    
    return `¡${nombreProducto} agregado al carrito!`;
}

function actualizarContadorCarrito() {
    let contador = document.querySelector('.contador-carrito');
    
    if (!contador && cantidadProductosCarrito > 0) {
        const header = document.querySelector('header');
        contador = document.createElement('div');
        contador.className = 'contador-carrito';
        contador.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(contador);
    }
    
    if (contador) {
        if (cantidadProductosCarrito > 0) {
            contador.textContent = `🛒 ${cantidadProductosCarrito}`;
            contador.style.display = 'block';
        } else {
            contador.style.display = 'none';
        }
    }
}

function conectarBotonesCarrito() {
    const botones = document.querySelectorAll('button[type="button"]');
    
    botones.forEach((boton, index) => {
        boton.replaceWith(boton.cloneNode(true));
    });
    
    const botonesNuevos = document.querySelectorAll('button[type="button"]');
    
    botonesNuevos.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            const nombre = this.getAttribute('data-nombre');
            const precio = parseInt(this.getAttribute('data-precio'));
            
            if (nombre && precio) {
                const mensaje = agregarProductoAlCarrito(nombre, precio);
                alert(`✅ ${mensaje}`);
                
                this.style.background = '#27ae60';
                this.textContent = '¡Agregado!';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'Añadir al carrito';
                }, 1500);
                
            } else {
                const producto = this.closest('.todos-equipajes');
                if (producto) {
                    const nombreElemento = producto.querySelector('p');
                    const nombreProducto = nombreElemento ? nombreElemento.textContent : "Producto";
                    const precioAleatorio = [89990, 65990, 42990, 58990, 75990][Math.floor(Math.random() * 5)];
                    
                    agregarProductoAlCarrito(nombreProducto, precioAleatorio);
                    alert(`✅ ${nombreProducto} agregado al carrito!`);
                }
            }
        });
    });
}

function calcularDescuento(precio) {
    const descuento = precio * (DESCUENTO_EFECTIVO / 100);
    const precioFinal = precio - descuento;
    
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

function iniciarProcesoCompra() {
    nombreUsuario = prompt("👋 ¡Bienvenido a CALIGO! ¿Cuál es tu nombre?");
    
    if (nombreUsuario === null || nombreUsuario === "") {
        nombreUsuario = "Cliente";
    }
    
    alert(`¡Hola ${nombreUsuario}! Bienvenido a ${NOMBRE_TIENDA}\n✈️ Tu próxima aventura comienza aquí`);
    
    const quiereVerProductos = confirm("¿Te gustaría ver nuestros productos destacados?");
    
    if (quiereVerProductos) {
        mostrarProductosDestacados();
        
        const productoElegido = prompt("¿Qué producto te interesa?\n1. Valija Amayra ($89,990)\n2. Carry-on Tourister ($65,990)\n3. Mochila Discovery ($42,990)\n\nEscribe el número:");
        
        procesarEleccionProducto(productoElegido);
    } else {
        alert("¡Gracias por visitarnos! Vuelve cuando quieras 😊");
    }
}

function mostrarProductosDestacados() {
    console.log("🌟 === PRODUCTOS DESTACADOS ===");
    console.log("1. 🎒 Valija Amayra Gris - $89,990");
    console.log("2. ✈️ Carry-on Tourister Negro - $65,990");
    console.log("3. 🎒 Mochila Discovery Negra - $42,990");
}

function procesarEleccionProducto(eleccion) {
    let nombreProducto = "";
    let precio = 0;
    
    if (eleccion === "1") {
        nombreProducto = "Valija Amayra Gris";
        precio = 89990;
    } else if (eleccion === "2") {
        nombreProducto = "Carry-on Tourister Negro";
        precio = 65990;
    } else if (eleccion === "3") {
        nombreProducto = "Mochila Discovery Negra";
        precio = 42990;
    } else {
        alert("Opción no válida. ¡Inténtalo de nuevo!");
        return;
    }
    
    const mensaje = agregarProductoAlCarrito(nombreProducto, precio);
    
    const quiereEfectivo = confirm(`${mensaje}\n\n💰 ¿Vas a pagar en efectivo?\n(Obtendrías ${DESCUENTO_EFECTIVO}% de descuento)`);
    
    if (quiereEfectivo) {
        const precioConDescuento = calcularDescuento(precio);
        alert(`🎉 ¡Excelente! Con el descuento pagarías $${precioConDescuento} en lugar de $${precio}`);
    } else {
        alert(`✅ Perfecto! El total es $${precio}. Puedes pagar con tarjeta en 3 cuotas sin interés.`);
    }
    
    mostrarResumenCarrito();
}

function agregarBotonCompraInteractiva() {
    const botonInteractivo = document.createElement('button');
    botonInteractivo.textContent = '🛒 Compra Interactiva';
    botonInteractivo.style.cssText = `
        position: fixed;
        bottom: 20px;
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
        transition: transform 0.2s;
    `;
    
    botonInteractivo.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    botonInteractivo.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    botonInteractivo.addEventListener('click', function() {
        iniciarProcesoCompra();
    });
    
    document.body.appendChild(botonInteractivo);
}

document.addEventListener('DOMContentLoaded', async function() {
    await cargarProductos();
    configurarFiltros();
    
    if (document.querySelector('.card1')) {
        filtrarProductos('todos');
    }
    
    agregarBotonCompraInteractiva();
});

const estilosFiltros = document.createElement('style');
estilosFiltros.textContent = `
    .menu-lateral a.filtro-activo {
        background-color: #007bff !important;
        color: white !important;
        font-weight: bold;
        transform: translateX(5px);
        box-shadow: 0 2px 8px rgba(0,123,255,0.3);
    }
    
    .no-productos {
        text-align: center;
        padding: 40px;
        color: #666;
        font-size: 1.2em;
    }
    
    .descripcion {
        font-size: 0.9em;
        color: #666;
        margin: 8px 0;
    }
    
    .contador-carrito {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .menu-lateral a {
        transition: all 0.3s ease;
    }
    
    .menu-lateral a:hover {
        transform: translateX(3px);
        color: #007bff;
    }
`;

document.head.appendChild(estilosFiltros);