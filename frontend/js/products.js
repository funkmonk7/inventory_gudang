if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// LOAD PRODUCTS
async function loadProducts() {

    const response = await fetch(
        `${API_URL}/products`
    );

    const data = await response.json();

    let html = "";

    data.forEach(item => {

        html += `
        <tr>
            <td>${item.id}</td>
            <td>${item.product_name}</td>
            <td>${item.stock}</td>
            <td>Rp ${item.price}</td>
            <td>${item.supplier_id}</td>

            <td>
                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteProduct(${item.id})">
                    Hapus
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById(
        "productTable"
    ).innerHTML = html;
}

// LOAD SUPPLIERS
async function loadSuppliers() {

    const response = await fetch(
        `${API_URL}/suppliers`
    );

    const suppliers = await response.json();

    let html = "";

    suppliers.forEach(item => {

        html += `
            <option value="${item.id}">
                ${item.supplier_name}
            </option>
        `;
    });

    document.getElementById(
        "supplier_id"
    ).innerHTML = html;
}

// ADD PRODUCT
async function addProduct() {

    const product_name =
        document.getElementById("product_name").value;

    const stock =
        document.getElementById("stock").value;

    const price =
        document.getElementById("price").value;

    const supplier_id =
        document.getElementById("supplier_id").value;

    await fetch(`${API_URL}/products`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            product_name,
            stock,
            price,
            supplier_id
        })

    });

    loadProducts();

    document.getElementById("product_name").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("price").value = "";
}

// DELETE PRODUCT
async function deleteProduct(id) {

    if (!confirm("Hapus produk?")) return;

    await fetch(
        `${API_URL}/products/${id}`,
        {
            method: "DELETE"
        }
    );

    loadProducts();
}

// LOGOUT
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

loadProducts();
loadSuppliers();