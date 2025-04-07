const now = getCurrentDate();

//variables
let products = [{
    id: 1,
    name: "Samsung",
    price: 950,
    category: "Smartphones",
    image: "/javascript/lab6/task1/project_parts/img/samsung_23.webp",
    createdAt: new Date('2025-04-02'),
    updatedAt: now
}, {
    id: 2,
    name: "Lenovo Legion 5",
    price: 1200,
    category: "Laptops",
    image: "/javascript/lab6/task1/project_parts/img/lenovo.jpg",
    createdAt: new Date('2025-04-01'),
    updatedAt: now
}];

let modal = document.getElementById("myModal");

let editModal = document.getElementById("editModal")

let span = document.getElementsByClassName("close")[0];

let editSpan = document.getElementsByClassName("edit-close")[0];


const container = document.getElementById('productList');

const initializeApp = () => {
    container.innerHTML = "";

    if (products.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = "Наразі список товарів пустий. Додайте новий товар.";
        container.appendChild(emptyMessage);
    } else {
        products.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }

    updateTotalAmount();
}

function generateId(productsArray) {
    if (productsArray.length === 0) return 1;
    const maxId = Math.max(...productsArray.map(p => p.id));
    return maxId + 1;
}

function getCurrentDate() {
    const now = new Date();
    const date = now.toLocaleDateString("uk-UA");
    const time = now.toLocaleTimeString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${date}, ${time}`;
}

//add product
function addProduct() {
    const id = generateId();
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value.trim();
    const image = document.getElementById('image').value.trim();

    if (!name || isNaN(price) || !category || !image) {
        alert('Please fill all fields correctly.');
        return;

    }

    const newProduct = {
        id,
        name,
        price,
        category,
        image,
        createdAt: now,
        updatedAt: now
    };
    products.push(newProduct);

    initializeApp();

    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';

    document.getElementById('image').value = '';
    modal.style.display = "none";

}

const updateTotalAmount = () => {
    const totalAmount = document.getElementById("totalAmount")
    let total = products.reduce((sum, product) => sum + product.price, 0);

    totalAmount.textContent = `Total: $${total}`;
}

//update
function updateProducts() {
    const id = parseInt(document.getElementById("editId").textContent); // або innerText
    const name = document.getElementById('editName').value.trim();
    const price = parseFloat(document.getElementById('editPrice').value);
    const category = document.getElementById('editCategory').value.trim();
    const image = document.getElementById('editImage').value.trim();

    if (!name || isNaN(price) || !category || !image) {
        alert('Please fill all fields correctly.');
        return;
    }

    let updatedAt = null;
    let productUpdated = false;

    products = products.map(product => {
        if (product.id === id) {
            if (product.name !== name || product.price !== price || product.category !== category || product.image !== image) {
                updatedAt = new Date().toISOString();
                productUpdated = true;
            }

            return {
                ...product,
                name,
                price,
                category,
                image,
                updatedAt: updatedAt || product.updatedAt,
            };
        }
        return product;
    });

    const productCard = document.querySelector(`.product-card[data-id='${id}']`);
    if (productCard) {
        productCard.querySelector('.product-name').textContent = name;
        productCard.querySelector('.product-price').textContent = `Total: $${price}`;
        productCard.querySelector('.product-category').textContent = category;
        productCard.querySelector('.product-image').src = image;
    }
    if (productUpdated) {
        const updatedAtElement = productCard.querySelector('.product-updated');
        if (updatedAtElement) {
            updatedAtElement.textContent = `Оновлено: ${new Date(updatedAt).toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })}`;
        }
    }
    editModal.style.display = "none";

    updateTotalAmount();

    let editSnackbar = document.getElementById("edit-snackbar");
    editSnackbar.textContent = `Product {ID: ${id}, "${name}" was updated successfully`;

    editSnackbar.className = "show";

    setTimeout(function () {
        editSnackbar.className = editSnackbar.className.replace("show", "");
    }, 3000);
}

//delete
function deleteProductWithAnimation(productId) {
    const productToDelete = products.find(product => product.id === productId);
    if (!productToDelete) return null;

    const productCard = document.querySelector(`.product-card[data-id='${productId}']`);
    if (productCard) {
        productCard.classList.add('fade-out');

        setTimeout(() => {
            products = products.filter(product => product.id !== productId);
            container.innerHTML = "";
            initializeApp();

            let deleteSnackbar = document.getElementById("delete-snackbar");
            deleteSnackbar.className = "show";

            setTimeout(function () {
                deleteSnackbar.className = deleteSnackbar.className.replace("show", "");
            }, 3000);
        }, 500);
    } else {
        products = products.filter(product => product.id !== productId);
        container.innerHTML = "";
        initializeApp();
    }
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});

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

const createProductCard = (product) => {
    const div = document.createElement('div');
    div.id = `product-${product.id}`;

    div.className = 'product-card';
    div.dataset.id = product.id;
    div.textContent = product;

    let price = `Total: $${product.price}`;

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
            <div class="product-price">${price} </div>
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
};


function openProductCreation() {
    modal.style.display = "block";
}

function openEditProduct(productId) {
    editModal.style.display = "block";

    const productToUpdate = products.find(product => product.id === productId);

    if (!productToUpdate) return;

    document.getElementById('editId').textContent = productToUpdate.id;
    document.getElementById('editName').value = productToUpdate.name;
    document.getElementById('editPrice').value = productToUpdate.price;
    document.getElementById('editCategory').value = productToUpdate.category;
    document.getElementById('editImage').value = productToUpdate.image;
}

span.onclick = function () {
    modal.style.display = "none";
}

editSpan.onclick = function () {
    editModal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === editModal) {
        editModal.style.display = "none";
    }

}

initializeApp()

document.querySelectorAll('.sort-btn').forEach(button => {
    button.addEventListener('click', () => {
        const sortBy = button.getAttribute('data-sort');
        sortProducts(sortBy);
    });
});

document.getElementById('resetSort').addEventListener('click', () => {
    resetSort();
});

function sortProducts(sortBy) {
    products.sort((a, b) => {
        if (sortBy === "price") {
            return a.price - b.price;
        } else if (sortBy === "createdAt" || sortBy === "updatedAt") {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
        }
        return 0;
    });
    initializeApp();
}

function resetSort() {
    products.sort((a, b) => a.id - b.id);
    initializeApp();
}
