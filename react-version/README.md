# CALIGO - E-commerce de Equipaje y Accesorios de Viaje

E-commerce desarrollado con React, TypeScript y Firebase para la venta de valijas, mochilas y accesorios de viaje.

## Descripción del Proyecto

CALIGO es una aplicación web de comercio electrónico que permite a los usuarios navegar por un catálogo de productos de equipaje, agregar items al carrito de compras y realizar compras completas. El proyecto utiliza Firebase Firestore como base de datos para almacenar productos y órdenes de compra.

## Características Principales

- Navegación fluida tipo SPA (Single Page Application)
- Catálogo de productos dinámico cargado desde Firebase
- Sistema de carrito de compras con Context API
- Filtrado de productos por categorías
- Vista detallada de cada producto
- Selector de cantidad con validación de stock
- Proceso de checkout completo con formulario de datos
- Generación de órdenes de compra en Firebase
- Diseño responsive y moderno

## Tecnologías Utilizadas

- **React 19.1.1** - Librería principal
- **TypeScript 4.9.5** - Tipado estático
- **React Router Dom 6.30.1** - Navegación
- **Firebase 12.4.0** - Backend y base de datos (Firestore)
- **React Icons 5.5.0** - Íconos
- **CSS inline** - Estilos

## Estructura del Proyecto

```
react-version/
├── src/
│   ├── components/
│   │   ├── NavBar/
│   │   │   └── NavBar.tsx
│   │   ├── CartWidget/
│   │   │   └── CartWidget.jsx
│   │   ├── ItemListContainer/
│   │   │   └── ItemListContainer.tsx
│   │   ├── ItemList/
│   │   │   └── ItemList.tsx
│   │   ├── Item/
│   │   │   └── Item.tsx
│   │   ├── ItemDetailContainer/
│   │   │   └── ItemDetailContainer.tsx
│   │   ├── ItemDetail/
│   │   │   └── ItemDetail.tsx
│   │   ├── ItemCount/
│   │   │   └── ItemCount.tsx
│   │   ├── Cart/
│   │   │   ├── Cart.tsx
│   │   │   └── CartItem.tsx
│   │   └── CheckoutForm/
│   │       └── CheckoutForm.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── services/
│   │   ├── firebase.js
│   │   └── productService.js
│   ├── types/
│   │   └── product.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── README.md
```

## Componentes Principales

### NavBar
Barra de navegación principal con enlaces a diferentes secciones y CartWidget.

### ItemListContainer
Contenedor que muestra el listado de productos, con soporte para filtrado por categorías.

### ItemDetailContainer
Muestra el detalle completo de un producto individual con opción de agregar al carrito.

### ItemCount
Selector de cantidad con botones para incrementar/decrementar y validación de stock.

### Cart
Vista del carrito de compras con resumen de productos, cantidades y total.

### CheckoutForm
Formulario para capturar datos del comprador y finalizar la compra.

### CartContext
Context API que maneja el estado global del carrito de compras.

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd react-version
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar Firebase
- Crear un proyecto en Firebase Console
- Habilitar Firestore Database
- Crear una colección llamada "products"
- Copiar las credenciales de configuración
- Actualizar el archivo `src/services/firebase.js` con tus credenciales

4. Ejecutar la aplicación
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## Funcionalidades Detalladas

### Sistema de Productos
- Los productos se cargan dinámicamente desde Firestore
- Cada producto incluye: nombre, precio, imagen, categoría, descripción y stock
- Soporte para múltiples categorías: equipajes, carry-on, accesorios

### Carrito de Compras
- Agregar productos con cantidad seleccionada
- Modificar cantidades en el carrito
- Eliminar productos del carrito
- Vaciar carrito completo
- Persistencia del estado durante la sesión
- Cálculo automático de totales

### Proceso de Compra
- Formulario con validación de campos requeridos
- Validación de formato de email
- Generación de orden en Firestore con timestamp
- Visualización del ID de orden al finalizar
- Limpieza automática del carrito después de la compra

### Navegación
- Página principal con todos los productos
- Filtrado por categorías
- Vista detallada de productos
- Carrito de compras
- Checkout
- Página 404 para rutas no encontradas

## Estructura de Datos

### Producto (Firestore)
```javascript
{
  nombre: string,
  precio: number,
  imagen: string,
  categoria: string,
  descripcion: string,
  stock: number
}
```

### Orden de Compra (Firestore)
```javascript
{
  buyer: {
    nombre: string,
    email: string,
    telefono: string,
    direccion: string,
    ciudad: string,
    codigoPostal: string
  },
  items: [
    {
      id: string,
      nombre: string,
      precio: number,
      quantity: number
    }
  ],
  total: number,
  date: Timestamp
}
```

## Scripts Disponibles

### `npm start`
Inicia la aplicación en modo desarrollo.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.

### `npm test`
Ejecuta los tests configurados.

## Navegación del Sitio

- `/` - Página principal con todos los productos
- `/productos` - Listado completo de productos
- `/categoria/:categoryId` - Productos filtrados por categoría
- `/item/:id` - Detalle de un producto específico
- `/cart` - Carrito de compras
- `/checkout` - Formulario de finalización de compra

## Autor

Francisco Carreras

## Proyecto Final - CoderHouse

Este proyecto fue desarrollado como entrega final del curso de React JS en CoderHouse.

## Fecha de Entrega

Octubre 2025