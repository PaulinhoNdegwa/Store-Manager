const logout_url = `${api_auth_url}/logout`;

logout = document.getElementById('logout').addEventListener('click', async (event) => {
    event.preventDefault()

    token = "Bearer " + localStorage.getItem('token')

    fetch(logout_url, {
        method: "PUT",
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
            console.log(data.message)
            if (data.message != "Successfully logged out") {
                display_error(data.message)
            }
            else if (data.message == "Successfully logged out") {
                window.location.href = 'login.html'
                display_error(data.message)
            }
            // console.log(data.message)
        })
        .catch(fetch_error => {
            console.log(`Fetch eror: ${fetch_error}`)
        });
});