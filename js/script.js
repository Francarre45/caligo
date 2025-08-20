const NOMBRE_TIENDA = "CALIGO";
const DESCUENTO_EFECTIVO = 10;
const NUMERO_WHATSAPP = "1234567890";

let cantidadProductosCarrito = 0;
let totalCarrito = 0;
let nombreUsuario = "";

const categoriasProductos = ["Equipajes", "Accesorios", "Mochilas", "Carry-on"];
let productosEnCarrito = [];
const preciosProductos = [89990, 65990, 42990, 58990, 75990];

function guardarEnLocalStorage() {
    const datosCarrito = {
        productos: productosEnCarrito,
        cantidad: cantidadProductosCarrito,
        total: totalCarrito,
        usuario: nombreUsuario
    };
    
    localStorage.setItem('caligo-carrito', JSON.stringify(datosCarrito));
}

function cargarDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('caligo-carrito');
    
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        
        productosEnCarrito = datos.productos || [];
        cantidadProductosCarrito = datos.cantidad || 0;
        totalCarrito = datos.total || 0;
        nombreUsuario = datos.usuario || "";
        
        return true;
    }
    
    return false;
}

function limpiarLocalStorage() {
    productosEnCarrito = [];
    cantidadProductosCarrito = 0;
    totalCarrito = 0;
    
    guardarEnLocalStorage();
}

function verificarUsuarioExistente() {
    const hayDatos = cargarDesdeLocalStorage();
    
    if (hayDatos && nombreUsuario) {
        mostrarMensajeBienvenida();
        if (productosEnCarrito.length > 0) {
            mostrarResumenCarrito();
        }
        return true;
    }
    
    return false;
}

function agregarProductoAlCarrito(nombreProducto, precio) {
   productosEnCarrito.push({
       nombre: nombreProducto,
       precio: precio
   });
   
   cantidadProductosCarrito = cantidadProductosCarrito + 1;
   totalCarrito = totalCarrito + precio;
   
   guardarEnLocalStorage();
   
   return `¡${nombreProducto} agregado al carrito!`;
}

function calcularDescuento(precio) {
   const descuento = precio * (DESCUENTO_EFECTIVO / 100);
   const precioFinal = precio - descuento;
   
   return precioFinal;
}

