let storage = new Map();
storage.set(1, {name: "Iphone", price: 1200, amountInStorage: 10});
storage.set(2, {name: "Samsung", price: 1000, amountInStorage: 6});
storage.set(3, {name: "Huawei", price: 580, amountInStorage: 3});

console.log(storage);

let orders = new Set();
let productHistory = new WeakMap();
let userOrders = new WeakSet();
let uniqueUsers = new Set(); // Додатковий Set для збереження користувачів


populateTable(storage)

function populateTable(map , selector = "#productTable tbody") {
    const tableBody = document.querySelector(selector);
    tableBody.innerHTML = '';

    map.forEach((value, key) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = key;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = value.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = value.price;
        row.appendChild(priceCell);

        const amountCell = document.createElement("td");
        amountCell.textContent = value.amountInStorage;
        row.appendChild(amountCell);

        tableBody.appendChild(row);
    });
}

function addItem() {
    let name = document.getElementById("add-name");
    let price = document.getElementById("add-price");
    let amount = document.getElementById("add-amount");

    storage.set(storage.size + 1, {name: name.value, price: price.value, amountInStorage: amount.value})

    console.log(name.textContent)

    populateTable(storage)

    name.value = "";
    price.value = "";
    amount.value = "";
}

function removeItem() {
    let itemId = document.getElementById("remove-id");

    if (storage.has(parseInt(itemId.value))) {
        storage.delete(parseInt(itemId.value))
        populateTable(storage)
        itemId.value = ""
    }
}

function editItem() {
    let itemId = document.getElementById("edit-id");
    let name = document.getElementById("edit-name");
    let price = document.getElementById("edit-price");
    let amount = document.getElementById("edit-amount");

    if (storage.has(parseInt(itemId.value))) {

        let itemToEdit = storage.get(parseInt(itemId.value))

        name.value = itemToEdit.name;
        price.value = itemToEdit.price;
        amount.value = itemToEdit.amountInStorage;
    }
}

function saveItem() {
    let itemId = document.getElementById("edit-id");
    let name = document.getElementById("edit-name");
    let price = document.getElementById("edit-price");
    let amount = document.getElementById("edit-amount");

    storage.delete(parseInt(itemId.value))
    storage.set(parseInt(itemId.value), {name: name.value, price: price.value, amountInStorage: amount.value})


    storage = new Map([...storage.entries()].sort((a, b) => a[0] - b[0]));
    populateTable(storage)
}


function searchItem() {
    let searchQuery = document.getElementById("search-name");
    let searchResult = searchByName(searchQuery.value);
    if (searchResult) {
        populateTable(searchResult, "#searchTable tbody")
    }
}

function searchByName(searchName) {
    let resultMap = new Map();

    for (let [id, product] of storage) {
        if (product.name.toLowerCase().includes(searchName.toLowerCase())) {
            resultMap.set(id, product);
        }
    }

    return resultMap;
}


function makeOrder() {
    let productId = parseInt(document.getElementById("order-id").value);
    let quantity = parseInt(document.getElementById("order-amount").value);

    if (!storage.has(productId)) {
        alert("Продукт не знайдено!");
        return;
    }

    let product = storage.get(productId);
    if (product.amountInStorage < quantity) {
        alert("Недостатньо товару на складі!");
        return;
    }

    // Імітація користувача
    let user = { name: "User" + Math.floor(Math.random() * 1000) };
    userOrders.add(user); // Додаємо користувача в WeakSet
    uniqueUsers.add(user.name); // Зберігаємо ім'я користувача в Set

    product.amountInStorage -= quantity;
    orders.add({ user, productId, quantity });

    // Оновлення історії продукту
    if (!productHistory.has(product)) {
        productHistory.set(product, []);
    }
    productHistory.get(product).push({ user, quantity, date: new Date() });

    populateTable(storage);
    updateOrdersTable();
    console.log(`Замовлення користувача ${user.name}: ${quantity} x ${product.name}`);
}

// Функція для виведення історії покупок товару
function showProductHistory(productId) {
    const historyContainer = document.getElementById("product-history");
    historyContainer.innerHTML = ""; // Очищуємо перед виводом

    if (!storage.has(productId)) {
        historyContainer.innerHTML = "<p>Товар не знайдено.</p>";
        return;
    }

    let product = storage.get(productId);
    let history = productHistory.get(product) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = `<p>Немає історії замовлень для ${product.name}.</p>`;
        return;
    }

    let html = `<h3>Історія замовлень для ${product.name}:</h3><ul>`;
    history.forEach((order, index) => {
        html += `<li>${index + 1}) ${order.user.name} замовив ${order.quantity} шт. ${order.date.toLocaleString()}</li>`;
    });
    html += "</ul>";

    historyContainer.innerHTML = html;
}

function showUserOrders() {
    const usersContainer = document.getElementById("user-orders");
    usersContainer.innerHTML = ""; // Очищуємо перед виводом

    if (uniqueUsers.size === 0) {
        usersContainer.innerHTML = "<p>Немає замовлень.</p>";
        return;
    }

    let html = "<h3>Унікальні користувачі:</h3><ul>";
    uniqueUsers.forEach(name => {
        html += `<li>${name}</li>`;
    });
    html += "</ul>";

    usersContainer.innerHTML = html;
}

function updateOrdersTable() {
    const tableBody = document.querySelector("#ordersTable tbody");
    tableBody.innerHTML = "";

    orders.forEach(order => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = order.productId;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = storage.get(order.productId).name;
        row.appendChild(nameCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = storage.get(order.productId).price;
        row.appendChild(priceCell);

        const amountCell = document.createElement("td");
        amountCell.textContent = order.quantity;
        row.appendChild(amountCell);

        tableBody.appendChild(row);
    });
}
