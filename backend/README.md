# 🛍️ CALIGO Backend - E-commerce API

Backend para el e-commerce CALIGO, sistema de gestión de productos y carritos de compra con MongoDB.

## 📋 Descripción

API REST desarrollada con Node.js, Express y MongoDB que proporciona endpoints para gestionar productos y carritos de compra. Incluye paginación, filtros, ordenamiento y vistas dinámicas con Handlebars.

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar MongoDB Atlas**
   - El proyecto está configurado para conectarse a MongoDB Atlas
   - La cadena de conexión está en `src/config/db.config.js`
   - Base de datos: `caligo`

4. **Iniciar el servidor**
```bash
npm start
```

Para desarrollo con auto-reload:
```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:8080`

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── db.config.js         # Configuración MongoDB
│   ├── models/
│   │   ├── Product.model.js     # Modelo de producto
│   │   └── Cart.model.js        # Modelo de carrito
│   ├── managers/
│   │   ├── ProductManager.js    # Gestor de productos
│   │   └── CartManager.js       # Gestor de carritos
│   ├── routes/
│   │   ├── products.router.js   # Rutas de productos
│   │   ├── carts.router.js      # Rutas de carritos
│   │   └── views.router.js      # Rutas de vistas
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   ├── home.handlebars
│   │   ├── products.handlebars
│   │   ├── productDetail.handlebars
│   │   ├── cart.handlebars
│   │   └── realTimeProducts.handlebars
│   ├── public/
│   │   ├── css/
│   │   └── js/
│   └── app.js                   # Servidor principal
├── package.json
└── README.md
```

## 🛣️ Endpoints de la API

### Productos (`/api/products`)

#### `GET /api/products`
Obtiene productos con paginación, filtros y ordenamiento.

**Query Parameters:**
- `limit` (Number, opcional) - Cantidad de productos por página. Default: 10
- `page` (Number, opcional) - Número de página. Default: 1
- `sort` (String, opcional) - Ordenamiento por precio: `asc` o `desc`
- `query` (String, opcional) - Filtro de búsqueda:
  - `category:nombre` - Filtra por categoría
  - `status:true/false` - Filtra por disponibilidad
  - Texto libre - Busca en título o categoría

**Ejemplos:**
```
GET /api/products
GET /api/products?limit=5&page=2
GET /api/products?sort=asc
GET /api/products?query=category:MOCHILAS
GET /api/products?query=status:true
GET /api/products?limit=10&page=1&sort=desc&query=category:Accesorios
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "696557182cdd4e56e75a7b1e",
      "title": "Cartera de Viaje",
      "description": "Cartera compacta para documentos de viaje",
      "code": "CAR001",
      "price": 2500,
      "status": true,
      "stock": 20,
      "category": "Accesorios",
      "thumbnails": [],
      "createdAt": "2026-01-12T18:32:948Z",
      "updatedAt": "2026-01-12T18:32:948Z"
    }
  ],
  "totalPages": 1,
  "prevPage": null,
  "nextPage": null,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevLink": null,
  "nextLink": null
}
```

#### `GET /api/products/:pid`
Obtiene un producto por su ID.

**Parámetros:**
- `pid` (URL): ID del producto (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": {
    "_id": "696557182cdd4e56e75a7b1e",
    "title": "Cartera de Viaje",
    "description": "Cartera compacta para documentos de viaje",
    "code": "CAR001",
    "price": 2500,
    "status": true,
    "stock": 20,
    "category": "Accesorios",
    "thumbnails": []
  }
}
```

**Error (404):**
```json
{
  "status": "error",
  "message": "Producto con ID \"xxx\" no encontrado"
}
```

#### `POST /api/products`
Crea un nuevo producto.

**Body (JSON):**
```json
{
  "title": "Mochila de Viaje",
  "description": "Mochila espaciosa ideal para viajes largos",
  "code": "MOC001",
  "price": 5500,
  "stock": 15,
  "category": "Mochilas",
  "thumbnails": ["/img/mochila1.jpg"]
}
```

**Campos requeridos:**
- `title` (String)
- `description` (String)
- `code` (String) - Debe ser único
- `price` (Number) - Mayor o igual a 0
- `stock` (Number) - Mayor o igual a 0
- `category` (String)

