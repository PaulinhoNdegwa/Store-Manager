const category_url = `${api_url}/category`;

const categories = {
    create_category: () => {
        event.preventDefault();
        let cat_name = document.getElementById('cat_name').value;
        let cat_desc = document.getElementById('cat_desc').value;

        category_data = JSON.stringify({
            "cat_name": cat_name,
            "desc": cat_desc
        })
        token = "Bearer " + localStorage.getItem('token')

        fetch(category_url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: category_data
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if (data.message == 'Unsuccessful, token is required. Log in') {
                    window.location.href = "login.html";
                }
                else if (data.message == 'Unsuccessful, token is invalid. Log in again') {
                    window.location.href = "login.html";
                }
                else if (data.msg == 'Token has expired') {
                    window.location.href = "login.html";
                }
                else if (data.message == "Category added successfully") {
                    window.location.reload()
                    display_error(data.message)
                }
                else {
                    display_form_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch eror: ${fetch_error}`)
            });
    },

    get_categories: () => {
        event.preventDefault();

        token = "Bearer " + localStorage.getItem('token')
        fetch(category_url, {
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
                    cat_location = window.localStorage.getItem("cat_loc")
                    if (cat_location == "inventory") {
                        map_categories.map_to_select_box(data.Categories)
                    }
                    else if (cat_location == "table") {
                        map_categories.map_to_table(data.Categories)
                    }
                }
                else {
                    display_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    delete_category: (url) => {
        event.preventDefault();
        token = "Bearer " + localStorage.getItem('token')
        id = localStorage.getItem('delete_id')
        console.log(id)

        fetch(`${category_url}/${id}`, {
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
                else if (data.message == "Category deleted") {
                    window.location.reload()
                }
                else {
                    display_form_error(data.message)
                }

            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    edit_category: (id) => {
        event.preventDefault();
        token = "Bearer " + localStorage.getItem('token')

        let cat_name = document.getElementById('cat_name').value;
        let cat_desc = document.getElementById('cat_desc').value;

        category_data = JSON.stringify({
            "cat_name": cat_name,
            "desc": cat_desc
        })

        fetch(`${category_url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: category_data
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
                else if (data.message == "Category updated") {
                    window.location.reload()
                }
                else {
                    display_form_error(data.message)
                }

            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });

    }
}

const map_categories = {

    map_to_table: (cat_array) => {

        const table = document.getElementById("cat-table");
        cat_array.forEach(category => {
            const category_row = `
                    <tr>
                        <td>${category.Category_id}</td>
                        <td>${category.Category_Name}</td>
                        <td>${category.Description}</td>
                        <td><button class="bluebtn" onclick="cat_edit_form_modal('${category.Category_id}', '${category.Category_Name}','${category.Description}')">Edit</button></td>
                        <td><button class="redbtn" onclick="deleteModal('${category.Category_id}', '${category.Category_Name}')">Delete</button></td>
                    </tr>
            `;
            table.insertAdjacentHTML('beforeend', category_row);

        });

    },

    map_to_select_box: (cat_array) => {

        const select = document.getElementById("select_cat");

        cat_array.forEach(category => {
            const category_item = `
                   <option value="${category.Category_Name}">${category.Category_Name}</option>
            `;
            select.insertAdjacentHTML('beforeend', category_item);
        });
    }
}