function mostrarResumenCarrito() {
    let panelCarrito = document.getElementById('panel-carrito');
    
    if (!panelCarrito) {
        panelCarrito = document.createElement('div');
        panelCarrito.id = 'panel-carrito';
        panelCarrito.style.cssText = `
            position: fixed;
            top: 50%;
            right: -350px;
            transform: translateY(-50%);
            width: 320px;
            max-height: 500px;
            background: #fdf2d9;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 1500;
            font-family: 'Inconsolata', monospace;
            transition: right 0.3s ease;
            overflow-y: auto;
        `;
        document.body.appendChild(panelCarrito);
    }
    
    if (productosEnCarrito.length === 0) {
        panelCarrito.style.right = '-350px';
        return;
    }
    
    panelCarrito.style.right = '20px';
    
    panelCarrito.innerHTML = `
        <div style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #333; text-align: center;">🛒 Tu Carrito</h3>
            <p style="margin: 5px 0 0 0; text-align: center; color: #666; font-size: 14px;">${NOMBRE_TIENDA}</p>
        </div>
    `;
    
    const listaProductos = document.createElement('div');
    listaProductos.style.cssText = `
        margin-bottom: 20px;
        max-height: 200px;
        overflow-y: auto;
    `;
    
    productosEnCarrito.forEach((producto, index) => {
        const itemProducto = document.createElement('div');
        itemProducto.style.cssText = `
            background: #87c3bd;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 6px;
            border: 1px solid #333;
        `;
        
        itemProducto.innerHTML = `
            <div style="font-weight: bold; color: #333; margin-bottom: 5px; font-size: 14px;">
                ${index + 1}. ${producto.nombre}
            </div>
            <div style="color: #333; font-size: 16px; font-weight: bold;">
                $${producto.precio.toLocaleString()}
            </div>
        `;
        
        listaProductos.appendChild(itemProducto);
    });
    
    const resumen = document.createElement('div');
    resumen.style.cssText = `
        border-top: 2px solid #333;
        padding-top: 15px;
        text-align: center;
    `;
    
    resumen.innerHTML = `
        <div style="margin-bottom: 10px; color: #333;">
            <strong>Productos: ${cantidadProductosCarrito}</strong>
        </div>
        <div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px;">
            Total: $${totalCarrito.toLocaleString()}
        </div>
    `;
    
    const botonesContainer = document.createElement('div');
    botonesContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
    `;
    
    const botonFinalizarCompra = document.createElement('button');
    botonFinalizarCompra.textContent = '🚀 Finalizar Compra';
    botonFinalizarCompra.style.cssText = `
        background: #28a745;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
    `;
    
    botonFinalizarCompra.addEventListener('click', function() {
        crearFormularioCheckout();
    });
    
    const botonesSecundarios = document.createElement('div');
    botonesSecundarios.style.cssText = `
        display: flex;
        gap: 10px;
        width: 100%;
    `;
    
    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = '✕ Cerrar';
    botonCerrar.style.cssText = `
        background: #333;
        color: #fdf2d9;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-size: 12px;
        flex: 1;
    `;
    
    botonCerrar.addEventListener('click', function() {
        panelCarrito.style.right = '-350px';
    });
    
    const botonLimpiar = document.createElement('button');
    botonLimpiar.textContent = '🗑️ Vaciar';
    botonLimpiar.style.cssText = `
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-size: 12px;
        flex: 1;
    `;
    
    botonLimpiar.addEventListener('click', function() {
        limpiarLocalStorage();
        panelCarrito.style.right = '-350px';
    });
    
    botonesSecundarios.appendChild(botonCerrar);
    botonesSecundarios.appendChild(botonLimpiar);
    
    botonesContainer.appendChild(botonFinalizarCompra);
    botonesContainer.appendChild(botonesSecundarios);
    
    resumen.appendChild(botonesContainer);
    
    panelCarrito.appendChild(listaProductos);
    panelCarrito.appendChild(resumen);
}

function mostrarNotificacionProducto(nombreProducto) {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    notificacion.textContent = `✅ ${nombreProducto} agregado`;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                document.body.removeChild(notificacion);
            }
        }, 300);
    }, 2000);
}

function crearFormularioCheckout() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        overflow-y: auto;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #fdf2d9;
        padding: 30px;
        border-radius: 10px;
        border: 2px solid #333;
        max-width: 500px;
        width: 90%;
        font-family: 'Inconsolata', monospace;
        max-height: 90vh;
        overflow-y: auto;
        margin: 20px;
    `;

    const titulo = document.createElement('h2');
    titulo.textContent = '🛒 Finalizar Compra';
    titulo.style.cssText = `
        color: #333;
        margin-bottom: 20px;
        text-align: center;
        font-size: 24px;
    `;

    const resumenCompra = document.createElement('div');
    resumenCompra.style.cssText = `
        background: #87c3bd;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 25px;
        border: 1px solid #333;
    `;
    
    resumenCompra.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #333;">Resumen de tu compra:</h3>
        <p style="margin: 5px 0; color: #333;"><strong>Productos:</strong> ${cantidadProductosCarrito}</p>
        <p style="margin: 5px 0; color: #333; font-size: 18px;"><strong>Total: $${totalCarrito.toLocaleString()}</strong></p>
    `;

    const form = document.createElement('form');
    form.id = 'checkout-form';

    const campos = [
        { id: 'email', label: 'Email *', type: 'email', placeholder: 'tu@email.com' },
        { id: 'telefono', label: 'Teléfono *', type: 'tel', placeholder: '+54 9 11 1234-5678' },
        { id: 'direccion', label: 'Dirección *', type: 'text', placeholder: 'Av. Ejemplo 123' },
        { id: 'ciudad', label: 'Ciudad *', type: 'text', placeholder: 'Buenos Aires' },
        { id: 'codigoPostal', label: 'Código Postal *', type: 'text', placeholder: '1234' }
    ];

    campos.forEach(campo => {
        const contenedor = document.createElement('div');
        contenedor.style.marginBottom = '20px';

        const label = document.createElement('label');
        label.textContent = campo.label;
        label.style.cssText = `
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: bold;
            font-size: 14px;
        `;

        const input = document.createElement('input');
        input.type = campo.type;
        input.id = campo.id;
        input.placeholder = campo.placeholder;
        input.required = true;
        input.style.cssText = `
            width: 100%;
            padding: 12px;
            border: 2px solid #333;
            border-radius: 5px;
            font-family: 'Inconsolata', monospace;
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        `;

        input.addEventListener('focus', function() {
            this.style.borderColor = '#87c3bd';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#333';
        });

        contenedor.appendChild(label);
        contenedor.appendChild(input);
        form.appendChild(contenedor);
    });

    const metodoPagoContainer = document.createElement('div');
    metodoPagoContainer.style.marginBottom = '25px';

    const labelMetodo = document.createElement('label');
    labelMetodo.textContent = 'Método de Pago *';
    labelMetodo.style.cssText = `
        display: block;
        margin-bottom: 10px;
        color: #333;
        font-weight: bold;
        font-size: 14px;
    `;

    const metodosContainer = document.createElement('div');
    metodosContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;

    const metodos = [
        { id: 'efectivo', label: `💵 Efectivo (${DESCUENTO_EFECTIVO}% descuento)`, descuento: true },
        { id: 'tarjeta', label: '💳 Tarjeta de Crédito/Débito', descuento: false },
        { id: 'transferencia', label: '🏦 Transferencia Bancaria', descuento: false }
    ];

    metodos.forEach(metodo => {
        const radioContainer = document.createElement('div');
        radioContainer.style.cssText = `
            background: ${metodo.descuento ? '#e8f5e8' : '#f0f0f0'};
            padding: 12px;
            border-radius: 5px;
            border: 1px solid #333;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = metodo.id;
        radio.name = 'metodoPago';
        radio.value = metodo.id;
        radio.style.marginRight = '10px';

        const labelRadio = document.createElement('label');
        labelRadio.textContent = metodo.label;
        labelRadio.style.cssText = `
            cursor: pointer;
            color: #333;
            font-weight: ${metodo.descuento ? 'bold' : 'normal'};
        `;

        radioContainer.addEventListener('click', function() {
            radio.checked = true;
            actualizarTotalConDescuento();
        });

        radioContainer.appendChild(radio);
        radioContainer.appendChild(labelRadio);
        metodosContainer.appendChild(radioContainer);
    });

    const totalFinalDiv = document.createElement('div');
    totalFinalDiv.id = 'total-final';
    totalFinalDiv.style.cssText = `
        background: #87c3bd;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        border: 2px solid #333;
        text-align: center;
    `;
    totalFinalDiv.innerHTML = `
        <h3 style="margin: 0; color: #333;">Total a Pagar: $${totalCarrito.toLocaleString()}</h3>
    `;

    const botonesContainer = document.createElement('div');
    botonesContainer.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 25px;
    `;

    const botonCancelar = document.createElement('button');
    botonCancelar.type = 'button';
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.style.cssText = `
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        font-size: 14px;
    `;

    const botonConfirmar = document.createElement('button');
    botonConfirmar.type = 'submit';
    botonConfirmar.textContent = 'Confirmar Compra';
    botonConfirmar.style.cssText = `
        background: #28a745;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        font-size: 14px;
    `;

    botonCancelar.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        procesarCompra(form, overlay);
    });

    function actualizarTotalConDescuento() {
        const efectivoSeleccionado = document.getElementById('efectivo').checked;
        let totalFinal = totalCarrito;
        
        if (efectivoSeleccionado) {
            totalFinal = calcularDescuento(totalCarrito);
        }
        
        document.getElementById('total-final').innerHTML = `
            <h3 style="margin: 0; color: #333;">Total a Pagar: $${totalFinal.toLocaleString()}</h3>
            ${efectivoSeleccionado ? '<p style="margin: 5px 0 0 0; color: #28a745; font-weight: bold;">¡Descuento aplicado!</p>' : ''}
        `;
    }

    metodoPagoContainer.appendChild(labelMetodo);
    metodoPagoContainer.appendChild(metodosContainer);
    
    form.appendChild(metodoPagoContainer);
    form.appendChild(totalFinalDiv);

    botonesContainer.appendChild(botonCancelar);
    botonesContainer.appendChild(botonConfirmar);

    modal.appendChild(titulo);
    modal.appendChild(resumenCompra);
    modal.appendChild(form);
    modal.appendChild(botonesContainer);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    document.getElementById('email').focus();
}

function procesarCompra(form, overlay) {
    const datosCompra = {
        usuario: nombreUsuario,
        email: form.email.value,
        telefono: form.telefono.value,
        direccion: form.direccion.value,
        ciudad: form.ciudad.value,
        codigoPostal: form.codigoPostal.value,
        metodoPago: form.metodoPago.value,
        productos: [...productosEnCarrito],
        cantidad: cantidadProductosCarrito,
        total: totalCarrito,
        fecha: new Date().toLocaleString('es-AR')
    };

    if (datosCompra.metodoPago === 'efectivo') {
        datosCompra.totalFinal = calcularDescuento(totalCarrito);
        datosCompra.descuentoAplicado = totalCarrito - datosCompra.totalFinal;
    } else {
        datosCompra.totalFinal = totalCarrito;
        datosCompra.descuentoAplicado = 0;
    }

    guardarCompraEnHistorial(datosCompra);
    
    document.body.removeChild(overlay);
    
    mostrarConfirmacionCompra(datosCompra);
    
    limpiarLocalStorage();
    
    const panelCarrito = document.getElementById('panel-carrito');
    if (panelCarrito) {
        panelCarrito.style.right = '-350px';
    }
}

function guardarCompraEnHistorial(datosCompra) {
    let historial = JSON.parse(localStorage.getItem('caligo-historial') || '[]');
    historial.push(datosCompra);
    localStorage.setItem('caligo-historial', JSON.stringify(historial));
}

function mostrarConfirmacionCompra(datos) {
    const confirmacion = document.createElement('div');
    confirmacion.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fdf2d9;
        padding: 30px;
        border-radius: 10px;
        border: 2px solid #333;
        max-width: 400px;
        width: 90%;
        font-family: 'Inconsolata', monospace;
        text-align: center;
        z-index: 10001;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    `;

    confirmacion.innerHTML = `
        <h2 style="color: #28a745; margin-bottom: 20px;">🎉 ¡Compra Confirmada!</h2>
        <p style="margin: 10px 0; color: #333;"><strong>Gracias ${datos.usuario}</strong></p>
        <p style="margin: 10px 0; color: #333;">Tu pedido será enviado a:</p>
        <p style="margin: 10px 0; color: #333; font-weight: bold;">${datos.direccion}, ${datos.ciudad}</p>
        <p style="margin: 10px 0; color: #333;">Total pagado: <strong>$${datos.totalFinal.toLocaleString()}</strong></p>
        ${datos.descuentoAplicado > 0 ? `<p style="margin: 10px 0; color: #28a745;">Ahorro: $${datos.descuentoAplicado.toLocaleString()}</p>` : ''}
        <p style="margin: 20px 0 10px 0; color: #666; font-size: 12px;">Recibirás un email de confirmación</p>
    `;

    const botonCerrar = document.createElement('button');
    botonCerrar.textContent = 'Continuar Comprando';
    botonCerrar.style.cssText = `
        background: #87c3bd;
        color: #333;
        border: 2px solid #333;
        padding: 12px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        margin-top: 15px;
    `;

    botonCerrar.addEventListener('click', function() {
        document.body.removeChild(confirmacion);
    });

    confirmacion.appendChild(botonCerrar);
    document.body.appendChild(confirmacion);

    setTimeout(() => {
        if (confirmacion.parentNode) {
            document.body.removeChild(confirmacion);
        }
    }, 8000);
}

