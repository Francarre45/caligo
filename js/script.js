const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;

const PRODUCTOS_DISPONIBLES = [
    { id: 1, nombre: "Valija Amayra Gris", precio: 89990, categoria: "equipaje", imagen: "Valija Amayra Gris.webp" },
    { id: 2, nombre: "Carry-on Tourister Negro", precio: 65990, categoria: "equipaje", imagen: "Carry on Tourister Negro.webp" },
    { id: 3, nombre: "Valija Discovery Celeste", precio: 75990, categoria: "equipaje", imagen: "Valija Discovery Celeste.webp" },
    { id: 4, nombre: "Carry-on Wanderlust Gris", precio: 58990, categoria: "equipaje", imagen: "Carry on Wanderlust Gris.webp" },
    { id: 5, nombre: "Valija Check-in Hard Negra", precio: 95990, categoria: "equipaje", imagen: "Valija chek in hard negra.webp" },
    { id: 6, nombre: "Mochila Discovery Negra", precio: 42990, categoria: "mochila", imagen: "Mochi Discovery Negra.webp" },
    { id: 7, nombre: "Agenda Mooving Negra", precio: 15990, categoria: "accesorio", imagen: "AGENDA MOOVING DIARIA NEGRA .jpg" },
    { id: 8, nombre: "Botella Contigo Celeste", precio: 25990, categoria: "accesorio", imagen: "Botella Contigo Celeste.webp" },
    { id: 9, nombre: "Candado TSA Azul", precio: 8990, categoria: "accesorio", imagen: "Candado TSA azul.webp" },
    { id: 10, nombre: "Neceser Xtreme Voyager Gris", precio: 18990, categoria: "accesorio", imagen: "Neceser Xtreme Voyager gris.webp" },
    { id: 11, nombre: "Riñonera Chimola Gris", precio: 22990, categoria: "accesorio", imagen: "RIÑONERA CHIMOLA GRIS.webp" },
    { id: 12, nombre: "Perfumeros", precio: 12990, categoria: "accesorio", imagen: "perfumeros.webp" }
];

let carrito = [];
let contadorCarrito = 0;
let totalCarrito = 0;

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carritoCaligo');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        recalcularTotales();
        actualizarContadorCarrito();
    }
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carritoCaligo', JSON.stringify(carrito));
}

function recalcularTotales() {
    contadorCarrito = carrito.length;
    totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = `🛒 ${contadorCarrito}`;
    }
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <div class="notificacion-contenido">
            <span>${mensaje}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 3000);
}

function agregarAlCarrito(idProducto) {
    const producto = PRODUCTOS_DISPONIBLES.find(p => p.id === parseInt(idProducto));
    
    if (producto) {
        carrito.push(producto);
        recalcularTotales();
        actualizarContadorCarrito();
        guardarCarritoEnStorage();
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        console.log(`Producto agregado: ${producto.nombre} - ${producto.precio}`);
    }
}

function eliminarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        const producto = carrito[index];
        carrito.splice(index, 1);
        recalcularTotales();
        actualizarContadorCarrito();
        guardarCarritoEnStorage();
        mostrarCarrito();
        mostrarNotificacion(`${producto.nombre} eliminado del carrito`, 'error');
    }
}

function vaciarCarrito() {
    carrito = [];
    contadorCarrito = 0;
    totalCarrito = 0;
    actualizarContadorCarrito();
    guardarCarritoEnStorage();
    mostrarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

function mostrarCarrito() {
    let contenidoCarrito = document.getElementById('contenido-carrito');
    
    if (!contenidoCarrito) {
        crearModalCarrito();
        contenidoCarrito = document.getElementById('contenido-carrito');
    }
    
    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }
    
    let html = `
        <div class="carrito-header">
            <h3>🛒 Mi Carrito (${contadorCarrito} productos)</h3>
            <button onclick="vaciarCarrito()" class="btn-vaciar">Vaciar Carrito</button>
        </div>
        <div class="carrito-productos">
    `;
    
    carrito.forEach((producto, index) => {
        html += `
            <div class="carrito-item">
                <div class="item-info">
                    <h4>${producto.nombre}</h4>
                    <p class="precio">${producto.precio.toLocaleString()}</p>
                </div>
                <button onclick="eliminarDelCarrito(${index})" class="btn-eliminar">🗑️</button>
            </div>
        `;
    });
    
    const descuento = calcularDescuento();
    const totalConDescuento = totalCarrito - descuento;
    
    html += `
        </div>
        <div class="carrito-total">
            <div class="total-linea">
                <span>Subtotal:</span>
                <span>${totalCarrito.toLocaleString()}</span>
            </div>`;
    
    if (descuento > 0) {
        html += `
            <div class="total-linea descuento">
                <span>Descuento:</span>
                <span>-${descuento.toLocaleString()}</span>
            </div>`;
    }
    
    html += `
            <div class="total-linea total-final">
                <span><strong>Total:</strong></span>
                <span><strong>${totalConDescuento.toLocaleString()}</strong></span>
            </div>
            <button onclick="finalizarCompra()" class="btn-finalizar">Finalizar Compra</button>
        </div>
    `;
    
    contenidoCarrito.innerHTML = html;
}

function calcularDescuento() {
    let descuentoPorcentaje = 0;
    
    if (carrito.length >= 3) {
        descuentoPorcentaje = 15;
    } else if (totalCarrito > 100000) {
        descuentoPorcentaje = 10;
    } else if (carrito.length >= 2) {
        descuentoPorcentaje = 5;
    }
    
    return totalCarrito * (descuentoPorcentaje / 100);
}

