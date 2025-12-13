const socket = io();

const addProductForm = document.getElementById('addProductForm');
const productsContainer = document.getElementById('productsContainer');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        status: true
    };

    socket.emit('addProduct', product);
    addProductForm.reset();
});

productsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.getAttribute('data-id');
        socket.emit('deleteProduct', productId);
    }
});

socket.on('updateProducts', (products) => {
    renderProducts(products);
});

socket.on('productError', (error) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
    });
});

function renderProducts(products) {
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No hay productos disponibles en este momento.</p>';
        return;
    }

    productsContainer.innerHTML = products.map(product => `
        <article class="product-card" data-id="${product.id}">
            <h3>${product.title}</h3>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Código:</strong> ${product.code}</p>
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock} unidades</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Estado:</strong> ${product.status ? 'Disponible' : 'No disponible'}</p>
            <button class="delete-btn" data-id="${product.id}">Eliminar</button>
        </article>
    `).join('');
}