function mostrarCategorias() {
   
}

function aplicarDescuentosAutomaticos() {
   
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
   if (nombreUsuario && nombreUsuario !== "") {
       if (productosEnCarrito.length > 0) {
           mostrarResumenCarrito();
       } else {
           mostrarMensajeBienvenida();
       }
   } else {
       crearModalNombre();
   }
}

function mostrarProductosDestacados() {
   
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
       return;
   }
   
   const mensaje = agregarProductoAlCarrito(nombreProducto, precio);
   
   mostrarResumenCarrito();
}

function conectarBotonesCarrito() {
   const botones = document.querySelectorAll('button[type="button"]');
   
   botones.forEach((boton, index) => {
       boton.addEventListener('click', function() {
           const producto = this.closest('.todos-equipajes');
           if (producto) {
               const nombreElemento = producto.querySelector('p');
               const nombre = nombreElemento ? nombreElemento.textContent : "Producto";
               const precioAleatorio = preciosProductos[Math.floor(Math.random() * preciosProductos.length)];
               
               agregarProductoAlCarrito(nombre, precioAleatorio);
               mostrarNotificacionProducto(nombre);
               mostrarResumenCarrito();
           }
       });
   });
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
   `;
   
   botonInteractivo.addEventListener('click', function() {
       iniciarProcesoCompra();
   });
   
   document.body.appendChild(botonInteractivo);
}

function crearModalNombre() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #fdf2d9;
        padding: 40px;
        border-radius: 10px;
        border: 2px solid #333;
        text-align: center;
        max-width: 400px;
        width: 90%;
        font-family: 'Inconsolata', monospace;
    `;

    const titulo = document.createElement('h2');
    titulo.textContent = '👋 ¡Bienvenido a CALIGO!';
    titulo.style.cssText = `
        color: #333;
        margin-bottom: 20px;
        font-size: 24px;
    `;

    const subtitulo = document.createElement('p');
    subtitulo.textContent = '✈️ Tu próxima aventura comienza aquí';
    subtitulo.style.cssText = `
        color: #333;
        margin-bottom: 30px;
        font-size: 16px;
    `;

    const form = document.createElement('form');
    
    const label = document.createElement('label');
    label.textContent = '¿Cuál es tu nombre?';
    label.style.cssText = `
        display: block;
        margin-bottom: 10px;
        color: #333;
        font-weight: bold;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe tu nombre aquí';
    input.style.cssText = `
        width: 100%;
        padding: 12px;
        border: 2px solid #333;
        border-radius: 5px;
        margin-bottom: 20px;
        font-family: 'Inconsolata', monospace;
        font-size: 16px;
        box-sizing: border-box;
    `;

    const boton = document.createElement('button');
    boton.type = 'submit';
    boton.textContent = 'Continuar';
    boton.style.cssText = `
        background-color: #87c3bd;
        color: #333;
        border: 2px solid #333;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        font-size: 16px;
        transition: all 0.3s ease;
    `;

    boton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#333';
        this.style.color = '#fdf2d9';
    });

    boton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#87c3bd';
        this.style.color = '#333';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = input.value.trim();
        
        if (nombre === '') {
            nombreUsuario = 'Cliente';
        } else {
            nombreUsuario = nombre;
        }
        
        guardarEnLocalStorage();
        
        document.body.removeChild(overlay);
        mostrarMensajeBienvenida();
    });

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(boton);
    
    modal.appendChild(titulo);
    modal.appendChild(subtitulo);
    modal.appendChild(form);
    
    overlay.appendChild(modal);
    
    document.body.appendChild(overlay);
    
    input.focus();
}

function mostrarMensajeBienvenida() {
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #87c3bd;
        color: #333;
        padding: 15px 20px;
        border: 2px solid #333;
        border-radius: 8px;
        font-family: 'Inconsolata', monospace;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.5s ease;
    `;
    
    mensaje.textContent = `¡Hola ${nombreUsuario}! Bienvenido a CALIGO`;
    
    document.body.appendChild(mensaje);
    
    setTimeout(() => {
        if (mensaje.parentNode) {
            document.body.removeChild(mensaje);
        }
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
   conectarBotonesCarrito();
   agregarBotonCompraInteractiva();
   
   if (!verificarUsuarioExistente()) {
       crearModalNombre();
   }
});