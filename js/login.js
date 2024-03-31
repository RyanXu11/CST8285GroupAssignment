// This event listener is used for login in submit button
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('pass').value;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', './php/login.php', true);
    xhr.send(data);

    xhr.onload = function() {
        let response = JSON.parse(this.responseText);
        console.log("response.success: ", response.success);
        console.log("response.username: ", response.username);
        if (response.success) {
            alert("Login successed. Welcome " + response.username + "!");
            window.location.href="index.php";
        } else {
            alert("Login failed!");
        }
    };
});