document.addEventListener('DOMContentLoaded', () => {



    let form = document.getElementById('formulario');
    document.getElementById('boton').addEventListener('click', function (event) {
        let username = document.getElementById('correo').value;
        
            event.preventDefault()
            event.stopPropagation()
        if(form.checkValidity()) {
            localStorage.setItem("username", username);
            window.location.href = "index.html"
        }else{
            alert('Debe ingresar un Correo electrónico y una Contraseña');
        }

        form.classList.add('was-validated')
    }, false)
})