**Campos opcionales:**
- `status` (Boolean) - Default: true
- `thumbnails` (Array) - Default: []

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Producto creado exitosamente",
  "payload": {
    "_id": "696557182cdd4e56e75a7b1e",
    "title": "Mochila de Viaje",
    "description": "Mochila espaciosa ideal para viajes largos",
    "code": "MOC001",
    "price": 5500,
    "status": true,
    "stock": 15,
    "category": "Mochilas",
    "thumbnails": ["/img/mochila1.jpg"],
    "createdAt": "2026-01-12T18:32:948Z",
    "updatedAt": "2026-01-12T18:32:948Z"
  }
}
```

#### `PUT /api/products/:pid`
Actualiza un producto existente.

**Parámetros:**
- `pid` (URL): ID del producto

**Body (JSON):** (Enviar solo los campos a actualizar)
```json
{
  "price": 4999,
  "stock": 20
}
```

**Nota:** No se puede actualizar el campo `_id`.

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto actualizado exitosamente",
  "payload": {
    "_id": "696557182cdd4e56e75a7b1e",
    "title": "Mochila de Viaje",
    "price": 4999,
    "stock": 20
  }
}
```

#### `DELETE /api/products/:pid`
Elimina un producto.

**Parámetros:**
- `pid` (URL): ID del producto

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto eliminado exitosamente",
  "payload": {
    "_id": "696557182cdd4e56e75a7b1e",
    "title": "Mochila de Viaje"
  }
}
```

### Carritos (`/api/carts`)

#### `POST /api/carts`
Crea un nuevo carrito vacío.

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Carrito creado exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": [],
    "createdAt": "2026-01-12T11:25:840Z",
    "updatedAt": "2026-01-12T11:25:840Z"
  }
}
```

#### `GET /api/carts/:cid`
Obtiene los productos de un carrito con información completa (populate).

**Parámetros:**
- `cid` (URL): ID del carrito

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": [
      {
        "product": {
          "_id": "696557182cdd4e56e75a7b1e",
          "title": "Cartera de Viaje",
          "description": "Cartera compacta para documentos de viaje",
          "code": "CAR001",
          "price": 2500,
          "status": true,
          "stock": 20,
          "category": "Accesorios",
          "thumbnails": []
        },
        "quantity": 1,
        "_id": "69655a2e4055c3b8e547319a"
      }
    ],
    "createdAt": "2026-01-12T11:25:840Z",
    "updatedAt": "2026-01-12T18:35:582Z"
  }
}
```

#### `POST /api/carts/:cid/product/:pid`
Agrega un producto al carrito.

**Parámetros:**
- `cid` (URL): ID del carrito
- `pid` (URL): ID del producto

**Comportamiento:**
- Si el producto **no existe** en el carrito: lo agrega con `quantity: 1`
- Si el producto **ya existe**: incrementa la cantidad en 1

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto agregado al carrito exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": [
      {
        "product": {
          "_id": "696557182cdd4e56e75a7b1e",
          "title": "Cartera de Viaje"
        },
        "quantity": 2
      }
    ]
  }
}
```

#### `DELETE /api/carts/:cid/products/:pid`
Elimina un producto específico del carrito.

**Parámetros:**
- `cid` (URL): ID del carrito
- `pid` (URL): ID del producto

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto eliminado del carrito exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": []
  }
}
```

#### `PUT /api/carts/:cid`
Actualiza todo el carrito con un array de productos.

**Parámetros:**
- `cid` (URL): ID del carrito

**Body (JSON):**
```json
{
  "products": [
    {
      "product": "696557182cdd4e56e75a7b1e",
      "quantity": 3
    },
    {
      "product": "69655240963450ef4608586b",
      "quantity": 1
    }
  ]
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Carrito actualizado exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": []
  }
}
```

#### `PUT /api/carts/:cid/products/:pid`
Actualiza solo la cantidad de un producto específico en el carrito.

**Parámetros:**
- `cid` (URL): ID del carrito
- `pid` (URL): ID del producto

**Body (JSON):**
```json
{
  "quantity": 5
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Cantidad actualizada exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": [
      {
        "product": {},
        "quantity": 5
      }
    ]
  }
}
```

#### `DELETE /api/carts/:cid`
Elimina todos los productos del carrito (vaciar carrito).

**Parámetros:**
- `cid` (URL): ID del carrito

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Carrito vaciado exitosamente",
  "payload": {
    "_id": "6965556d4055c3b8e547318f",
    "products": []
  }
}
```

