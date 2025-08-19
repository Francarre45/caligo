const CONFIG = {
    NOMBRE_TIENDA: "CALIGO",
    DESCUENTO_EFECTIVO: 10,
    NUMERO_WHATSAPP: "1234567890",
    CUOTAS_SIN_INTERES: 3
};

let estadoCarrito = {
    productos: [],
    cantidad: 0,
    total: 0
};

let estadoUsuario = {
    nombre: "",
    metodoPago: "",
    descuentoAplicado: false
};

let todosLosProductos = [];

const productosData = {
    equipajes: [
        {
            id: 1,
            nombre: "Valija Gris amayra - Tamaño Grande",
            precio: 89990,
            imagen: "../assest/img/Valija Amayra Gris.webp",
            categoria: "equipajes",
            descripcion: "Valija rígida de gran tamaño con ruedas giratorias 360°"
        },
        {
            id: 2,
            nombre: "Carry on Tourister negro",
            precio: 65990,
            imagen: "../assest/img/Carry on Tourister Negro.webp",
            categoria: "carry-on",
            descripcion: "Equipaje de cabina con compartimentos organizadores"
        },
        {
            id: 3,
            nombre: "Valija Discovery celeste",
            precio: 75990,
            imagen: "../assest/img/Valija Discovery Celeste.webp",
            categoria: "equipajes",
            descripcion: "Valija expandible con cierre TSA incluido"
        },
        {
            id: 4,
            nombre: "Carry on Wanderlust gris",
            precio: 58990,
            imagen: "../assest/img/Carry on Wanderlust Gris.webp",
            categoria: "carry-on",
            descripcion: "Maleta de cabina ultraliviana para viajes frecuentes"
        },
        {
            id: 5,
            nombre: "Valija check in hard negra",
            precio: 95990,
            imagen: "../assest/img/Valija chek in hard negra.webp",
            categoria: "equipajes",
            descripcion: "Valija de gran resistencia para viajes largos"
        },
        {
            id: 6,
            nombre: "Mochila discovery Negra",
            precio: 42990,
            imagen: "../assest/img/Mochi Discovery Negra.webp",
            categoria: "mochilas",
            descripcion: "Mochila urbana con compartimento para laptop"
        }
    ],
    accesorios: [
        {
            id: 7,
            nombre: "Agenda Mooving Negra",
            precio: 15990,
            imagen: "../assest/img/AGENDA MOOVING DIARIA NEGRA .jpg",
            categoria: "agenda",
            descripcion: "Agenda diaria para organizar tus viajes"
        },
        {
            id: 8,
            nombre: "Botella contigo Celeste",
            precio: 25990,
            imagen: "../assest/img/Botella Contigo Celeste.webp",
            categoria: "botellas",
            descripcion: "Botella térmica para mantener temperatura"
        },
        {
            id: 9,
            nombre: "Candado Tsa azul",
            precio: 8990,
            imagen: "../assest/img/Candado TSA azul.webp",
            categoria: "candados",
            descripcion: "Candado de seguridad con combinación TSA"
        },
        {
            id: 10,
            nombre: "Neceser xtreme Voyager gris",
            precio: 32990,
            imagen: "../assest/img/Neceser Xtreme Voyager gris.webp",
            categoria: "neceser",
            descripcion: "Organizador de artículos de higiene personal"
        },
        {
            id: 11,
            nombre: "Riñonera Chimola Gris",
            precio: 18990,
            imagen: "../assest/img/RIÑONERA CHIMOLA GRIS.webp",
            categoria: "riñonera",
            descripcion: "Riñonera práctica para llevar documentos"
        },
        {
            id: 12,
            nombre: "Perfumeros",
            precio: 12990,
            imagen: "../assest/img/perfumeros.webp",
            categoria: "perfumeros",
            descripcion: "Set de frascos para perfumes de viaje"
        }
    ]
};

function cargarProductos() {
    todosLosProductos = [
        ...productosData.equipajes.map(producto => ({...producto, seccion: 'equipajes'})),
        ...productosData.accesorios.map(producto => ({...producto, seccion: 'accesorios'}))
    ];
    return todosLosProductos;
}

