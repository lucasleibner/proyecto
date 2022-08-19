document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('boton').addEventListener("click", function () {
        let username = document.getElementById('correo').value;
        let password = document.getElementById('password').value;

        if (username !== "" && password !== "") {
            localStorage.setItem("username", username);
            window.location.href = "index.html"
        }else{
            alert('Debe ingresar un Correo electrónico y una Contraseña')
        }
    })

})

