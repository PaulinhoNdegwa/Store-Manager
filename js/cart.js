const cart_url = `${api_url}/cart`;

const cart = {

    get_cart() {
        token = "Bearer " + localStorage.getItem('token')
        fetch(cart_url, {
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
                else if (data.message == 'Successful') {
                    localStorage.setItem("cart_total", data.Cart.length)
                    set_cart_total()
                    map_cart.map_to_table(data.Cart)
                }
                else {
                    display_error(data.message)
                }

            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    checkout_cart() {
        token = "Bearer " + localStorage.getItem('token')
        fetch(cart_url, {
            method: "POST",
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
                else if (data.message == 'Successfully saved') {
                    console.log(data.Sale_saved)
                    window.location.reload()
                    display_error(data.message)
                }
                else {
                    display_error(data.message)
                }

            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    remove(cart_id) {
        token = "Bearer " + localStorage.getItem('token')
        fetch(`${cart_url}/${cart_id}`, {
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
                else if (data.message == 'Cart item successfully removed') {
                    window.location.reload()
                    display_error(data.message)
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

const map_cart = {

    map_to_table: (cart_array) => {

        total_h3 = document.getElementById("total");
        const table = document.getElementById("cart-table");
        total = 0;
        cart_array.forEach(item => {
            const cart_row = `
            <tr>
                <td>${item.Cart_Id}</td>
                <td>${item.Product_Name} ${item.Product_Model}</td>
                <td>${item.Quantity}</td>
                <td>${item.Total_Price}</td>
                <td><button class="redbtn" onclick="cart.remove('${item.Cart_Id}')">Remove</button></td>
            </tr>
    `;
            // console.log(table)
            table.insertAdjacentHTML('beforeend', cart_row);
            total += item.Total_Price * item.Quantity

        });
        total_h3.insertAdjacentHTML('beforeend', total);

    }
}