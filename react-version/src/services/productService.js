const mockProducts = {
  "equipajes": [
    {
      "id": 1,
      "nombre": "Valija Gris amayra - Tamaño Grande",
      "precio": 89990,
      "imagen": "/assets/img/Valija Amayra Gris.webp",
      "categoria": "equipajes",
      "descripcion": "Valija rígida de gran tamaño con ruedas giratorias 360°"
    },
    {
      "id": 2,
      "nombre": "Carry on Tourister negro",
      "precio": 65990,
      "imagen": "/assets/img/Carry on Tourister Negro.webp",
      "categoria": "carry-on",
      "descripcion": "Equipaje de cabina con compartimentos organizadores"
    },
    {
      "id": 3,
      "nombre": "Valija Discovery celeste",
      "precio": 75990,
      "imagen": "/assets/img/Valija Discovery Celeste.webp",
      "categoria": "equipajes",
      "descripcion": "Valija expandible con cierre TSA incluido"
    },
    {
      "id": 4,
      "nombre": "Carry on Wanderlust gris",
      "precio": 58990,
      "imagen": "/assets/img/Carry on Wanderlust Gris.webp",
      "categoria": "carry-on",
      "descripcion": "Maleta de cabina ultraliviana para viajes frecuentes"
    },
    {
      "id": 5,
      "nombre": "Valija check in hard negra",
      "precio": 95990,
      "imagen": "/assets/img/Valija chek in hard negra.webp",
      "categoria": "equipajes",
      "descripcion": "Valija de gran resistencia para viajes largos"
    },
    {
      "id": 6,
      "nombre": "Mochila discovery Negra",
      "precio": 42990,
      "imagen": "/assets/img/Mochi Discovery Negra.webp",
      "categoria": "mochilas",
      "descripcion": "Mochila urbana con compartimento para laptop"
    }
  ],
  "accesorios": [
    {
      "id": 7,
      "nombre": "Agenda Mooving Negra",
      "precio": 15990,
      "imagen": "/assets/img/AGENDA MOOVING DIARIA NEGRA .jpg",
      "categoria": "agenda",
      "descripcion": "Agenda diaria para organizar tus viajes"
    },
    {
      "id": 8,
      "nombre": "Botella contigo Celeste",
      "precio": 25990,
      "imagen": "/assets/img/Botella Contigo Celeste.webp",
      "categoria": "botellas",
      "descripcion": "Botella térmica para mantener temperatura"
    },
    {
      "id": 9,
      "nombre": "Candado Tsa azul",
      "precio": 8990,
      "imagen": "/assets/img/Candado TSA azul.webp",
      "categoria": "candados",
      "descripcion": "Candado de seguridad con combinación TSA"
    },
    {
      "id": 10,
      "nombre": "Neceser xtreme Voyager gris",
      "precio": 32990,
      "imagen": "/assets/img/Neceser Xtreme Voyager gris.webp",
      "categoria": "neceser",
      "descripcion": "Organizador de artículos de higiene personal"
    },
    {
      "id": 11,
      "nombre": "Riñonera Chimola Gris",
      "precio": 18990,
      "imagen": "/assets/img/RIÑONERA CHIMOLA GRIS.webp",
      "categoria": "riñonera",
      "descripcion": "Riñonera práctica para llevar documentos"
    },
    {
      "id": 12,
      "nombre": "Perfumeros",
      "precio": 12990,
      "imagen": "/assets/img/perfumeros.webp",
      "categoria": "perfumeros",
      "descripcion": "Set de frascos para perfumes de viaje"
    }
  ]
};

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtener todos los productos
export const getProducts = async () => {
  await delay(1000); // Simula 1 segundo de carga
  const allProducts = [...mockProducts.equipajes, ...mockProducts.accesorios];
  return Promise.resolve(allProducts);
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  await delay(800);
  
  let filteredProducts = [];
  
  switch(categoryId.toLowerCase()) {
    case 'equipajes':
      filteredProducts = mockProducts.equipajes.filter(product => 
        product.categoria === 'equipajes' || product.categoria === 'carry-on' || product.categoria === 'mochilas'
      );
      break;
    case 'accesorios':
      filteredProducts = mockProducts.accesorios;
      break;
    case 'ofertas':
      // Simular productos en oferta (los más baratos)
      const allProducts = [...mockProducts.equipajes, ...mockProducts.accesorios];
      filteredProducts = allProducts.filter(product => product.precio < 20000);
      break;
    default:
      filteredProducts = [...mockProducts.equipajes, ...mockProducts.accesorios];
  }
  
  return Promise.resolve(filteredProducts);
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  await delay(500);
  const allProducts = [...mockProducts.equipajes, ...mockProducts.accesorios];
  const product = allProducts.find(item => item.id === parseInt(id));
  
  if (product) {
    return Promise.resolve(product);
  } else {
    return Promise.reject(new Error(`Producto con ID ${id} no encontrado`));
  }
};

// Obtener categorías disponibles
export const getCategories = async () => {
  await delay(300);
  return Promise.resolve([
    { id: 'equipajes', name: 'Equipajes' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'ofertas', name: 'Ofertas' }
  ]);
};