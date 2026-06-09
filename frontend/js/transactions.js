if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// LOAD PRODUCTS
async function loadProducts() {

    const response = await fetch(
        `${API_URL}/products`
    );

    const products = await response.json();

    let html = "";

    products.forEach(item => {

        html += `
            <option value="${item.id}">
                ${item.product_name}
            </option>
        `;
    });

    document.getElementById(
        "product_id"
    ).innerHTML = html;
}

// LOAD TRANSACTIONS
async function loadTransactions() {

    const response = await fetch(
        `${API_URL}/transactions`
    );

    const data = await response.json();

    let html = "";

    data.forEach(item => {

        html += `
        <tr>
            <td>${item.id}</td>
            <td>${item.product_id}</td>
            <td>${item.transaction_type}</td>
            <td>${item.quantity}</td>
            <td>${item.transaction_date}</td>
        </tr>
        `;
    });

    document.getElementById(
        "transactionTable"
    ).innerHTML = html;
}

// ADD TRANSACTION
async function addTransaction() {

    const product_id =
        document.getElementById("product_id").value;

    const transaction_type =
        document.getElementById("transaction_type").value;

    const quantity =
        document.getElementById("quantity").value;

    const response = await fetch(
        `${API_URL}/transactions`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                product_id,
                transaction_type,
                quantity
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    loadTransactions();

    document.getElementById("quantity").value = "";
}

// LOGOUT
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

loadProducts();
loadTransactions();