function crearModalCarrito() {
    const modal = document.createElement('div');
    modal.id = 'modal-carrito';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
    `;
    
    modal.innerHTML = `
        <div class="modal-contenido" style="
            background-color: #ffffff;
            margin: 2% auto;
            padding: 30px;
            border-radius: 15px;
            width: 95%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <div class="modal-header" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                border-bottom: 2px solid #007bff;
                padding-bottom: 15px;
            ">
                <h2 style="color: #007bff; margin: 0;">🛒 Carrito de Compras</h2>
                <span class="cerrar-modal" onclick="cerrarCarrito()" style="
                    font-size: 32px;
                    font-weight: bold;
                    cursor: pointer;
                    color: #007bff;
                    transition: color 0.2s ease;
                ">&times;</span>
            </div>
            <div id="contenido-carrito"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function abrirCarrito() {
    mostrarCarrito();
    document.getElementById('modal-carrito').style.display = 'block';
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('No hay productos en el carrito', 'error');
        return;
    }
    
    const descuento = calcularDescuento();
    const totalFinal = totalCarrito - descuento;
    
    const resumenCompra = `
        <div class="resumen-compra">
            <h3>🎉 ¡Compra Exitosa!</h3>
            <p><strong>Productos:</strong> ${contadorCarrito}</p>
            <p><strong>Total:</strong> ${totalFinal.toLocaleString()}</p>
            <p>¡Gracias por tu compra en ${NOMBRE_TIENDA}!</p>
            <button onclick="cerrarCarrito(); vaciarCarrito();" class="btn-finalizar">Aceptar</button>
        </div>
    `;
    
    document.getElementById('contenido-carrito').innerHTML = resumenCompra;
    
    console.log('Compra finalizada:', {
        productos: carrito.length,
        total: totalFinal,
        descuento: descuento
    });
}

function conectarBotonesCarrito() {
    const botones = document.querySelectorAll('button[type="button"]');
    
    botones.forEach((boton, index) => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const producto = this.closest('.todos-equipajes');
            if (producto) {
                const nombreElemento = producto.querySelector('p');
                if (nombreElemento) {
                    const nombreProducto = nombreElemento.textContent.trim();
                    const productoEncontrado = PRODUCTOS_DISPONIBLES.find(p => 
                        p.nombre.toLowerCase().includes(nombreProducto.toLowerCase().substring(0, 10))
                    );
                    
                    if (productoEncontrado) {
                        agregarAlCarrito(productoEncontrado.id);
                    } else {
                        const precioAleatorio = [89990, 65990, 42990, 58990, 75990][Math.floor(Math.random() * 5)];
                        const productoGenerico = {
                            id: Date.now(),
                            nombre: nombreProducto,
                            precio: precioAleatorio,
                            categoria: "producto"
                        };
                        carrito.push(productoGenerico);
                        recalcularTotales();
                        actualizarContadorCarrito();
                        guardarCarritoEnStorage();
                        mostrarNotificacion(`${nombreProducto} agregado al carrito`);
                    }
                }
            }
        });
    });
}

function agregarContadorCarritoAlNav() {
    const nav = document.querySelector('header nav ul');
    if (nav && !document.getElementById('contador-carrito')) {
        const carritoLi = document.createElement('li');
        carritoLi.innerHTML = `
            <a href="#" id="contador-carrito" onclick="abrirCarrito(); return false;" style="
                background: linear-gradient(135deg, #007bff, #0056b3);
                color: white;
                padding: 10px 18px;
                border-radius: 25px;
                font-weight: bold;
                text-decoration: none;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(0,123,255,0.3);
                font-size: 16px;
            ">🛒 ${contadorCarrito}</a>
        `;
        nav.appendChild(carritoLi);
        
        const contador = carritoLi.querySelector('#contador-carrito');
        contador.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(0,123,255,0.5)';
        });
        
        contador.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0,123,255,0.3)';
        });
    }
}

function inicializarCarrito() {
    cargarCarritoDesdeStorage();
    conectarBotonesCarrito();
    agregarContadorCarritoAlNav();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .carrito-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s ease;
        }
        
        .carrito-item:hover {
            background-color: #f8f9fa;
        }
        
        .item-info h4 {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #333;
        }
        
        .item-info .precio {
            margin: 0;
            color: #28a745;
            font-weight: bold;
        }
        
        .btn-eliminar {
            background: #dc3545;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: bold;
        }
        
        .btn-eliminar:hover {
            background: #c82333;
            transform: scale(1.05);
        }
        
        .btn-vaciar {
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: all 0.2s ease;
        }
        
        .btn-vaciar:hover {
            background: #5a6268;
            transform: scale(1.05);
        }
        
        .btn-finalizar {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            width: 100%;
            margin-top: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,123,255,0.3);
        }
        
        .btn-finalizar:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,123,255,0.4);
        }
        
        .carrito-total {
            border-top: 3px solid #007bff;
            padding-top: 20px;
            margin-top: 20px;
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
        }
        
        .total-linea {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 16px;
        }
        
        .total-final {
            font-size: 22px;
            border-top: 2px solid #007bff;
            padding-top: 15px;
            margin-top: 15px;
            color: #007bff;
        }
        
        .descuento {
            color: #28a745;
            font-weight: bold;
        }
        
        .carrito-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            padding: 20px;
            border-radius: 10px;
        }
        
        .carrito-header h3 {
            margin: 0;
            font-size: 24px;
        }
        
        .carrito-productos {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .resumen-compra {
            text-align: center;
            padding: 30px;
        }
        
        .resumen-compra h3 {
            color: #28a745;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Sistema de carrito inicializado correctamente');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(`${NOMBRE_TIENDA} - Sistema de carrito cargado`);
    
    setTimeout(() => {
        inicializarCarrito();
    }, 500);
});

window.onclick = function(event) {
    const modal = document.getElementById('modal-carrito');
    if (event.target === modal) {
        cerrarCarrito();
    }
};