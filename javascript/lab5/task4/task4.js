let storage = new Map();
storage.set(1, {name: "Iphone", price: 1200, amountInStorage: 10});
storage.set(2, {name: "Samsung", price: 1000, amountInStorage: 6});
storage.set(3, {name: "Huawei", price: 580, amountInStorage: 3});

console.log(storage);

populateTable(storage)

// Function to populate the table
function populateTable(map , selector = "#productTable tbody") {
    const tableBody = document.querySelector(selector);
    tableBody.innerHTML = '';  // Clear any existing rows

    // Loop through each item in the Map and create a row for it
    map.forEach((value, key) => {
        const row = document.createElement("tr");

        // Create a column for each piece of information
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

        // Append the row to the table body
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