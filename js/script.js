let estadoCarrito = {
    productos: [],
    total: 0
};

let datosUsuario = {
    nombre: "",
    email: ""
};

function agregarProductoAlCarrito(nombre, precio) {
    estadoCarrito.productos.push({ 
        id: Date.now(),
        nombre: nombre, 
        precio: precio 
    });
    estadoCarrito.total += precio;
    
    guardarEnStorage();
    mostrarNotificacionAgregado(nombre);
    actualizarContadorVisual();
}

function mostrarNotificacionAgregado(nombre) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${nombre} agregado`,
        showConfirmButton: false,
        timer: 1500
    });
}

function actualizarContadorVisual() {
    let contador = document.getElementById('contador-carrito');
    
    if (!contador) {
        contador = document.createElement('div');
        contador.id = 'contador-carrito';
        contador.className = 'contador-carrito';
        contador.addEventListener('click', mostrarCarritoCompleto);
        document.body.appendChild(contador);
    }
    
    const cantidad = estadoCarrito.productos.length;
    contador.textContent = `🛒 ${cantidad}`;
    contador.style.display = cantidad > 0 ? 'block' : 'none';
}

function mostrarCarritoCompleto() {
    if (estadoCarrito.productos.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos para continuar',
            icon: 'info'
        });
        return;
    }
    
    let productosHTML = '';
    estadoCarrito.productos.forEach(producto => {
        productosHTML += `
            <div class="item-carrito">
                <span>${producto.nombre}</span>
                <span>$${producto.precio.toLocaleString()}</span>
                <button onclick="eliminarProducto(${producto.id})" class="btn-eliminar">🗑️</button>
            </div>
        `;
    });
    
    Swal.fire({
        title: `🛒 Carrito (${estadoCarrito.productos.length} productos)`,
        html: `
            <div class="carrito-contenido">
                ${productosHTML}
                <div class="total-carrito">
                    <strong>Total: $${estadoCarrito.total.toLocaleString()}</strong>
                </div>
            </div>
        `,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Comprar',
        cancelButtonText: 'Seguir comprando',
        denyButtonText: 'Vaciar carrito',
        confirmButtonColor: '#28a745',
        denyButtonColor: '#dc3545'
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompra();
        } else if (result.isDenied) {
            vaciarCarrito();
        }
    });
}

function eliminarProducto(id) {
    const producto = estadoCarrito.productos.find(p => p.id === id);
    if (producto) {
        estadoCarrito.productos = estadoCarrito.productos.filter(p => p.id !== id);
        estadoCarrito.total -= producto.precio;
        guardarEnStorage();
        actualizarContadorVisual();
        mostrarCarritoCompleto();
    }
}

function vaciarCarrito() {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: 'Se eliminarán todos los productos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        confirmButtonColor: '#dc3545'
    }).then((result) => {
        if (result.isConfirmed) {
            estadoCarrito = { productos: [], total: 0 };
            guardarEnStorage();
            actualizarContadorVisual();
            Swal.fire('Carrito vaciado', '', 'success');
        }
    });
}

function procesarCompra() {
    Swal.fire({
        title: 'Datos de compra',
        html: `
            <input id="input-nombre" class="swal2-input" placeholder="Tu nombre" value="${datosUsuario.nombre}">
            <input id="input-email" class="swal2-input" placeholder="Tu email" value="${datosUsuario.email}">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombre = document.getElementById('input-nombre').value;
            const email = document.getElementById('input-email').value;
            
            if (!nombre || !email) {
                Swal.showValidationMessage('Completa todos los campos');
                return false;
            }
            
            return { nombre, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            datosUsuario = result.value;
            elegirMetodoPago();
        }
    });
}

