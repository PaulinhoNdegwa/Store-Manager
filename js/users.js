const signup_url = `${api_auth_url}/signup`;
const fetch_users_url = `${api_url}/users`;

const users = {
    create_user: (url) => {
        event.preventDefault();
        let username = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirm_password = document.getElementById('confirm_password').value;
        let role = document.getElementById('role').value;

        signup_data = JSON.stringify({
            "email": username,
            "password": password,
            "confirm_password": confirm_password,
            "role": role
        })
        token = "Bearer " + localStorage.getItem('token')

        fetch(signup_url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: signup_data
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
                else if (data.message != "User saved") {
                    display_form_error(data.message)
                }
                else if (data.message == "User saved") {
                    window.location.reload()
                    display_error(data.message)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch eror: ${fetch_error}`)
            });
    },

    get_users: (url) => {

        token = "Bearer " + localStorage.getItem('token')
        fetch(fetch_users_url, {
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
                console.log(role)
                if (role == 'admin') {
                    map_users.map_to_table(data.Users)
                }
            })
            .catch(fetch_error => {
                console.log(`Fetch Error: ${fetch_error}`);
            });
    },

    delete_user: (url) => {
        token = "Bearer " + localStorage.getItem('token')
        id = localStorage.getItem('delete_id')
        console.log(id)
        fetch(`${fetch_users_url}/${id}`, {
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
                else if (data.message == "User successfully deleted") {
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

    edit_user: (url) => {
        token = "Bearer " + localStorage.getItem('token')
        id = localStorage.getItem('edit_id')

        let new_role = document.getElementById('new-role').value;
        role = {
            "role": new_role
        }

        fetch(`${fetch_users_url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": token,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Method': '*'
            },
            body: JSON.stringify(role)
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
                else if (data.message == "User role updated") {
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

const map_users = {

    map_to_table: (users_array) => {

        const table = document.getElementById("users-table");
        users_array.forEach(user => {
            const user_row = `
                    <tr>
                        <td>${user.user_id}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td><button class="bluebtn" onclick="make_admin_modal('${user.user_id}', '${user.email}')">Edit</button></td>
                        <td><button class="redbtn" onclick="deleteModal('${user.user_id}', '${user.email}')">Delete</button></td>
                    </tr>
            `;
            // console.log(table)
            table.insertAdjacentHTML('beforeend', user_row);

        });

    }
}

