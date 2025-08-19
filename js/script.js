const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";
let productosEnCarrito = [];

const categoriasProductos = ["Equipajes", "Accesorios", "Mochilas", "Carry-on"];
const preciosProductos = [89990, 65990, 42990, 58990, 75990];

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
            cursor: pointer;
            animation: pulse 2s infinite;
        `;
        contador.addEventListener('click', mostrarCarritoSimple);
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

function mostrarCarritoSimple() {
    if (productosEnCarrito.length === 0) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Carrito vacío',
                text: '¡Agrega algunos productos para continuar!',
                icon: 'info',
                confirmButtonText: 'Entendido'
            });
        } else {
            alert('Carrito vacío. ¡Agrega algunos productos para continuar!');
        }
        return;
    }
    
    let resumen = "🛒 TU CARRITO:\n\n";
    productosEnCarrito.forEach((producto, index) => {
        resumen += `${index + 1}. ${producto.nombre} - $${producto.precio.toLocaleString()}\n`;
    });
    resumen += `\n💰 TOTAL: $${totalCarrito.toLocaleString()}`;
    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Tu Carrito',
            text: resumen,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Finalizar Compra',
            cancelButtonText: 'Seguir Comprando'
        }).then((result) => {
            if (result.isConfirmed) {
                procesarCompraSimple();
            }
        });
    } else {
        const quiereComprar = confirm(resumen + "\n\n¿Deseas finalizar la compra?");
        if (quiereComprar) {
            procesarCompraSimple();
        }
    }
}

function procesarCompraSimple() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '¡Compra exitosa!',
            text: `¡Gracias por tu compra! Total: $${totalCarrito.toLocaleString()}`,
            icon: 'success',
            confirmButtonText: 'Continuar'
        }).then(() => {
            vaciarCarrito();
        });
    } else {
        alert(`¡Compra exitosa! Gracias por tu compra. Total: $${totalCarrito.toLocaleString()}`);
        vaciarCarrito();
    }
}

function vaciarCarrito() {
    productosEnCarrito = [];
    cantidadProductosCarrito = 0;
    totalCarrito = 0;
    actualizarContadorCarrito();
}

function configurarFiltrosEquipajes() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (!menuLateral) return;
    
    const enlaces = menuLateral.querySelectorAll('a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.getAttribute('href').replace('#', '');
            filtrarProductosEquipajes(categoria);
            
            enlaces.forEach(e => e.classList.remove('filtro-activo'));
            this.classList.add('filtro-activo');
        });
    });
}

function filtrarProductosEquipajes(categoria) {
    const productos = document.querySelectorAll('.todos-equipajes');
    
    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
        let mostrar = false;
        
        switch(categoria) {
            case 'todos-equipajes':
                mostrar = true;
                break;
            case 'equipajes':
                mostrar = nombreProducto.includes('valija') && !nombreProducto.includes('carry') && !nombreProducto.includes('mochila');
                break;
            case 'carry-on':
                mostrar = nombreProducto.includes('carry');
                break;
            case 'mochilas':
                mostrar = nombreProducto.includes('mochila');
                break;
        }
        
        producto.style.display = mostrar ? 'block' : 'none';
    });
}

function configurarFiltrosAccesorios() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (!menuLateral) return;
    
    const enlaces = menuLateral.querySelectorAll('a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.getAttribute('href').replace('#', '');
            filtrarProductosAccesorios(categoria);
            
            enlaces.forEach(e => e.classList.remove('filtro-activo'));
            this.classList.add('filtro-activo');
        });
    });
}

function filtrarProductosAccesorios(categoria) {
    const productos = document.querySelectorAll('.todos-equipajes');
    
    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
        let mostrar = false;
        
        switch(categoria) {
            case 'todos-losaccesorios':
                mostrar = true;
                break;
            case 'antifaz':
                mostrar = nombreProducto.includes('antifaz');
                break;
            case 'riñonera':
                mostrar = nombreProducto.includes('riñonera');
                break;
            case 'balanza':
                mostrar = nombreProducto.includes('balanza');
                break;
            case 'candados':
                mostrar = nombreProducto.includes('candado');
                break;
            case 'botellas':
                mostrar = nombreProducto.includes('botella');
                break;
            case 'agenda':
                mostrar = nombreProducto.includes('agenda');
                break;
        }
        
        producto.style.display = mostrar ? 'block' : 'none';
    });
}

function conectarBotonesCarrito() {
    const botones = document.querySelectorAll('button[type="button"]');
    
    botones.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            const producto = this.closest('.todos-equipajes');
            if (producto) {
                const nombreElemento = producto.querySelector('p');
                const nombre = nombreElemento ? nombreElemento.textContent : "Producto";
                const precioTexto = producto.querySelector('strong').parentNode.textContent;
                const precioMatch = precioTexto.match(/\$([0-9.,]+)/);
                const precio = precioMatch ? parseInt(precioMatch[1].replace(/[.,]/g, '')) : preciosProductos[Math.floor(Math.random() * preciosProductos.length)];
                
                const mensaje = agregarProductoAlCarrito(nombre, precio);
                
                this.style.background = '#27ae60';
                this.textContent = '¡Agregado!';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'Añadir al carrito';
                }, 1500);
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: mensaje,
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });
                } else {
                    alert(mensaje);
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
    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
        });
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
    
    return tipoCliente;
}

function iniciarProcesoCompra() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '👋 ¡Bienvenido a CALIGO!',
            input: 'text',
            inputLabel: '¿Cuál es tu nombre?',
            inputPlaceholder: 'Escribe tu nombre aquí',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                nombreUsuario = result.value;
                mostrarProductosDestacados();
            }
        });
    } else {
        nombreUsuario = prompt("👋 ¡Bienvenido a CALIGO! ¿Cuál es tu nombre?");
        if (nombreUsuario && nombreUsuario !== "") {
            mostrarProductosDestacados();
        }
    }
}

function mostrarProductosDestacados() {
    const mensaje = `¡Hola ${nombreUsuario}! Bienvenido a ${NOMBRE_TIENDA}\n✈️ Tu próxima aventura comienza aquí\n\n¿Te gustaría ver nuestros productos destacados?`;
    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: `¡Hola ${nombreUsuario}!`,
            text: '¿Te gustaría ver nuestros productos destacados?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, ver productos',
            cancelButtonText: 'No, gracias'
        }).then((result) => {
            if (result.isConfirmed) {
                elegirProductoDestacado();
            }
        });
    } else {
        const quiereVer = confirm(mensaje);
        if (quiereVer) {
            elegirProductoDestacado();
        }
    }
}

function elegirProductoDestacado() {
    const productos = "¿Qué producto te interesa?\n1. Valija Amayra ($89,990)\n2. Carry-on Tourister ($65,990)\n3. Mochila Discovery ($42,990)\n\nEscribe el número:";
    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Productos Destacados',
            html: `
                <div style="text-align: left;">
                    <p><strong>1.</strong> 🎒 Valija Amayra Gris - $89,990</p>
                    <p><strong>2.</strong> ✈️ Carry-on Tourister Negro - $65,990</p>
                    <p><strong>3.</strong> 🎒 Mochila Discovery Negra - $42,990</p>
                </div>
            `,
            input: 'select',
            inputOptions: {
                '1': 'Valija Amayra ($89,990)',
                '2': 'Carry-on Tourister ($65,990)',
                '3': 'Mochila Discovery ($42,990)'
            },
            inputPlaceholder: 'Selecciona un producto',
            showCancelButton: true,
            confirmButtonText: 'Agregar al carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                procesarEleccionProducto(result.value);
            }
        });
    } else {
        const eleccion = prompt(productos);
        if (eleccion) {
            procesarEleccionProducto(eleccion);
        }
    }
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
        if (typeof Swal !== 'undefined') {
            Swal.fire('Error', 'Opción no válida. ¡Inténtalo de nuevo!', 'error');
        } else {
            alert("Opción no válida. ¡Inténtalo de nuevo!");
        }
        return;
    }
    
    const mensaje = agregarProductoAlCarrito(nombreProducto, precio);
    
    const preguntaMetodo = `${mensaje}\n\n💰 ¿Vas a pagar en efectivo?\n(Obtendrías ${DESCUENTO_EFECTIVO}% de descuento)`;
    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '¡Producto agregado!',
            text: `¿Vas a pagar en efectivo? (Obtendrías ${DESCUENTO_EFECTIVO}% de descuento)`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, en efectivo',
            cancelButtonText: 'No, con tarjeta'
        }).then((result) => {
            if (result.isConfirmed) {
                const precioConDescuento = calcularDescuento(precio);
                Swal.fire('¡Excelente!', `Con el descuento pagarías $${precioConDescuento.toLocaleString()} en lugar de $${precio.toLocaleString()}`, 'success');
            } else {
                Swal.fire('Perfecto', `El total es $${precio.toLocaleString()}. Puedes pagar con tarjeta en 3 cuotas sin interés.`, 'success');
            }
        });
    } else {
        const quiereEfectivo = confirm(preguntaMetodo);
        
        if (quiereEfectivo) {
            const precioConDescuento = calcularDescuento(precio);
            alert(`🎉 ¡Excelente! Con el descuento pagarías $${precioConDescuento.toLocaleString()} en lugar de $${precio.toLocaleString()}`);
        } else {
            alert(`✅ Perfecto! El total es $${precio.toLocaleString()}. Puedes pagar con tarjeta en 3 cuotas sin interés.`);
        }
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

function detectarPagina() {
    const url = window.location.pathname;
    
    if (url.includes('equipajes.html')) {
        configurarFiltrosEquipajes();
    } else if (url.includes('accesorios.html')) {
        configurarFiltrosAccesorios();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    conectarBotonesCarrito();
    detectarPagina();
    agregarBotonCompraInteractiva();
    
    if (typeof Swal === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.js';
        document.head.appendChild(script);
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.css';
        document.head.appendChild(link);
    }
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