function renderizarProductos(productos) {
    const contenedorProductos = document.querySelector('.card1');
    
    if (!contenedorProductos) {
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
                    <button type="button" class="btn-agregar" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
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
        case 'neceser':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'neceser');
            break;
        case 'perfumeros':
            productosFiltrados = todosLosProductos.filter(p => p.categoria === 'perfumeros');
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

function agregarProductoAlCarrito(id, nombre, precio) {
    const productoExistente = estadoCarrito.productos.find(p => p.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        estadoCarrito.productos.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    
    estadoCarrito.cantidad += 1;
    estadoCarrito.total += precio;
    
    actualizarContadorCarrito();
    
    return nombre;
}

function eliminarDelCarrito(id) {
    const producto = estadoCarrito.productos.find(p => p.id === id);
    
    if (producto) {
        estadoCarrito.cantidad -= producto.cantidad;
        estadoCarrito.total -= (producto.precio * producto.cantidad);
        estadoCarrito.productos = estadoCarrito.productos.filter(p => p.id !== id);
    }
    
    actualizarContadorCarrito();
    renderizarCarrito();
}

function cambiarCantidadProducto(id, nuevaCantidad) {
    const producto = estadoCarrito.productos.find(p => p.id === id);
    
    if (producto && nuevaCantidad > 0) {
        const diferencia = nuevaCantidad - producto.cantidad;
        estadoCarrito.cantidad += diferencia;
        estadoCarrito.total += (producto.precio * diferencia);
        producto.cantidad = nuevaCantidad;
    }
    
    actualizarContadorCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    estadoCarrito = {
        productos: [],
        cantidad: 0,
        total: 0
    };
    actualizarContadorCarrito();
    renderizarCarrito();
}

function actualizarContadorCarrito() {
    let contador = document.querySelector('.contador-carrito');
    
    if (!contador && estadoCarrito.cantidad > 0) {
        contador = document.createElement('div');
        contador.className = 'contador-carrito';
        contador.addEventListener('click', mostrarCarrito);
        document.body.appendChild(contador);
    }
    
    if (contador) {
        if (estadoCarrito.cantidad > 0) {
            contador.innerHTML = `🛒 ${estadoCarrito.cantidad}`;
            contador.style.display = 'block';
        } else {
            contador.style.display = 'none';
        }
    }
}

function mostrarCarrito() {
    if (estadoCarrito.productos.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: '¡Agrega algunos productos para continuar!',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#007bff'
        });
        return;
    }
    
    renderizarCarrito();
}

function renderizarCarrito() {
    let productosHTML = '';
    
    estadoCarrito.productos.forEach(producto => {
        productosHTML += `
            <div class="producto-carrito">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio.toLocaleString()} c/u</p>
                </div>
                <div class="controles-cantidad">
                    <button onclick="cambiarCantidadProducto(${producto.id}, ${producto.cantidad - 1})" class="btn-cantidad">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button onclick="cambiarCantidadProducto(${producto.id}, ${producto.cantidad + 1})" class="btn-cantidad">+</button>
                </div>
                <div class="subtotal">
                    $${(producto.precio * producto.cantidad).toLocaleString()}
                </div>
                <button onclick="eliminarDelCarrito(${producto.id})" class="btn-eliminar">🗑️</button>
            </div>
        `;
    });
    
    Swal.fire({
        title: `🛒 Tu Carrito (${estadoCarrito.cantidad} productos)`,
        html: `
            <div class="carrito-modal">
                ${productosHTML}
                <div class="total-carrito">
                    <h3>Total: $${estadoCarrito.total.toLocaleString()}</h3>
                </div>
            </div>
        `,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Finalizar Compra',
        cancelButtonText: 'Seguir Comprando',
        denyButtonText: 'Vaciar Carrito',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        denyButtonColor: '#dc3545',
        width: '800px'
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompra();
        } else if (result.isDenied) {
            confirmarVaciarCarrito();
        }
    });
}

function confirmarVaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminarán todos los productos del carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc3545'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            Swal.fire({
                title: 'Carrito vaciado',
                text: 'Todos los productos han sido eliminados',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
}

function conectarBotonesCarrito() {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const nombre = this.getAttribute('data-nombre');
            const precio = parseInt(this.getAttribute('data-precio'));
            
            const nombreProducto = agregarProductoAlCarrito(id, nombre, precio);
            
            this.style.background = '#28a745';
            this.innerHTML = '¡Agregado! ✓';
            
            setTimeout(() => {
                this.style.background = '';
                this.innerHTML = 'Añadir al carrito';
            }, 1500);
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${nombreProducto} agregado`,
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
        });
    });
}

function procesarCompra() {
    Swal.fire({
        title: 'Información personal',
        html: `
            <input id="swal-input-nombre" class="swal2-input" placeholder="Tu nombre completo" value="${estadoUsuario.nombre}">
            <input id="swal-input-email" class="swal2-input" placeholder="Tu email" type="email">
            <input id="swal-input-telefono" class="swal2-input" placeholder="Tu teléfono">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('swal-input-nombre').value;
            const email = document.getElementById('swal-input-email').value;
            const telefono = document.getElementById('swal-input-telefono').value;
            
            if (!nombre || !email || !telefono) {
                Swal.showValidationMessage('Por favor completa todos los campos');
                return false;
            }
            
            return { nombre, email, telefono };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            estadoUsuario.nombre = result.value.nombre;
            elegirMetodoPago();
        }
    });
}

