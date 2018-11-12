const login_url = `${api_auth_url}/login`;

login = document.getElementById('login_btn').addEventListener('click', async (event) => {
    event.preventDefault();
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    login_data = JSON.stringify({
        "email": username,
        "password": password
    })

    fetch(login_url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': '*'
        },
        body: login_data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            if (data.message != "Successfully logged in") {
                display_form_error(data.message)
            }
            else if (data.message == "Successfully logged in") {
                window.localStorage.setItem('token', data['token'])
                window.localStorage.setItem('role', data['role'])
                if (data.role == "admin") {
                    window.location = 'admininventory.html';
                }
                else if (data.role == "attendant") {
                    window.location = 'home.html';
                }
            }
            // console.log(data.message)
        })
        .catch(fetch_error => {
            console.log(`Fetch eror: ${fetch_error}`)
        });
})