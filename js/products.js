const products_url = `${api_url}/products`;


const products = {
    all_products: (url) => {

        token = "Bearer " + localStorage.getItem('token')
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                role = localStorage.getItem('role')
                if (role == 'admin') {
                    map_products.map_to_table(data.Products)
                }
                else if (role == 'attendant') {
                    map_products.map_to_grid(data.Products)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    create_product: (url) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let model = document.getElementById('model').value;
        let price = document.getElementById('price').value;
        let quantity = document.getElementById('quantity').value;
        let min_quantity = document.getElementById('min_quantity').value;
        let category = document.getElementById('select_cat').value;

        product_data = JSON.stringify({
            "product_name": name,
            "model": model,
            "product_price": price,
            "category": category,
            "quantity": quantity,
            "min_quantity": min_quantity
        })
        console.log(product_data)
        token = "Bearer " + localStorage.getItem('token')

        fetch(products_url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: product_data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                else if (data.message != "Successfully saved") {
                    display_form_error(data.message)
                }
                else if (data.message == "Successfully saved") {
                    window.location.reload()
                    // map_products.map_to_grid(data.Products)
                }
                else {
                    display_form_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch eror: ${fetch_error}`)
            });
    },
    edit_product: (id) => {
        event.preventDefault();
        let name = document.getElementById('name').value;
        let model = document.getElementById('model').value;
        let price = document.getElementById('price').value;
        let quantity = document.getElementById('quantity').value;
        let min_quantity = document.getElementById('min_quantity').value;
        let category = document.getElementById('select_cat').value;

        product_data = JSON.stringify({
            "product_name": name,
            "model": model,
            "product_price": price,
            "category": category,
            "quantity": quantity,
            "min_quantity": min_quantity
        })
        console.log(product_data)
        token = "Bearer " + localStorage.getItem('token')

        fetch(`${products_url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: product_data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                else if (data.message == "Product successfully updated") {
                    window.location.reload()
                }
                else {
                    display_form_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch eror: ${fetch_error}`)
            });
    },

    delete_product: (url) => {
        token = "Bearer " + localStorage.getItem('token')
        id = localStorage.getItem('delete_id')

        fetch(`${products_url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                else if (data.message == "Product successfully deleted") {
                    display_error(data.message)
                    window.location.reload()
                }
                else {
                    closeModal()
                    display_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    view_inventory: (url) => {

        token = "Bearer " + localStorage.getItem('token')
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                else if (data.status == 200) {
                    map_products.att_map_to_table(data.Products)
                }
                else {
                    display_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    }
}

const map_products = {

    map_to_grid: (product_array) => {
        const grid = document.getElementById("product-grid");
        product_array.forEach(product => {
            const product_cell = `
            <div class= "product">
            <h3>${product.product_name} ${product.product_model}</h3>
            <img src="img/macbook.jpeg" alt="MacBook Img"><br>
                <h4>Price: Ksh ${product.unit_price}</h4>
                <a href="#" class="greenbtn btn" onclick="sales.add_to_cart('${product.product_name}','${product.product_model}')" >Add to cart</a><br><br>
                </div>
                    `;
            // console.log(grid)
            grid.insertAdjacentHTML('beforeend', product_cell);

        });
    },

    map_to_table: (product_array) => {

        const table = document.getElementById("products-table");
        product_array.forEach(product => {
            id = product.product_id;
            name = product.product_name;
            model = product.product_model;
            unit_price = product.unit_price;
            const product_row = `
                    <tr>
                        <td>${product.product_name} ${product.product_model}</td>
                        <td>${product.unit_price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.min_quantity}</td>
                        <td>${product.category}</td>
                        <td><button class="bluebtn" onclick="pdt_edit_form_modal('${id}','${name}','${model}', '${unit_price}')">Edit</button></td>
                        <td><button class="redbtn" onclick="deleteModal('${product.product_id}','${product.product_name} ${product.product_model}')">Delete</button></td>
                    </tr>
                    `;
            // console.log(table)
            table.insertAdjacentHTML('beforeend', product_row);

        });

    },

    att_map_to_table: (product_array) => {

        const table = document.getElementById("products-table");
        product_array.forEach(product => {
            const product_row = `
                    <tr>
                        <td>${product.product_name} ${product.product_model}</td>
                        <td>${product.unit_price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.min_quantity}</td>
                        <td>${product.category}</td>
                    </tr>
                    `;
            // console.log(table)
            table.insertAdjacentHTML('beforeend', product_row);

        });

    }
}