function elegirMetodoPago() {
    Swal.fire({
        title: 'Método de pago',
        html: `
            <div class="metodos-pago">
                <div class="metodo-pago" data-metodo="efectivo">
                    <h4>💵 Efectivo</h4>
                    <p>Descuento del ${CONFIG.DESCUENTO_EFECTIVO}%</p>
                    <p class="precio-descuento">Total: $${calcularPrecioConDescuento(estadoCarrito.total).toLocaleString()}</p>
                </div>
                <div class="metodo-pago" data-metodo="tarjeta">
                    <h4>💳 Tarjeta</h4>
                    <p>Hasta ${CONFIG.CUOTAS_SIN_INTERES} cuotas sin interés</p>
                    <p class="precio-normal">Total: $${estadoCarrito.total.toLocaleString()}</p>
                </div>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Volver',
        didOpen: () => {
            const metodos = document.querySelectorAll('.metodo-pago');
            metodos.forEach(metodo => {
                metodo.addEventListener('click', () => {
                    const tipoMetodo = metodo.getAttribute('data-metodo');
                    estadoUsuario.metodoPago = tipoMetodo;
                    estadoUsuario.descuentoAplicado = (tipoMetodo === 'efectivo');
                    Swal.close();
                    confirmarCompra();
                });
            });
        }
    });
}

function calcularPrecioConDescuento(precio) {
    return precio - (precio * CONFIG.DESCUENTO_EFECTIVO / 100);
}

function confirmarCompra() {
    const precioFinal = estadoUsuario.descuentoAplicado ? 
        calcularPrecioConDescuento(estadoCarrito.total) : 
        estadoCarrito.total;
    
    const metodoPagoTexto = estadoUsuario.metodoPago === 'efectivo' ? 
        `💵 Efectivo (${CONFIG.DESCUENTO_EFECTIVO}% descuento)` : 
        `💳 Tarjeta (hasta ${CONFIG.CUOTAS_SIN_INTERES} cuotas)`;
    
    let resumenHTML = `
        <div class="resumen-compra">
            <h4>👤 ${estadoUsuario.nombre}</h4>
            <h4>💰 ${metodoPagoTexto}</h4>
            <hr>
            <div class="productos-resumen">
    `;
    
    estadoCarrito.productos.forEach(producto => {
        resumenHTML += `
            <div class="producto-resumen">
                <span>${producto.nombre} x${producto.cantidad}</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString()}</span>
            </div>
        `;
    });
    
    resumenHTML += `
            </div>
            <hr>
            <div class="total-final">
                <strong>TOTAL: $${precioFinal.toLocaleString()}</strong>
            </div>
        </div>
    `;
    
    Swal.fire({
        title: '🛍️ Confirmar compra',
        html: resumenHTML,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Pedido',
        cancelButtonText: 'Modificar',
        confirmButtonColor: '#28a745'
    }).then((result) => {
        if (result.isConfirmed) {
            finalizarCompra();
        }
    });
}

function finalizarCompra() {
    const numeroOrden = 'CAL' + Date.now().toString().slice(-6);
    
    Swal.fire({
        title: '🎉 ¡Compra exitosa!',
        html: `
            <div class="compra-exitosa">
                <h3>Orden: ${numeroOrden}</h3>
                <p>¡Gracias ${estadoUsuario.nombre}!</p>
                <p>Tu pedido ha sido procesado correctamente</p>
                <br>
                <a href="https://wa.me/${CONFIG.NUMERO_WHATSAPP}?text=Hola! Mi orden es ${numeroOrden}" 
                   target="_blank" class="btn-whatsapp">
                   📱 Contactar por WhatsApp
                </a>
            </div>
        `,
        icon: 'success',
        confirmButtonText: 'Continuar comprando',
        confirmButtonColor: '#28a745'
    }).then(() => {
        vaciarCarrito();
        estadoUsuario = { nombre: "", metodoPago: "", descuentoAplicado: false };
    });
}

function crearBotonCompraRapida() {
    const botonCompraRapida = document.createElement('button');
    botonCompraRapida.innerHTML = '🛒 Compra Rápida';
    botonCompraRapida.className = 'boton-compra-rapida';
    
    botonCompraRapida.addEventListener('click', function() {
        mostrarProductosDestacados();
    });
    
    document.body.appendChild(botonCompraRapida);
}

function mostrarProductosDestacados() {
    const productosDestacados = [
        { nombre: "Valija Amayra Gris", precio: 89990, id: 1 },
        { nombre: "Carry-on Tourister Negro", precio: 65990, id: 2 },
        { nombre: "Mochila Discovery Negra", precio: 42990, id: 6 }
    ];
    
    let productosHTML = '';
    productosDestacados.forEach(producto => {
        productosHTML += `
            <div class="producto-destacado" data-id="${producto.id}">
                <h4>${producto.nombre}</h4>
                <p class="precio">$${producto.precio.toLocaleString()}</p>
                <button onclick="agregarDestacadoAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})" 
                        class="btn-agregar-destacado">
                    Agregar al carrito
                </button>
            </div>
        `;
    });
    
    Swal.fire({
        title: '🌟 Productos Destacados',
        html: `
            <div class="productos-destacados">
                ${productosHTML}
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        width: '600px'
    });
}

