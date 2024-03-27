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
        if (response.success) {
            alert("Login successed!");
            window.location.href="invoiceInput.html";
        } else {
            alert("Login failed!");
        }
    };
});
