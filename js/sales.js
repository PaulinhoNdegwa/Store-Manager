const sales_url = `${api_url}/sales`;
const cart_url = `${api_url}/cart`;
const profile_url = `${api_url}/profile`

const sales = {

    add_to_cart(name, model) {

        cart_item = JSON.stringify({
            "product_name": name,
            "product_model": model,
            "quantity": 1
        })
        console.log(cart_item)
        token = "Bearer " + localStorage.getItem('token')

        fetch(sales_url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: cart_item
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log
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
                    console.log(data.Cart)
                    display_error(data.message)
                    // localStorage.setItem("cart_total", localStorage.getItem('cart_total') + 1)
                    localStorage.setItem('cart_total', data.Cart.length)
                    set_cart_total()
                }
                else {
                    display_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch eror: ${fetch_error}`)
            });
    }
}

const profile = {

    get_profile() {
        token = "Bearer " + localStorage.getItem('token')
        fetch(profile_url, {
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
                    map_profile.map_user_profile(data.Profile)
                    map_profile.map_to_table(data.Sales)
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

const map_profile = {

    map_user_profile: (profile_dict) => {
        const prof = `
            <h4>Email: ${profile_dict.Email}</h4>
            <h4>Role: ${profile_dict.Role}</h4>
        `
        profile_div = document.getElementById('profile');
        profile_div.insertAdjacentHTML('beforeend', prof);

    },
    map_to_table: (profile_array) => {

        total_h3 = document.getElementById("total");
        const table = document.getElementById("profile-table");
        total = 0;
        profile_array.forEach(item => {
            const profile_row = `
            <tr>
                <td>${item.Product_Id}</td>
                <td>${item.Product_Name} ${item.Product_Model}</td>
                <td>${item.Quantity_sold}</td>
                <td>${item.Total_Price}</td>
            </tr>
    `;
            // console.log(table)
            table.insertAdjacentHTML('beforeend', profile_row);
            total += item.Total_Price * item.Quantity_sold
        });
        total_h3.insertAdjacentHTML('beforeend', total);

    }
}