function agregarDestacadoAlCarrito(id, nombre, precio) {
    agregarProductoAlCarrito(id, nombre, precio);
    
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${nombre} agregado`,
        showConfirmButton: false,
        timer: 1500,
        toast: true
    });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
    configurarFiltros();
    
    if (document.querySelector('.card1')) {
        filtrarProductos('todos');
    }
    
    crearBotonCompraRapida();
});

const estilosPersonalizados = document.createElement('style');
estilosPersonalizados.textContent = `
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
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 12px 18px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    }
    
    .contador-carrito:hover {
        transform: scale(1.05);
        background: #c0392b;
    }
    
    .boton-compra-rapida {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    }
    
    .boton-compra-rapida:hover {
        transform: scale(1.05);
        background: #0056b3;
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
    
    .carrito-modal .producto-carrito {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
    }
    
    .carrito-modal .info-producto h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
    }
    
    .carrito-modal .info-producto p {
        margin: 0;
        color: #666;
        font-size: 14px;
    }
    
    .carrito-modal .controles-cantidad {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .carrito-modal .btn-cantidad {
        background: #007bff;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-weight: bold;
    }
    
    .carrito-modal .cantidad {
        font-weight: bold;
        min-width: 20px;
        text-align: center;
    }
    
    .carrito-modal .subtotal {
        font-weight: bold;
        color: #28a745;
    }
    
    .carrito-modal .btn-eliminar {
        background: #dc3545;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .carrito-modal .total-carrito {
        text-align: center;
        padding: 20px;
        border-top: 2px solid #007bff;
        margin-top: 20px;
    }
    
    .metodos-pago {
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    
    .metodo-pago {
        border: 2px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        min-width: 200px;
    }
    
    .metodo-pago:hover {
        border-color: #007bff;
        background: #f8f9fa;
        transform: translateY(-2px);
    }
    
    .metodo-pago h4 {
        margin: 0 0 10px 0;
        color: #333;
    }
    
    .metodo-pago p {
        margin: 5px 0;
        color: #666;
    }
    
    .precio-descuento {
        color: #28a745 !important;
        font-weight: bold !important;
    }
    
    .precio-normal {
        color: #007bff !important;
        font-weight: bold !important;
    }
    
    .resumen-compra {
        text-align: left;
        max-width: 400px;
        margin: 0 auto;
    }
    
    .productos-resumen .producto-resumen {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        padding: 5px 0;
    }
    
    .total-final {
        text-align: center;
        font-size: 1.2em;
        color: #28a745;
        margin-top: 15px;
    }
    
    .compra-exitosa {
        text-align: center;
    }
    
    .compra-exitosa h3 {
        color: #28a745;
        margin: 0 0 15px 0;
    }
    
    .btn-whatsapp {
        display: inline-block;
        background: #25d366;
        color: white;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 25px;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .btn-whatsapp:hover {
        background: #128c7e;
        transform: scale(1.05);
    }
    
    .productos-destacados {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .producto-destacado {
        border: 1px solid #ddd;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        min-width: 180px;
        transition: all 0.3s ease;
    }
    
    .producto-destacado:hover {
        border-color: #007bff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .producto-destacado h4 {
        margin: 0 0 10px 0;
        color: #333;
        font-size: 16px;
    }
    
    .producto-destacado .precio {
        color: #28a745;
        font-weight: bold;
        font-size: 18px;
        margin: 10px 0;
    }
    
    .btn-agregar-destacado {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .btn-agregar-destacado:hover {
        background: #0056b3;
        transform: scale(1.05);
    }
    
    .btn-agregar {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .btn-agregar:hover {
        background: #0056b3;
        transform: scale(1.05);
    }
`;

document.head.appendChild(estilosPersonalizados);

if (typeof Swal === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.js';
    document.head.appendChild(script);
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.css';
    document.head.appendChild(link);
}