## 🖥️ Vistas (Frontend)

### `/products`
Vista principal de productos con paginación.
- Muestra productos en tarjetas
- Botón "Ver Detalle" para cada producto
- Botón "Agregar al Carrito" directo
- Paginación con enlaces a páginas anterior/siguiente

### `/products/:pid`
Vista de detalle de un producto individual.
- Información completa del producto
- Precio destacado
- Stock disponible
- Botón para agregar al carrito

### `/carts/:cid`
Vista del carrito de compras.
- Lista de productos con información completa (populate)
- Cantidad de cada producto
- Subtotal por producto
- Total del carrito
- Botones para eliminar productos
- Botón para vaciar carrito

### `/home`
Vista home con lista de productos.

### `/realtimeproducts`
Vista de productos con actualización en tiempo real mediante Socket.io.
- Formulario para agregar productos
- Lista actualizada automáticamente
- Botón para eliminar productos

## 🧪 Ejemplos de Uso con Thunder Client/Postman

### 1. Crear un producto
```
POST http://localhost:8080/api/products
Content-Type: application/json

{
  "title": "Mochila Deportiva",
  "description": "Mochila ideal para gimnasio y deportes",
  "code": "MOC002",
  "price": 3500,
  "stock": 25,
  "category": "Mochilas"
}
```

### 2. Obtener productos con paginación y filtros
```
GET http://localhost:8080/api/products?limit=5&page=1&sort=desc&query=category:Mochilas
```

### 3. Crear un carrito
```
POST http://localhost:8080/api/carts
```

### 4. Agregar producto al carrito
```
POST http://localhost:8080/api/carts/6965556d4055c3b8e547318f/product/696557182cdd4e56e75a7b1e
```

### 5. Actualizar cantidad de producto en carrito
```
PUT http://localhost:8080/api/carts/6965556d4055c3b8e547318f/products/696557182cdd4e56e75a7b1e
Content-Type: application/json

{
  "quantity": 3
}
```

### 6. Ver carrito con productos completos
```
GET http://localhost:8080/api/carts/6965556d4055c3b8e547318f
```

### 7. Vaciar carrito
```
DELETE http://localhost:8080/api/carts/6965556d4055c3b8e547318f
```

## 🔧 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB Atlas** - Base de datos en la nube
- **Mongoose** - ODM para MongoDB
- **mongoose-paginate-v2** - Plugin de paginación
- **Socket.io** - Comunicación en tiempo real
- **Handlebars** - Motor de plantillas
- **UUID** - Generación de IDs (legacy)

## ✨ Características Implementadas

- ✅ CRUD completo de productos
- ✅ CRUD completo de carritos
- ✅ Paginación de productos
- ✅ Filtros por categoría y disponibilidad
- ✅ Ordenamiento ascendente/descendente por precio
- ✅ Populate de productos en carritos (relación MongoDB)
- ✅ Vistas dinámicas con Handlebars
- ✅ Actualización en tiempo real con Socket.io
- ✅ Persistencia en MongoDB Atlas
- ✅ Validaciones de datos
- ✅ Manejo de errores
- ✅ Estructura modular y escalable

## 📝 Notas Importantes

1. **Base de Datos**: El proyecto utiliza MongoDB Atlas. La conexión está configurada en `src/config/db.config.js`.

2. **IDs de MongoDB**: Todos los IDs son ObjectId de MongoDB (24 caracteres hexadecimales).

3. **Populate**: El endpoint `GET /api/carts/:cid` utiliza populate para traer la información completa de los productos, no solo sus IDs.

4. **Paginación**: La respuesta incluye metadata útil como `totalPages`, `hasNextPage`, `prevLink`, `nextLink`, etc.

5. **Validaciones**:
   - El campo `code` debe ser único
   - Todos los campos requeridos deben estar presentes
   - Los precios y stocks deben ser mayores o iguales a 0

6. **Códigos de estado HTTP**:
   - `200` - Operación exitosa
   - `201` - Recurso creado exitosamente
   - `400` - Error en la petición (datos inválidos)
   - `404` - Recurso no encontrado
   - `500` - Error interno del servidor

## 👤 Autor

**Francisco Carre - CALIGO**

## 📄 Licencia

ISC
