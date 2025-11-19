# 🧪 Ejemplos de Testing - CALIGO API

## Productos de Prueba para Postman/Thunder Client

### Producto 1: Valija Amayra Gris
```json
{
  "title": "Valija Gris amayra - Tamaño Grande",
  "description": "Valija rígida de gran tamaño con ruedas giratorias 360°",
  "code": "VAL001",
  "price": 89990,
  "stock": 10,
  "category": "equipajes",
  "thumbnails": ["/assets/img/Valija Amayra Gris.webp"]
}
```

### Producto 2: Carry on Tourister Negro
```json
{
  "title": "Carry on Tourister negro",
  "description": "Equipaje de cabina con compartimentos organizadores",
  "code": "CO001",
  "price": 65990,
  "stock": 15,
  "category": "carry-on",
  "thumbnails": ["/assets/img/Carry on Tourister Negro.webp"]
}
```

### Producto 3: Valija Discovery Celeste
```json
{
  "title": "Valija Discovery celeste",
  "description": "Valija expandible con cierre TSA incluido",
  "code": "VAL002",
  "price": 75990,
  "stock": 8,
  "category": "equipajes",
  "thumbnails": ["/assets/img/Valija Discovery Celeste.webp"]
}
```

### Producto 4: Mochila Discovery Negra
```json
{
  "title": "Mochila discovery Negra",
  "description": "Mochila urbana con compartimento para laptop",
  "code": "MOC001",
  "price": 42990,
  "stock": 20,
  "category": "mochilas",
  "thumbnails": ["/assets/img/Mochi Discovery Negra.webp"]
}
```

### Producto 5: Agenda Mooving Negra
```json
{
  "title": "Agenda Mooving Negra",
  "description": "Agenda diaria para organizar tus viajes",
  "code": "ACC001",
  "price": 15990,
  "stock": 30,
  "category": "agenda",
  "thumbnails": ["/assets/img/AGENDA MOOVING DIARIA NEGRA .jpg"]
}
```

### Producto 6: Candado TSA Azul
```json
{
  "title": "Candado Tsa azul",
  "description": "Candado de seguridad con combinación TSA",
  "code": "ACC002",
  "price": 8990,
  "stock": 50,
  "category": "candados",
  "thumbnails": ["/assets/img/Candado TSA azul.webp"]
}
```

---

## 📝 Secuencia de Testing Recomendada

### Paso 1: Verificar que el servidor esté funcionando
```
GET http://localhost:8080/
```
Debe retornar información sobre la API.

### Paso 2: Crear varios productos
Usar `POST http://localhost:8080/api/products` con cada uno de los productos de arriba.

### Paso 3: Listar todos los productos
```
GET http://localhost:8080/api/products
```

### Paso 4: Obtener un producto específico
```
GET http://localhost:8080/api/products/{id-del-producto}
```

### Paso 5: Actualizar un producto
```
PUT http://localhost:8080/api/products/{id-del-producto}
Body:
{
  "price": 79990,
  "stock": 5
}
```

### Paso 6: Crear un carrito
```
POST http://localhost:8080/api/carts
```
Guardar el ID del carrito que te devuelve.

### Paso 7: Agregar productos al carrito
```
POST http://localhost:8080/api/carts/{cart-id}/product/{product-id}
```
Ejecutar varias veces para ver cómo incrementa la cantidad.

### Paso 8: Ver el carrito
```
GET http://localhost:8080/api/carts/{cart-id}
```

### Paso 9: Eliminar un producto
```
DELETE http://localhost:8080/api/products/{id-del-producto}
```

### Paso 10: Verificar que se eliminó
```
GET http://localhost:8080/api/products
```

---

## ⚠️ Casos de Error para Probar

### 1. Crear producto sin campos requeridos
```json
{
  "title": "Producto Incompleto",
  "price": 50000
}
```
Debe retornar error 400.

### 2. Crear producto con código duplicado
Intentar crear dos productos con el mismo `code`.
Debe retornar error 400.

### 3. Obtener producto inexistente
```
GET http://localhost:8080/api/products/id-que-no-existe
```
Debe retornar error 404.

### 4. Actualizar producto inexistente
```
PUT http://localhost:8080/api/products/id-que-no-existe
```
Debe retornar error 400.

### 5. Agregar producto a carrito inexistente
```
POST http://localhost:8080/api/carts/id-inexistente/product/{product-id}
```
Debe retornar error 400.

---

## 💡 Tips para Testing

1. **Guardar IDs**: Cuando crees productos o carritos, guarda los IDs que te devuelve la API para usarlos en las siguientes peticiones.

2. **Revisar archivos JSON**: Puedes abrir los archivos `src/data/products.json` y `src/data/carts.json` para ver cómo se guardan los datos.

3. **Probar incremento de cantidad**: Agrega el mismo producto varias veces al carrito para verificar que incrementa la cantidad en lugar de duplicar el producto.

4. **Usar Postman Collections**: Puedes crear una colección en Postman con todos estos requests para testear rápidamente.
