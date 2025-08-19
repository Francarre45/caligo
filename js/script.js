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

function cargarProductosDesdeJSON() {
    todosLosProductos = [
        ...productosData.equipajes.map(producto => ({...producto, seccion: 'equipajes'})),
        ...productosData.accesorios.map(producto => ({...producto, seccion: 'accesorios'}))
    ];
    
    guardarEnStorage('productos', todosLosProductos);
    return todosLosProductos;
}

function guardarEnStorage(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
        
    }
}

function cargarDeStorage(clave) {
    try {
        const item = localStorage.getItem(clave);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        return null;
    }
}

function detectarPaginaActual() {
    const url = window.location.pathname;
    
    if (url.includes('equipajes.html')) {
        return 'equipajes';
    } else if (url.includes('accesorios.html')) {
        return 'accesorios';
    } else {
        return 'inicio';
    }
}

function filtrarProductosPorSeccion() {
    const paginaActual = detectarPaginaActual();
    const productosExistentes = document.querySelectorAll('.todos-equipajes');
    
    if (paginaActual === 'equipajes') {
        productosExistentes.forEach(producto => {
            const nombre = producto.querySelector('p').textContent.toLowerCase();
            const esEquipaje = nombre.includes('valija') || nombre.includes('carry') || nombre.includes('mochila');
            producto.style.display = esEquipaje ? 'block' : 'none';
        });
    } else if (paginaActual === 'accesorios') {
        productosExistentes.forEach(producto => {
            const nombre = producto.querySelector('p').textContent.toLowerCase();
            const esAccesorio = !nombre.includes('valija') && !nombre.includes('carry') && 
                              (nombre.includes('agenda') || nombre.includes('botella') || 
                               nombre.includes('candado') || nombre.includes('neceser') || 
                               nombre.includes('riñonera') || nombre.includes('perfumero'));
            producto.style.display = esAccesorio ? 'block' : 'none';
        });
    }
}

function configurarFiltrosInteractivos() {
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
            
            aplicarFiltroCategoria(categoria);
            actualizarFiltroActivo(this, enlacesFiltros);
            
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

function aplicarFiltroCategoria(categoria) {
    const productos = document.querySelectorAll('.todos-equipajes');
    
    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
        let mostrarProducto = false;
        
        switch(categoria) {
            case 'todos-equipajes':
            case 'todos-losaccesorios':
                mostrarProducto = true;
                break;
            case 'equipajes':
                mostrarProducto = nombreProducto.includes('valija') && 
                                !nombreProducto.includes('carry') && 
                                !nombreProducto.includes('mochila');
                break;
            case 'carry-on':
                mostrarProducto = nombreProducto.includes('carry');
                break;
            case 'mochilas':
                mostrarProducto = nombreProducto.includes('mochila');
                break;
            case 'agenda':
                mostrarProducto = nombreProducto.includes('agenda');
                break;
            case 'botellas':
                mostrarProducto = nombreProducto.includes('botella');
                break;
            case 'candados':
                mostrarProducto = nombreProducto.includes('candado');
                break;
            case 'riñonera':
                mostrarProducto = nombreProducto.includes('riñonera');
                break;
            case 'neceser':
                mostrarProducto = nombreProducto.includes('neceser');
                break;
            case 'perfumeros':
                mostrarProducto = nombreProducto.includes('perfumero');
                break;
            default:
                mostrarProducto = true;
        }
        
        producto.style.display = mostrarProducto ? 'block' : 'none';
    });
}

function actualizarFiltroActivo(enlaceActivo, todosLosEnlaces) {
    todosLosEnlaces.forEach(enlace => {
        enlace.classList.remove('filtro-activo');
    });
    enlaceActivo.classList.add('filtro-activo');
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
    
    guardarEnStorage('carrito', estadoCarrito);
    actualizarInterfazCarrito();
    mostrarNotificacionProductoAgregado(nombre);
    
    return nombre;
}

