function getCurrentDate() {
    const now = new Date();
    const date = now.toLocaleDateString("uk-UA");
    const time = now.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${date}, ${time}`;
}

let products = [{
    id: 1,
    name: "Samsung",
    price: 950,
    category: "Smartphones",
    image: "/javascript/lab6/task1/project_parts/img/samsung_23.webp",
    createdAt: new Date('2025-04-02'),
    updatedAt: getCurrentDate()
}, {
    id: 2,
    name: "Lenovo Legion 5",
    price: 1200,
    category: "Laptops",
    image: "/javascript/lab6/task1/project_parts/img/lenovo.jpg",
    createdAt: new Date('2025-04-01'),
    updatedAt: getCurrentDate()
}];

let modal = document.getElementById("myModal");
let editModal = document.getElementById("editModal");
let span = document.getElementsByClassName("close")[0];
let editSpan = document.getElementsByClassName("edit-close")[0];
const container = document.getElementById('productList');

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

function createProductCard(product) {
    const div = document.createElement('div');
    div.id = `product-${product.id}`;
    div.className = 'product-card';
    div.dataset.id = product.id;

    const createdAt = new Date(product.createdAt).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const updatedAt = new Date(product.updatedAt).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-id">ID: ${product.id}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">Total: $${product.price}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-created">Створено: ${createdAt}</div>
            <div class="product-updated">Оновлено: ${updatedAt}</div>    
             <div class="product-actions">
                <button class="edit-btn">Редагувати</button>
                <button class="delete-btn">Видалити</button>
            </div>
        </div>
    `;

    const editBtn = div.querySelector('.edit-btn');
    const deleteBtn = div.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        openEditProduct(product.id);
    });

    deleteBtn.addEventListener('click', () => {
        deleteProductWithAnimation(product.id);
    });

    return div;
}

function calculateTotalAmount(productsList) {
    return productsList.reduce((sum, product) => sum + product.price, 0);
}

function getSortedProducts(productsList, sortBy) {
    return [...productsList].sort((a, b) => {
        if (sortBy === "price") {
            return a.price - b.price;
        } else if (sortBy === "createdAt" || sortBy === "updatedAt") {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
        }
        return 0;
    });
}

function createNewProduct(name, price, category, image) {
    const now = new Date().toISOString();
    return {
        id: generateId(),
        name,
        price,
        category,
        image,
        createdAt: now,
        updatedAt: now
    };
}

function getUpdatedProduct(productsList, id, name, price, category, image) {
    const now = new Date().toISOString();
    return productsList.map(product => {
        if (product.id === id) {
            return { ...product, name, price, category, image, updatedAt: now };
        }
        return product;
    });
}

function getProductsWithoutDeleted(productsList, id) {
    return productsList.filter(product => product.id !== id);
}

function updateProductsState(newProducts) {
    products = newProducts;
    renderProductList(products);
    updateTotalAmountUI(calculateTotalAmount(products));
}

function renderProductList(productsList) {
    container.innerHTML = "";

    if (productsList.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = "Наразі список товарів пустий. Додайте новий товар.";
        container.appendChild(emptyMessage);
    } else {
        productsList.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }
}

function updateTotalAmountUI(total) {
    const totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = `Total: $${total}`;
}

function showValidationError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '10px';

    const form = document.querySelector('.modal-content:not([style*="none"])') ||
        document.querySelector('.edit-modal-content:not([style*="none"])');

    if (!form) return;

    const existingError = form.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }

    const firstFormElement = form.querySelector('.form-group');
    if (firstFormElement) {
        form.insertBefore(errorDiv, firstFormElement);
    }
}

function initializeApp() {
    renderProductList(products);
    updateTotalAmountUI(calculateTotalAmount(products));

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });

    document.querySelectorAll('.sort-btn').forEach(button => {
        button.addEventListener('click', () => {
            const sortBy = button.getAttribute('data-sort');
            sortProducts(sortBy);
        });
    });

    document.getElementById('resetSort').addEventListener('click', () => {
        resetSort();
    });

    // Налаштування обробників для модальних вікон
    span.onclick = function() {
        modal.style.display = "none";
    };

    editSpan.onclick = function() {
        editModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    };
}

function addProduct() {
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value.trim();
    const image = document.getElementById('image').value.trim();

    if (!name || isNaN(price) || !category || !image) {
        showValidationError('Please fill all fields correctly.');
        return;
    }

    const newProduct = createNewProduct(name, price, category, image);
    const newProducts = [...products, newProduct];

    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('image').value = '';

    updateProductsState(newProducts);
    modal.style.display = "none";
}

function updateProducts() {
    const id = parseInt(document.getElementById("editId").textContent);
    const name = document.getElementById('editName').value.trim();
    const price = parseFloat(document.getElementById('editPrice').value);
    const category = document.getElementById('editCategory').value.trim();
    const image = document.getElementById('editImage').value.trim();

    if (!name || isNaN(price) || !category || !image) {
        showValidationError('Please fill all fields correctly.');
        return;
    }

    const updatedProducts = getUpdatedProduct(products, id, name, price, category, image);
    updateProductsState(updatedProducts);
    editModal.style.display = "none";

    let editSnackbar = document.getElementById("edit-snackbar");
    editSnackbar.textContent = `Product (ID: ${id}, "${name}") was updated successfully`;
    editSnackbar.className = "show";

    setTimeout(() => {
        editSnackbar.className = editSnackbar.className.replace("show", "");
    }, 3000);
}

function deleteProductWithAnimation(productId) {
    const productCard = document.querySelector(`.product-card[data-id='${productId}']`);

    if (productCard) {
        productCard.classList.add('fade-out');
        setTimeout(() => {
            const newProducts = getProductsWithoutDeleted(products, productId);
            updateProductsState(newProducts);

            let deleteSnackbar = document.getElementById("delete-snackbar");
            deleteSnackbar.className = "show";

            setTimeout(() => {
                deleteSnackbar.className = deleteSnackbar.className.replace("show", "");
            }, 3000);
        }, 500);
    } else {
        const newProducts = getProductsWithoutDeleted(products, productId);
        updateProductsState(newProducts);
    }
}

function filterProducts(category) {
    document.querySelectorAll('.product-card').forEach(card => {
        const productCategory = card.querySelector('.product-category').textContent;

        if (category === "All" || productCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function sortProducts(sortBy) {
    const sortedProducts = getSortedProducts(products, sortBy);
    updateProductsState(sortedProducts);
}

function resetSort() {
    const resetProducts = [...products].sort((a, b) => a.id - b.id);
    updateProductsState(resetProducts);
}

function openProductCreation() {
    modal.style.display = "block";
}

function openEditProduct(productId) {
    const productToUpdate = products.find(product => product.id === productId);

    if (!productToUpdate) return;

    editModal.style.display = "block";

    document.getElementById('editId').textContent = productToUpdate.id;
    document.getElementById('editName').value = productToUpdate.name;
    document.getElementById('editPrice').value = productToUpdate.price;
    document.getElementById('editCategory').value = productToUpdate.category;
    document.getElementById('editImage').value = productToUpdate.image;
}

initializeApp();