const PRODUCTOS_CALIGO = [
    { id: 1, nombre: "Valija Amayra Gris", categoria: "equipajes", precio: 89990 },
    { id: 2, nombre: "Carry on Tourister Negro", categoria: "equipajes", precio: 65990 },
    { id: 3, nombre: "Valija Discovery Celeste", categoria: "equipajes", precio: 75990 },
    { id: 4, nombre: "Mochila Discovery Negra", categoria: "equipajes", precio: 42990 },
    { id: 5, nombre: "Agenda Mooving Negra", categoria: "accesorios", precio: 15990 },
    { id: 6, nombre: "Botella Contigo Celeste", categoria: "accesorios", precio: 25990 },
    { id: 7, nombre: "Candado TSA Azul", categoria: "accesorios", precio: 8990 },
    { id: 8, nombre: "Riñonera Chimola Gris", categoria: "accesorios", precio: 22990 }
];

const DESCUENTO_EFECTIVO = 0.10;
const DESCUENTO_CANTIDAD = 0.15;
const ENVIO_GRATIS_MINIMO = 80000;
const COSTO_ENVIO = 5000;

let carritoCompras = [];
let totalCompra = 0;

function mostrarCatalogo() {
    console.log("=== CATÁLOGO CALIGO ===");
    console.log("Productos disponibles:");
    
    for (let i = 0; i < PRODUCTOS_CALIGO.length; i++) {
        const producto = PRODUCTOS_CALIGO[i];
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio} (${producto.categoria})`);
    }
    
    console.log("========================");
}

function buscarProductoPorId(id) {
    for (let i = 0; i < PRODUCTOS_CALIGO.length; i++) {
        if (PRODUCTOS_CALIGO[i].id === id) {
            return PRODUCTOS_CALIGO[i];
        }
    }
    return null;
}

function agregarAlCarrito() {
    mostrarCatalogo();
    
    let continuar = true;
    
    while (continuar) {
        let idProducto = parseInt(prompt("Ingresa el ID del producto que deseas agregar al carrito (1-8):"));
        
        if (idProducto >= 1 && idProducto <= 8) {
            let producto = buscarProductoPorId(idProducto);
            
            if (producto) {
                let cantidad = parseInt(prompt(`¿Cuántas unidades de "${producto.nombre}" deseas agregar?`));
                
                if (cantidad > 0) {
                    let itemCarrito = {
                        producto: producto,
                        cantidad: cantidad,
                        subtotal: producto.precio * cantidad
                    };
                    
                    carritoCompras.push(itemCarrito);
                    alert(`Agregado: ${cantidad} x ${producto.nombre} - Subtotal: $${itemCarrito.subtotal}`);
                    console.log(`Producto agregado: ${cantidad} x ${producto.nombre}`);
                } else {
                    alert("La cantidad debe ser mayor a 0");
                }
            }
        } else {
            alert("ID de producto inválido. Debe ser entre 1 y 8");
        }
        
        continuar = confirm("¿Deseas agregar otro producto al carrito?");
    }
}

function mostrarCarrito() {
    if (carritoCompras.length === 0) {
        console.log("El carrito está vacío");
        alert("Tu carrito está vacío");
        return 0;
    }
    
    console.log("=== TU CARRITO ===");
    let total = 0;
    
    for (let i = 0; i < carritoCompras.length; i++) {
        const item = carritoCompras[i];
        console.log(`${item.cantidad} x ${item.producto.nombre} - $${item.subtotal}`);
        total += item.subtotal;
    }
    
    console.log(`Total sin descuentos: $${total}`);
    console.log("==================");
    
    return total;
}

function aplicarDescuentos(subtotal) {
    let descuentoAplicado = 0;
    let metodoPago = prompt("Selecciona método de pago:\n1. Efectivo (10% descuento)\n2. Tarjeta de crédito\nIngresa 1 o 2:");
    
    if (metodoPago === "1") {
        descuentoAplicado += DESCUENTO_EFECTIVO;
        console.log("Descuento por pago en efectivo: 10%");
    }
    
    let cantidadTotal = 0;
    for (let i = 0; i < carritoCompras.length; i++) {
        cantidadTotal += carritoCompras[i].cantidad;
    }
    
    if (cantidadTotal >= 3) {
        descuentoAplicado += DESCUENTO_CANTIDAD;
        console.log("Descuento por cantidad (3+ productos): 15%");
    }
    
    let montoDescuento = subtotal * descuentoAplicado;
    let totalConDescuento = subtotal - montoDescuento;
    
    console.log(`Descuento total aplicado: ${(descuentoAplicado * 100).toFixed(1)}% - $${montoDescuento}`);
    
    return {
        totalConDescuento: totalConDescuento,
        descuentoAplicado: montoDescuento,
        metodoPago: metodoPago === "1" ? "Efectivo" : "Tarjeta"
    };
}

function calcularEnvio(subtotal) {
    if (subtotal >= ENVIO_GRATIS_MINIMO) {
        console.log("¡Envío GRATIS por compra mayor a $80.000!");
        return 0;
    } else {
        console.log(`Costo de envío: $${COSTO_ENVIO}`);
        return COSTO_ENVIO;
    }
}

function procesarCompra() {
    if (carritoCompras.length === 0) {
        alert("No tienes productos en el carrito");
        return;
    }
    
    let subtotal = mostrarCarrito();
    let resultadoDescuentos = aplicarDescuentos(subtotal);
    let costoEnvio = calcularEnvio(resultadoDescuentos.totalConDescuento);
    let totalFinal = resultadoDescuentos.totalConDescuento + costoEnvio;
    
    console.log("=== RESUMEN DE COMPRA ===");
    console.log(`Subtotal: $${subtotal}`);
    console.log(`Descuentos: -$${resultadoDescuentos.descuentoAplicado}`);
    console.log(`Envío: $${costoEnvio}`);
    console.log(`TOTAL FINAL: $${totalFinal}`);
    console.log(`Método de pago: ${resultadoDescuentos.metodoPago}`);
    console.log("========================");
    
    let confirmarCompra = confirm(`Total a pagar: $${totalFinal}\nMétodo: ${resultadoDescuentos.metodoPago}\n¿Confirmas la compra?`);
    
    if (confirmarCompra) {
        alert(`¡Compra realizada con éxito!\nTotal: $${totalFinal}\nGracias por elegir CALIGO`);
        console.log("¡Compra confirmada! Gracias por elegir CALIGO");
        carritoCompras = [];
    } else {
        alert("Compra cancelada. Los productos siguen en tu carrito.");
        console.log("Compra cancelada");
    }
}

function mostrarMenu() {
    let opcion;
    
    do {
        opcion = prompt(`
=== SIMULADOR CALIGO ===
1. Ver catálogo
2. Agregar productos al carrito
3. Ver carrito
4. Procesar compra
5. Salir

Selecciona una opción (1-5):`);
        
        switch(opcion) {
            case "1":
                mostrarCatalogo();
                break;
            case "2":
                agregarAlCarrito();
                break;
            case "3":
                mostrarCarrito();
                break;
            case "4":
                procesarCompra();
                break;
            case "5":
                alert("¡Gracias por visitar CALIGO!");
                console.log("Sesión finalizada");
                break;
            default:
                if (opcion !== null) {
                    alert("Opción inválida. Selecciona entre 1 y 5");
                }
        }
    } while (opcion !== "5" && opcion !== null);
}

function iniciarSimulador() {
    console.log("=== BIENVENIDO AL SIMULADOR CALIGO ===");
    console.log("Tu tienda de equipajes y accesorios de viaje");
    console.log("Toda la interacción se realiza a través de cuadros de diálogo");
    console.log("Revisa la consola para ver los detalles de tu compra");
    
    alert("¡Bienvenido a CALIGO!\nTu tienda de equipajes y accesorios de viaje\n\nRevisa la consola para ver los detalles de productos y compra");
    
    mostrarMenu();
}

iniciarSimulador();