function mostrarNotificacionProductoAgregado(nombreProducto) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${nombreProducto} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
        toast: true
    });
}

function actualizarInterfazCarrito() {
    actualizarContadorCarrito();
    actualizarIconoCarrito();
}

function actualizarContadorCarrito() {
    let contador = document.querySelector('.contador-carrito');
    
    if (!contador && estadoCarrito.cantidad > 0) {
        contador = crearContadorCarrito();
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

function crearContadorCarrito() {
    const contador = document.createElement('div');
    contador.className = 'contador-carrito';
    contador.style.cssText = `
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
    `;
    
    contador.addEventListener('click', mostrarCarritoCompleto);
    contador.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    contador.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    return contador;
}

function actualizarIconoCarrito() {
    const iconoCarrito = document.querySelector('.carrito-icono');
    if (iconoCarrito && estadoCarrito.cantidad > 0) {
        iconoCarrito.textContent = `Carrito (${estadoCarrito.cantidad})`;
    }
}

function mostrarCarritoCompleto() {
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
    
    generarHTMLCarrito();
}

function generarHTMLCarrito() {
    let productosHTML = '';
    
    estadoCarrito.productos.forEach(producto => {
        productosHTML += `
            <div class="producto-carrito">
                <div class="info-producto">
                    <h4>${producto.nombre}</h4>
                    <p class="precio-unitario">$${producto.precio.toLocaleString()} c/u</p>
                </div>
                <div class="controles-cantidad">
                    <button onclick="cambiarCantidadProducto(${producto.id}, ${producto.cantidad - 1})" 
                            class="btn-cantidad btn-menos">-</button>
                    <span class="cantidad-display">${producto.cantidad}</span>
                    <button onclick="cambiarCantidadProducto(${producto.id}, ${producto.cantidad + 1})" 
                            class="btn-cantidad btn-mas">+</button>
                </div>
                <div class="subtotal-producto">
                    $${(producto.precio * producto.cantidad).toLocaleString()}
                </div>
                <button onclick="eliminarProductoDelCarrito(${producto.id})" 
                        class="btn-eliminar" title="Eliminar producto">🗑️</button>
            </div>
        `;
    });
    
    mostrarModalCarrito(productosHTML);
}

function mostrarModalCarrito(productosHTML) {
    Swal.fire({
        title: `🛒 Tu Carrito (${estadoCarrito.cantidad} productos)`,
        html: `
            <div class="carrito-modal">
                <div class="productos-carrito">
                    ${productosHTML}
                </div>
                <div class="resumen-carrito">
                    <div class="total-carrito">
                        <h3>Total: $${estadoCarrito.total.toLocaleString()}</h3>
                    </div>
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
        width: '800px',
        customClass: {
            popup: 'carrito-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            iniciarProcesoPago();
        } else if (result.isDenied) {
            confirmarVaciadoCarrito();
        }
    });
}

function cambiarCantidadProducto(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarProductoDelCarrito(id);
        return;
    }
    
    const producto = estadoCarrito.productos.find(p => p.id === id);
    
    if (producto) {
        const diferenciaCantidad = nuevaCantidad - producto.cantidad;
        estadoCarrito.cantidad += diferenciaCantidad;
        estadoCarrito.total += (producto.precio * diferenciaCantidad);
        producto.cantidad = nuevaCantidad;
        
        guardarEnStorage('carrito', estadoCarrito);
        actualizarInterfazCarrito();
        generarHTMLCarrito();
    }
}

function eliminarProductoDelCarrito(id) {
    const producto = estadoCarrito.productos.find(p => p.id === id);
    
    if (producto) {
        estadoCarrito.cantidad -= producto.cantidad;
        estadoCarrito.total -= (producto.precio * producto.cantidad);
        estadoCarrito.productos = estadoCarrito.productos.filter(p => p.id !== id);
        
        guardarEnStorage('carrito', estadoCarrito);
        actualizarInterfazCarrito();
        
        if (estadoCarrito.productos.length > 0) {
            generarHTMLCarrito();
        } else {
            Swal.close();
            Swal.fire({
                title: 'Producto eliminado',
                text: 'El carrito está ahora vacío',
                icon: 'info',
                timer: 1500,
                showConfirmButton: false
            });
        }
    }
}

function confirmarVaciadoCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se eliminarán todos los productos del carrito',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc3545'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarritoCompleto();
        } else {
            generarHTMLCarrito();
        }
    });
}

function vaciarCarritoCompleto() {
    estadoCarrito = {
        productos: [],
        cantidad: 0,
        total: 0
    };
    
    guardarEnStorage('carrito', estadoCarrito);
    actualizarInterfazCarrito();
    
    Swal.fire({
        title: 'Carrito vaciado',
        text: 'Todos los productos han sido eliminados',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

function iniciarProcesoPago() {
    mostrarFormularioDatosPersonales();
}

function mostrarFormularioDatosPersonales() {
    Swal.fire({
        title: 'Información Personal',
        html: `
            <div class="formulario-datos">
                <input id="input-nombre" class="swal2-input" placeholder="Nombre completo" 
                       value="${estadoUsuario.nombre}" required>
                <input id="input-email" class="swal2-input" placeholder="Email" type="email" required>
                <input id="input-telefono" class="swal2-input" placeholder="Teléfono" type="tel" required>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Volver al carrito',
        preConfirm: () => {
            const nombre = document.getElementById('input-nombre').value.trim();
            const email = document.getElementById('input-email').value.trim();
            const telefono = document.getElementById('input-telefono').value.trim();
            
            if (!nombre || !email || !telefono) {
                Swal.showValidationMessage('Por favor completa todos los campos');
                return false;
            }
            
            if (!validarEmail(email)) {
                Swal.showValidationMessage('Por favor ingresa un email válido');
                return false;
            }
            
            return { nombre, email, telefono };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            estadoUsuario.nombre = result.value.nombre;
            estadoUsuario.email = result.value.email;
            estadoUsuario.telefono = result.value.telefono;
            
            mostrarOpcionesMetodoPago();
        } else {
            generarHTMLCarrito();
        }
    });
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarOpcionesMetodoPago() {
    const precioConDescuento = calcularPrecioConDescuento(estadoCarrito.total);
    
    Swal.fire({
        title: 'Método de Pago',
        html: `
            <div class="metodos-pago">
                <div class="metodo-pago efectivo" data-metodo="efectivo">
                    <div class="icono-metodo">💵</div>
                    <h4>Efectivo</h4>
                    <p class="beneficio">Descuento del ${CONFIG.DESCUENTO_EFECTIVO}%</p>
                    <p class="precio-final descuento">$${precioConDescuento.toLocaleString()}</p>
                    <p class="precio-original">$${estadoCarrito.total.toLocaleString()}</p>
                </div>
                <div class="metodo-pago tarjeta" data-metodo="tarjeta">
                    <div class="icono-metodo">💳</div>
                    <h4>Tarjeta</h4>
                    <p class="beneficio">Hasta ${CONFIG.CUOTAS_SIN_INTERES} cuotas sin interés</p>
                    <p class="precio-final">$${estadoCarrito.total.toLocaleString()}</p>
                    <p class="cuotas">o ${CONFIG.CUOTAS_SIN_INTERES} cuotas de $${Math.round(estadoCarrito.total / CONFIG.CUOTAS_SIN_INTERES).toLocaleString()}</p>
                </div>
            </div>
        `,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: 'Volver',
        didOpen: () => {
            configurarSeleccionMetodoPago();
        }
    });
}

function configurarSeleccionMetodoPago() {
    const metodosPago = document.querySelectorAll('.metodo-pago');
    
    metodosPago.forEach(metodo => {
        metodo.addEventListener('click', function() {
            const tipoMetodo = this.getAttribute('data-metodo');
            estadoUsuario.metodoPago = tipoMetodo;
            estadoUsuario.descuentoAplicado = (tipoMetodo === 'efectivo');
            
            metodosPago.forEach(m => m.classList.remove('seleccionado'));
            this.classList.add('seleccionado');
            
            setTimeout(() => {
                Swal.close();
                mostrarResumenCompra();
            }, 300);
        });
        
        metodo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        metodo.addEventListener('mouseleave', function() {
            if (!this.classList.contains('seleccionado')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    });
}

function calcularPrecioConDescuento(precio) {
    return Math.round(precio * (1 - CONFIG.DESCUENTO_EFECTIVO / 100));
}

function mostrarResumenCompra() {
    const precioFinal = estadoUsuario.descuentoAplicado ? 
        calcularPrecioConDescuento(estadoCarrito.total) : 
        estadoCarrito.total;
    
    const metodoPagoTexto = estadoUsuario.metodoPago === 'efectivo' ? 
        `💵 Efectivo (${CONFIG.DESCUENTO_EFECTIVO}% descuento)` : 
        `💳 Tarjeta (hasta ${CONFIG.CUOTAS_SIN_INTERES} cuotas)`;
    
    let resumenHTML = generarHTMLResumenCompra(metodoPagoTexto, precioFinal);
    
    Swal.fire({
        title: '🛍️ Resumen de Compra',
        html: resumenHTML,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Pedido',
        cancelButtonText: 'Modificar',
        confirmButtonColor: '#28a745',
        width: '600px'
    }).then((result) => {
        if (result.isConfirmed) {
            procesarCompraFinal(precioFinal);
        } else {
            mostrarOpcionesMetodoPago();
        }
    });
}

function generarHTMLResumenCompra(metodoPagoTexto, precioFinal) {
    let productosResumen = '';
    estadoCarrito.productos.forEach(producto => {
        productosResumen += `
            <div class="item-resumen">
                <span class="producto-nombre">${producto.nombre}</span>
                <span class="producto-cantidad">x${producto.cantidad}</span>
                <span class="producto-subtotal">$${(producto.precio * producto.cantidad).toLocaleString()}</span>
            </div>
        `;
    });
    
    return `
        <div class="resumen-compra">
            <div class="datos-cliente">
                <h4>👤 ${estadoUsuario.nombre}</h4>
                <p>📧 ${estadoUsuario.email}</p>
                <p>📱 ${estadoUsuario.telefono}</p>
            </div>
            
            <div class="metodo-seleccionado">
                <h4>${metodoPagoTexto}</h4>
            </div>
            
            <hr class="separador">
            
            <div class="productos-resumen">
                <h4>📦 Productos:</h4>
                ${productosResumen}
            </div>
            
            <hr class="separador">
            
            <div class="total-final">
                <h3>💰 TOTAL: $${precioFinal.toLocaleString()}</h3>
            </div>
        </div>
    `;
}

function procesarCompraFinal(precioFinal) {
    const numeroOrden = generarNumeroOrden();
    
    guardarOrdenEnStorage(numeroOrden, precioFinal);
    
    Swal.fire({
        title: '🎉 ¡Compra Exitosa!',
        html: generarHTMLCompraExitosa(numeroOrden, precioFinal),
        icon: 'success',
        confirmButtonText: 'Continuar Comprando',
        confirmButtonColor: '#28a745',
        allowOutsideClick: false
    }).then(() => {
        finalizarCompraCompleta();
    });
}

function generarNumeroOrden() {
    const timestamp = Date.now().toString();
    return 'CAL' + timestamp.slice(-6);
}

function guardarOrdenEnStorage(numeroOrden, total) {
    const orden = {
        numero: numeroOrden,
        fecha: new Date().toISOString(),
        cliente: estadoUsuario,
        productos: [...estadoCarrito.productos],
        total: total,
        metodoPago: estadoUsuario.metodoPago
    };
    
    const ordenesAnteriores = cargarDeStorage('ordenes') || [];
    ordenesAnteriores.push(orden);
    guardarEnStorage('ordenes', ordenesAnteriores);
}

function generarHTMLCompraExitosa(numeroOrden, total) {
    return `
        <div class="compra-exitosa">
            <div class="numero-orden">
                <h3>📋 Orden: ${numeroOrden}</h3>
            </div>
            
            <div class="mensaje-gracias">
                <p>¡Gracias <strong>${estadoUsuario.nombre}</strong>!</p>
                <p>Tu pedido ha sido procesado correctamente</p>
            </div>
            
            <div class="total-pagado">
                <h4>💳 Total: $${total.toLocaleString()}</h4>
            </div>
            
            <div class="contacto-whatsapp">
                <a href="https://wa.me/${CONFIG.NUMERO_WHATSAPP}?text=Hola! Mi orden es ${numeroOrden}" 
                   target="_blank" class="btn-whatsapp">
                   📱 Contactar por WhatsApp
                </a>
            </div>
            
            <div class="info-seguimiento">
                <p><small>Recibirás un email con los detalles de seguimiento</small></p>
            </div>
        </div>
    `;
}

function finalizarCompraCompleta() {
    vaciarCarritoCompleto();
    reiniciarEstadoUsuario();
}

function reiniciarEstadoUsuario() {
    estadoUsuario = {
        nombre: "",
        metodoPago: "",
        descuentoAplicado: false
    };
}

function conectarBotonesCarritoExistentes() {
    const botonesAgregar = document.querySelectorAll('button[type="button"]');
    
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            const productoContenedor = this.closest('.todos-equipajes');
            
            if (productoContenedor) {
                const datosProducto = extraerDatosProducto(productoContenedor, index);
                
                if (datosProducto) {
                    const nombreProducto = agregarProductoAlCarrito(
                        datosProducto.id, 
                        datosProducto.nombre, 
                        datosProducto.precio
                    );
                    
                    aplicarEfectoBotonAgregado(this);
                }
            }
        });
    });
}

function extraerDatosProducto(contenedor, index) {
    const nombreElemento = contenedor.querySelector('p');
    const nombre = nombreElemento ? nombreElemento.textContent.trim() : "Producto sin nombre";
    
    const precioElemento = contenedor.querySelector('strong');
    let precio = 0;
    
    if (precioElemento) {
        const precioTexto = precioElemento.parentNode.textContent;
        const precioMatch = precioTexto.match(/\$([0-9.,]+)/);
        if (precioMatch) {
            precio = parseInt(precioMatch[1].replace(/[.,]/g, ''));
        }
    }
    
    if (precio === 0) {
        const preciosReferencia = [89990, 65990, 42990, 58990, 75990, 15990, 25990, 8990, 32990, 18990, 12990];
        precio = preciosReferencia[index % preciosReferencia.length];
    }
    
    const id = generarIdProducto(nombre, index);
    
    return {
        id: id,
        nombre: nombre,
        precio: precio
    };
}

function generarIdProducto(nombre, index) {
    const nombreLimpio = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    return parseInt(nombreLimpio.slice(0, 3).padEnd(3, '0') + index.toString().padStart(2, '0'));
}

function aplicarEfectoBotonAgregado(boton) {
    const colorOriginal = boton.style.backgroundColor;
    const textoOriginal = boton.textContent;
    
    boton.style.backgroundColor = '#28a745';
    boton.style.color = 'white';
    boton.textContent = '¡Agregado! ✓';
    boton.disabled = true;
    
    setTimeout(() => {
        boton.style.backgroundColor = colorOriginal;
        boton.style.color = '';
        boton.textContent = textoOriginal;
        boton.disabled = false;
    }, 2000);
}

function crearBotonCompraRapida() {
    const botonCompraRapida = document.createElement('button');
    botonCompraRapida.innerHTML = '🛒 Compra Rápida';
    botonCompraRapida.className = 'boton-compra-rapida';
    botonCompraRapida.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #007bff, #0056b3);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
        transition: all 0.3s ease;
        font-size: 16px;
    `;
    
    botonCompraRapida.addEventListener('click', mostrarProductosDestacados);
    botonCompraRapida.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
        this.style.boxShadow = '0 6px 25px rgba(0, 123, 255, 0.4)';
    });
    botonCompraRapida.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(0, 123, 255, 0.3)';
    });
    
    document.body.appendChild(botonCompraRapida);
}

function mostrarProductosDestacados() {
    const productosDestacados = [
        { nombre: "Valija Amayra Gris", precio: 89990, id: 1001 },
        { nombre: "Carry-on Tourister Negro", precio: 65990, id: 1002 },
        { nombre: "Mochila Discovery Negra", precio: 42990, id: 1003 }
    ];
    
    let productosHTML = '';
    productosDestacados.forEach(producto => {
        productosHTML += `
            <div class="producto-destacado" data-id="${producto.id}">
                <div class="producto-destacado-contenido">
                    <h4>${producto.nombre}</h4>
                    <p class="precio-destacado">${producto.precio.toLocaleString()}</p>
                    <button onclick="agregarDestacadoRapido(${producto.id}, '${producto.nombre}', ${producto.precio})" 
                            class="btn-agregar-destacado">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
    });
    
    Swal.fire({
        title: '🌟 Productos Destacados',
        html: `
            <div class="productos-destacados-grid">
                ${productosHTML}
            </div>
            <div class="mensaje-destacados">
                <p>✨ Los productos más populares de CALIGO</p>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        width: '700px',
        customClass: {
            popup: 'productos-destacados-popup'
        }
    });
}

function agregarDestacadoRapido(id, nombre, precio) {
    agregarProductoAlCarrito(id, nombre, precio);
    
    const boton = document.querySelector(`[onclick="agregarDestacadoRapido(${id}, '${nombre}', ${precio})"]`);
    if (boton) {
        boton.style.backgroundColor = '#28a745';
        boton.textContent = '¡Agregado!';
        boton.disabled = true;
        
        setTimeout(() => {
            boton.style.backgroundColor = '';
            boton.textContent = 'Agregar al carrito';
            boton.disabled = false;
        }, 1500);
    }
}

function inicializarSistemaCompleto() {
    cargarCarritoDesdeStorage();
    cargarProductosDesdeJSON();
    filtrarProductosPorSeccion();
    configurarFiltrosInteractivos();
    conectarBotonesCarritoExistentes();
    crearBotonCompraRapida();
    cargarSweetAlert2();
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = cargarDeStorage('carrito');
    if (carritoGuardado) {
        estadoCarrito = carritoGuardado;
        actualizarInterfazCarrito();
    }
}

function cargarSweetAlert2() {
    if (typeof Swal === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.js';
        script.onload = function() {
            cargarEstilosSweetAlert2();
        };
        document.head.appendChild(script);
    } else {
        cargarEstilosSweetAlert2();
    }
}

function cargarEstilosSweetAlert2() {
    if (!document.querySelector('link[href*="sweetalert2"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.10.1/sweetalert2.min.css';
        document.head.appendChild(link);
    }
}

function aplicarEstilosPersonalizados() {
    const estilos = document.createElement('style');
    estilos.textContent = `
        .menu-lateral a.filtro-activo {
            background-color: #007bff !important;
            color: white !important;
            font-weight: bold;
            transform: translateX(8px);
            box-shadow: 0 4px 15px rgba(0,123,255,0.3);
            border-radius: 5px;
            padding: 8px 15px;
        }
        
        .menu-lateral a {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: block;
            padding: 8px 15px;
            margin: 5px 0;
            border-radius: 5px;
            text-decoration: none;
        }
        
        .menu-lateral a:hover {
            transform: translateX(5px);
            color: #007bff;
            background-color: rgba(0, 123, 255, 0.1);
        }
        
        .contador-carrito {
            animation: pulseCarrito 2s ease-in-out infinite;
        }
        
        @keyframes pulseCarrito {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .carrito-modal .producto-carrito {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;
            transition: background-color 0.2s ease;
        }
        
        .carrito-modal .producto-carrito:hover {
            background-color: #f8f9fa;
        }
        
        .carrito-modal .info-producto h4 {
            margin: 0 0 5px 0;
            font-size: 16px;
            color: #333;
        }
        
        .carrito-modal .precio-unitario {
            margin: 0;
            color: #666;
            font-size: 14px;
        }
        
        .carrito-modal .controles-cantidad {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .carrito-modal .btn-cantidad {
            background: #007bff;
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .carrito-modal .btn-cantidad:hover {
            background: #0056b3;
            transform: scale(1.1);
        }
        
        .carrito-modal .cantidad-display {
            font-weight: bold;
            min-width: 25px;
            text-align: center;
            font-size: 16px;
        }
        
        .carrito-modal .subtotal-producto {
            font-weight: bold;
            color: #28a745;
            font-size: 16px;
        }
        
        .carrito-modal .btn-eliminar {
            background: #dc3545;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .carrito-modal .btn-eliminar:hover {
            background: #c82333;
            transform: scale(1.05);
        }
        
        .carrito-modal .total-carrito {
            text-align: center;
            padding: 20px;
            border-top: 3px solid #007bff;
            margin-top: 20px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        
        .metodos-pago {
            display: flex;
            gap: 25px;
            justify-content: center;
            margin: 20px 0;
        }
        
        .metodo-pago {
            border: 2px solid #ddd;
            padding: 25px;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-align: center;
            min-width: 220px;
            background: white;
            position: relative;
            overflow: hidden;
        }
        
        .metodo-pago::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .metodo-pago:hover::before {
            left: 100%;
        }
        
        .metodo-pago:hover {
            border-color: #007bff;
            background: linear-gradient(135deg, #f8f9fa, white);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 123, 255, 0.2);
        }
        
        .metodo-pago.seleccionado {
            border-color: #28a745;
            background: linear-gradient(135deg, #d4edda, #f8f9fa);
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
        }
        
        .metodo-pago .icono-metodo {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .metodo-pago h4 {
            margin: 10px 0;
            color: #333;
            font-size: 1.3em;
        }
        
        .metodo-pago .beneficio {
            color: #666;
            margin: 8px 0;
            font-weight: 500;
        }
        
        .metodo-pago .precio-final {
            font-weight: bold;
            font-size: 1.4em;
            margin: 10px 0;
        }
        
        .metodo-pago .precio-final.descuento {
            color: #28a745;
        }
        
        .metodo-pago .precio-original {
            text-decoration: line-through;
            color: #999;
            font-size: 0.9em;
        }
        
        .metodo-pago .cuotas {
            color: #007bff;
            font-size: 0.95em;
            font-weight: 500;
        }
        
        .resumen-compra {
            text-align: left;
            max-width: 500px;
            margin: 0 auto;
        }
        
        .resumen-compra .datos-cliente {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        
        .resumen-compra .datos-cliente h4 {
            margin: 0 0 8px 0;
            color: #007bff;
        }
        
        .resumen-compra .datos-cliente p {
            margin: 4px 0;
            color: #666;
        }
        
        .resumen-compra .metodo-seleccionado {
            background: #e7f3ff;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .resumen-compra .metodo-seleccionado h4 {
            margin: 0;
            color: #007bff;
        }
        
        .separador {
            border: none;
            height: 1px;
            background: linear-gradient(to right, transparent, #ddd, transparent);
            margin: 20px 0;
        }
        
        .productos-resumen {
            margin: 15px 0;
        }
        
        .productos-resumen h4 {
            margin: 0 0 15px 0;
            color: #333;
        }
        
        .item-resumen {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .item-resumen:last-child {
            border-bottom: none;
        }
        
        .producto-nombre {
            flex: 1;
            font-weight: 500;
        }
        
        .producto-cantidad {
            margin: 0 15px;
            color: #666;
            font-weight: bold;
        }
        
        .producto-subtotal {
            font-weight: bold;
            color: #28a745;
        }
        
        .total-final {
            text-align: center;
            font-size: 1.4em;
            color: #28a745;
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #d4edda, #c3e6cb);
            border-radius: 10px;
        }
        
        .compra-exitosa {
            text-align: center;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .compra-exitosa .numero-orden {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .compra-exitosa .numero-orden h3 {
            margin: 0;
            color: #007bff;
            font-size: 1.3em;
        }
        
        .compra-exitosa .mensaje-gracias p {
            margin: 8px 0;
            font-size: 1.1em;
        }
        
        .compra-exitosa .total-pagado {
            background: #d4edda;
            padding: 12px;
            border-radius: 8px;
            margin: 15px 0;
        }
        
        .compra-exitosa .total-pagado h4 {
            margin: 0;
            color: #28a745;
        }
        
        .btn-whatsapp {
            display: inline-block;
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s ease;
            margin: 15px 0;
        }
        
        .btn-whatsapp:hover {
            background: linear-gradient(135deg, #128c7e, #075e54);
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }
        
        .info-seguimiento {
            color: #666;
            font-style: italic;
            margin-top: 15px;
        }
        
        .productos-destacados-grid {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin: 20px 0;
        }
        
        .producto-destacado {
            border: 2px solid #ddd;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
            min-width: 200px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: white;
            cursor: pointer;
        }
        
        .producto-destacado:hover {
            border-color: #007bff;
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0, 123, 255, 0.2);
        }
        
        .producto-destacado h4 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 1.1em;
        }
        
        .precio-destacado {
            color: #28a745;
            font-weight: bold;
            font-size: 1.3em;
            margin: 12px 0;
        }
        
        .btn-agregar-destacado {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .btn-agregar-destacado:hover {
            background: linear-gradient(135deg, #0056b3, #004085);
            transform: scale(1.05);
        }
        
        .btn-agregar-destacado:disabled {
            background: #28a745;
            cursor: not-allowed;
        }
        
        .mensaje-destacados {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-style: italic;
        }
        
        .formulario-datos {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .swal2-input {
            margin: 10px 0 !important;
            padding: 12px !important;
            border-radius: 8px !important;
            border: 2px solid #ddd !important;
            transition: border-color 0.3s ease !important;
        }
        
        .swal2-input:focus {
            border-color: #007bff !important;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1) !important;
        }
        
        @media (max-width: 768px) {
            .metodos-pago {
                flex-direction: column;
                align-items: center;
            }
            
            .metodo-pago {
                min-width: 280px;
            }
            
            .productos-destacados-grid {
                flex-direction: column;
                align-items: center;
            }
            
            .contador-carrito {
                top: 10px;
                right: 10px;
                padding: 8px 12px;
                font-size: 14px;
            }
            
            .boton-compra-rapida {
                bottom: 10px;
                right: 10px;
                padding: 12px 20px;
                font-size: 14px;
            }
        }
    `;
    
    document.head.appendChild(estilos);
}

document.addEventListener('DOMContentLoaded', function() {
    aplicarEstilosPersonalizados();
    inicializarSistemaCompleto();
});

window.cambiarCantidadProducto = cambiarCantidadProducto;
window.eliminarProductoDelCarrito = eliminarProductoDelCarrito;
window.agregarDestacadoRapido = agregarDestacadoRapido;