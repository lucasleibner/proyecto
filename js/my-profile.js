document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    getProfileData(localStorage.getItem("username"));

    const form = document.getElementById('formulario')
    form.addEventListener('submit', event => {

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            setProfileData();
        }

        form.classList.add('was-validated')
    }, false)
})

function getProfileData(correo) {
    let user = JSON.parse(localStorage.getItem(correo));

    if (user != null) {
        document.getElementById('fname').value = user.firstName;
        document.getElementById('sname').value = user.secondName;
        document.getElementById('flname').value = user.firstLastName;
        document.getElementById('slname').value = user.secondLastName;
        document.getElementById('email').value = user.email;
        document.getElementById('contactno').value = user.contactNumber;

        if (user.picture != "") {
            document.getElementById('imageProfile').innerHTML = `<img src="${user.picture}" alt="picture" class="img-thumbnail" width="100px" height="100px">`   
        }else{
            document.getElementById('imageProfile').innerHTML = `<img src="img/img_perfil.png" alt="picture" class="img-thumbnail" width="100px">`
        }
    } else {
        document.getElementById('email').value = localStorage.getItem('username')
        document.getElementById('imageProfile').innerHTML = `<img src="img/img_perfil.png" alt="picture" class="img-thumbnail" width="100px">`
    }
}

function setProfileData() {
    let user = {};
    user.firstName = document.getElementById('fname').value;
    user.secondName = document.getElementById('sname').value;
    user.firstLastName = document.getElementById('flname').value;
    user.secondLastName = document.getElementById('slname').value;
    user.email = document.getElementById('email').value;
    user.contactNumber = document.getElementById('contactno').value;

    if (document.getElementById('image').value != "") {
        convertImgToBase64(document.getElementById('image').files[0], user);
    }else{
        user.picture = "";
    }

    localStorage.setItem(user.email, JSON.stringify(user));
}

function convertImgToBase64(image, user) {

    var reader = new FileReader();
    reader.onload = function () {

        user.picture = reader.result;
        localStorage.setItem('profile', JSON.stringify(user));
    }
    reader.readAsDataURL(image);
}