function elegirMetodoPago() {
    const descuento = Math.round(estadoCarrito.total * 0.1);
    const totalEfectivo = estadoCarrito.total - descuento;
    
    Swal.fire({
        title: 'Método de pago',
        html: `
            <div class="metodos-pago">
                <div class="metodo" onclick="finalizarCompra('efectivo', ${totalEfectivo})">
                    <h4>💵 Efectivo</h4>
                    <p>10% descuento</p>
                    <strong>$${totalEfectivo.toLocaleString()}</strong>
                </div>
                <div class="metodo" onclick="finalizarCompra('tarjeta', ${estadoCarrito.total})">
                    <h4>💳 Tarjeta</h4>
                    <p>3 cuotas sin interés</p>
                    <strong>$${estadoCarrito.total.toLocaleString()}</strong>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Volver'
    });
}

function finalizarCompra(metodo, total) {
    const numeroOrden = 'CAL' + Date.now().toString().slice(-6);
    
    guardarOrden(numeroOrden, metodo, total);
    
    Swal.fire({
        title: '🎉 ¡Compra exitosa!',
        html: `
            <div class="compra-exitosa">
                <h3>Orden: ${numeroOrden}</h3>
                <p>¡Gracias ${datosUsuario.nombre}!</p>
                <h4>Total: $${total.toLocaleString()}</h4>
                <a href="https://wa.me/1234567890?text=Mi orden es ${numeroOrden}" 
                   target="_blank" class="btn-whatsapp">
                   📱 WhatsApp
                </a>
            </div>
        `,
        icon: 'success',
        confirmButtonText: 'Continuar'
    }).then(() => {
        estadoCarrito = { productos: [], total: 0 };
        guardarEnStorage();
        actualizarContadorVisual();
    });
}

function guardarOrden(numero, metodo, total) {
    const orden = {
        numero: numero,
        fecha: new Date().toISOString(),
        cliente: datosUsuario,
        productos: [...estadoCarrito.productos],
        metodoPago: metodo,
        total: total
    };
    
    const ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
    ordenes.push(orden);
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
}

function guardarEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(estadoCarrito));
}

function cargarDeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        estadoCarrito = JSON.parse(carritoGuardado);
        actualizarContadorVisual();
    }
}

function conectarBotonesProductos() {
    const botones = document.querySelectorAll('button[type="button"]');
    
    botones.forEach(boton => {
        if (boton.textContent.includes('Añadir al carrito')) {
            boton.addEventListener('click', function() {
                const articulo = this.closest('article');
                const nombre = articulo.querySelector('p').textContent;
                
                const precioTexto = articulo.innerHTML;
                const precioMatch = precioTexto.match(/\$([0-9.,]+)/);
                const precio = precioMatch ? 
                    parseInt(precioMatch[1].replace(/[.,]/g, '')) : 
                    50000;
                
                agregarProductoAlCarrito(nombre, precio);
                
                this.style.backgroundColor = '#28a745';
                this.style.color = 'white';
                this.textContent = '¡Agregado!';
                
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                    this.textContent = 'Añadir al carrito';
                }, 2000);
            });
        }
    });
}

function configurarFiltrosMenu() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (!menuLateral) return;
    
    const enlaces = menuLateral.querySelectorAll('a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const categoria = this.getAttribute('href').replace('#', '');
            aplicarFiltroCategoria(categoria);
            
            enlaces.forEach(e => e.classList.remove('filtro-activo'));
            this.classList.add('filtro-activo');
        });
    });
}

function aplicarFiltroCategoria(categoria) {
    const productos = document.querySelectorAll('.todos-equipajes');
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('p').textContent.toLowerCase();
        let mostrar = false;
        
        switch(categoria) {
            case 'todos-equipajes':
            case 'todos-losaccesorios':
                mostrar = true;
                break;
            case 'equipajes':
                mostrar = nombre.includes('valija') && 
                         !nombre.includes('carry') && 
                         !nombre.includes('mochila');
                break;
            case 'carry-on':
                mostrar = nombre.includes('carry');
                break;
            case 'mochilas':
                mostrar = nombre.includes('mochila');
                break;
            case 'agenda':
                mostrar = nombre.includes('agenda');
                break;
            case 'botellas':
                mostrar = nombre.includes('botella');
                break;
            case 'candados':
                mostrar = nombre.includes('candado');
                break;
            case 'riñonera':
                mostrar = nombre.includes('riñonera');
                break;
            case 'neceser':
                mostrar = nombre.includes('neceser');
                break;
            case 'perfumeros':
                mostrar = nombre.includes('perfumero');
                break;
        }
        
        producto.style.display = mostrar ? 'block' : 'none';
    });
}

function crearBotonCompraRapida() {
    const boton = document.createElement('button');
    boton.innerHTML = '🛒 Compra Rápida';
    boton.className = 'boton-compra-rapida';
    boton.addEventListener('click', mostrarProductosDestacados);
    document.body.appendChild(boton);
}

function mostrarProductosDestacados() {
    const productos = [
        { nombre: "Valija Amayra Gris", precio: 89990 },
        { nombre: "Carry-on Tourister Negro", precio: 65990 },
        { nombre: "Mochila Discovery Negra", precio: 42990 }
    ];
    
    let productosHTML = '';
    productos.forEach((producto, index) => {
        productosHTML += `
            <div class="producto-destacado" onclick="agregarDestacado('${producto.nombre}', ${producto.precio})">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toLocaleString()}</p>
                <button>Agregar</button>
            </div>
        `;
    });
    
    Swal.fire({
        title: '🌟 Productos Destacados',
        html: `<div class="productos-destacados">${productosHTML}</div>`,
        showConfirmButton: false,
        showCloseButton: true
    });
}

function agregarDestacado(nombre, precio) {
    agregarProductoAlCarrito(nombre, precio);
    Swal.close();
}

function inicializarSweetAlert() {
    if (typeof Swal === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.js';
        document.head.appendChild(script);
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.css';
        document.head.appendChild(link);
    }
}

function aplicarEstilosCSS() {
    const estilos = document.createElement('style');
    estilos.textContent = `
        .contador-carrito {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 1000;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
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
        }
        
        .menu-lateral a.filtro-activo {
            background-color: #007bff !important;
            color: white !important;
            font-weight: bold;
            transform: translateX(5px);
            box-shadow: 0 2px 8px rgba(0,123,255,0.3);
        }
        
        .menu-lateral a {
            transition: all 0.3s ease;
        }
        
        .item-carrito {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .btn-eliminar {
            background: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .total-carrito {
            text-align: center;
            padding: 15px;
            font-size: 1.2em;
            border-top: 2px solid #007bff;
            margin-top: 10px;
        }
        
        .metodos-pago {
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        
        .metodo {
            border: 2px solid #ddd;
            padding: 20px;
            border-radius: 10px;
            cursor: pointer;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .metodo:hover {
            border-color: #007bff;
            background: #f8f9fa;
        }
        
        .productos-destacados {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .producto-destacado {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
        }
        
        .producto-destacado:hover {
            border-color: #007bff;
            background: #f8f9fa;
        }
        
        .btn-whatsapp {
            display: inline-block;
            background: #25d366;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 20px;
            margin-top: 10px;
        }
        
        .compra-exitosa {
            text-align: center;
        }
    `;
    document.head.appendChild(estilos);
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarSweetAlert();
    aplicarEstilosCSS();
    cargarDeStorage();
    conectarBotonesProductos();
    configurarFiltrosMenu();
    crearBotonCompraRapida();
});

window.eliminarProducto = eliminarProducto;
window.finalizarCompra = finalizarCompra;
window.agregarDestacado = agregarDestacado;