# 🛍️ CALIGO Backend - E-commerce API

Backend para el e-commerce CALIGO, sistema de gestión de productos y carritos de compra.

## 📋 Descripción

API REST desarrollada con Node.js y Express que proporciona endpoints para gestionar productos y carritos de compra. Utiliza persistencia en archivos JSON.

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd caligo-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor**
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
caligo-backend/
├── src/
│   ├── managers/
│   │   ├── ProductManager.js    # Gestor de productos
│   │   └── CartManager.js       # Gestor de carritos
│   ├── routes/
│   │   ├── products.router.js   # Rutas de productos
│   │   └── carts.router.js      # Rutas de carritos
│   ├── data/
│   │   ├── products.json        # Persistencia de productos
│   │   └── carts.json          # Persistencia de carritos
│   └── app.js                   # Servidor principal
├── package.json
├── .gitignore
└── README.md
```

## 🛣️ Endpoints

### Productos (`/api/products`)

#### `GET /api/products`
Obtiene todos los productos.

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": [
    {
      "id": "uuid",
      "title": "Valija Gris amayra",
      "description": "Valija rígida de gran tamaño",
      "code": "VAL001",
      "price": 89990,
      "status": true,
      "stock": 10,
      "category": "equipajes",
      "thumbnails": []
    }
  ]
}
```

#### `GET /api/products/:pid`
Obtiene un producto por su ID.

**Parámetros:**
- `pid` (URL): ID del producto

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": {
    "id": "uuid",
    "title": "Valija Gris amayra",
    "description": "Valija rígida de gran tamaño",
    "code": "VAL001",
    "price": 89990,
    "status": true,
    "stock": 10,
    "category": "equipajes",
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
  "title": "Valija Gris amayra",
  "description": "Valija rígida de gran tamaño con ruedas giratorias 360°",
  "code": "VAL001",
  "price": 89990,
  "status": true,
  "stock": 10,
  "category": "equipajes",
  "thumbnails": ["/img/valija1.jpg"]
}
```

**Campos requeridos:**
- `title` (String)
- `description` (String)
- `code` (String) - Debe ser único
- `price` (Number)
- `stock` (Number)
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
    "id": "uuid-generado",
    "title": "Valija Gris amayra",
    "description": "Valija rígida de gran tamaño con ruedas giratorias 360°",
    "code": "VAL001",
    "price": 89990,
    "status": true,
    "stock": 10,
    "category": "equipajes",
    "thumbnails": ["/img/valija1.jpg"]
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
  "price": 79990,
  "stock": 15
}
```

**Nota:** No se puede actualizar el campo `id`.

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto actualizado exitosamente",
  "payload": {
    "id": "uuid",
    "title": "Valija Gris amayra",
    "price": 79990,
    "stock": 15,
    ...
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
    "id": "uuid",
    "title": "Valija Gris amayra",
    ...
  }
}
```

---

### Carritos (`/api/carts`)

#### `POST /api/carts`
Crea un nuevo carrito vacío.

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Carrito creado exitosamente",
  "payload": {
    "id": "uuid-generado",
    "products": []
  }
}
```

#### `GET /api/carts/:cid`
Obtiene los productos de un carrito.

**Parámetros:**
- `cid` (URL): ID del carrito

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "payload": {
    "id": "uuid",
    "products": [
      {
        "product": "product-uuid-1",
        "quantity": 2
      },
      {
        "product": "product-uuid-2",
        "quantity": 1
      }
    ]
  }
}
```

**Error (404):**
```json
{
  "status": "error",
  "message": "Carrito con ID \"xxx\" no encontrado"
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
    "id": "cart-uuid",
    "products": [
      {
        "product": "product-uuid",
        "quantity": 3
      }
    ]
  }
}
```

---

## 🧪 Ejemplos de Uso con Postman/Thunder Client

### 1. Crear un producto
```
POST http://localhost:8080/api/products
Content-Type: application/json

{
  "title": "Valija Amayra Gris Grande",
  "description": "Valija rígida de gran tamaño con ruedas giratorias 360°",
  "code": "VAL001",
  "price": 89990,
  "stock": 10,
  "category": "equipajes",
  "thumbnails": ["/assets/img/Valija Amayra Gris.webp"]
}
```

### 2. Obtener todos los productos
```
GET http://localhost:8080/api/products
```

### 3. Crear un carrito
```
POST http://localhost:8080/api/carts
```

### 4. Agregar producto al carrito
```
POST http://localhost:8080/api/carts/{cart-id}/product/{product-id}
```

### 5. Ver carrito
```
GET http://localhost:8080/api/carts/{cart-id}
```

---

## 🔧 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **UUID** - Generación de IDs únicos
- **File System (fs)** - Persistencia en JSON

---

## 📝 Notas Importantes

1. **IDs autogenerados**: Todos los IDs (productos y carritos) se generan automáticamente usando UUID.

2. **Persistencia**: Los datos se guardan en archivos JSON en la carpeta `src/data/`:
   - `products.json` - Almacena productos
   - `carts.json` - Almacena carritos

3. **Validaciones**:
   - El campo `code` debe ser único para cada producto
   - Todos los campos requeridos deben estar presentes al crear un producto
   - No se puede actualizar el campo `id` de un producto

4. **Códigos de estado HTTP**:
   - `200` - Operación exitosa
   - `201` - Recurso creado exitosamente
   - `400` - Error en la petición (datos inválidos)
   - `404` - Recurso no encontrado
   - `500` - Error interno del servidor

---

## 👤 Autor

**CALIGO Team**

---

## 📄 Licencia

ISC
