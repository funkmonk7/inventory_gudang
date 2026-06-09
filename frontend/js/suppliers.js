if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

async function loadSuppliers() {

    const response = await fetch(
        `${API_URL}/suppliers`
    );

    const data = await response.json();

    let html = "";

    data.forEach(item => {

        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.supplier_name}</td>
                <td>${item.address}</td>
                <td>${item.phone}</td>

                <td>
                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteSupplier(${item.id})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;

    });

    document.getElementById(
        "supplierTable"
    ).innerHTML = html;
}

async function addSupplier() {

    const supplier_name =
        document.getElementById("supplier_name").value;

    const address =
        document.getElementById("address").value;

    const phone =
        document.getElementById("phone").value;

    await fetch(`${API_URL}/suppliers`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            supplier_name,
            address,
            phone
        })

    });

    loadSuppliers();

    document.getElementById("supplier_name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
}

async function deleteSupplier(id) {

    if (!confirm("Hapus supplier?")) return;

    await fetch(
        `${API_URL}/suppliers/${id}`,
        {
            method: "DELETE"
        }
    );

    loadSuppliers();
}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}

loadSuppliers();