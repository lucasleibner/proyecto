let productsCartArray = [];
let currentProductsCartArray = [];

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();

    productsCartArray = JSON.parse(localStorage.getItem('carrito'));
    if (productsCartArray == null) {
        getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsCartArray = resultObj.data.articles;
                showProductsCartList(productsCartArray);
            }
        });
    } else {
        showProductsCartList(productsCartArray);
    }
    console.log(productsCartArray);

});

function showProductsCartList(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        const producto = array[i];
        if (producto.count > 0) {
            contenido += `<tr>
    <td class="w-25"><img src="${producto.image}" class="w-75"></td>
    <td class="w-25">${producto.name}</td>
    <td class="w-25">${producto.currency + " " + producto.unitCost}</td>
    <td><input class="w-50" type="number" name="cdad" id=${"cdad" + i} value="${producto.count}" onchange="changeQtity()"></td>
    <td class="w-25"><strong>${producto.currency + " " + (producto.unitCost * producto.count)}</strong></td>
    </tr>`} else {
            array.splice(i, 1);
            i--;
            localStorage.setItem('carrito', JSON.stringify(productsCartArray))

        }


    }
    document.getElementById('tbody').innerHTML = contenido;
}

function changeQtity() {
    for (let i = 0; i < productsCartArray.length; i++) {
        const prod = productsCartArray[i];
        prod.count = document.getElementById("cdad" + i).value;
    }
    localStorage.setItem('carrito', JSON.stringify(productsCartArray))
    showProductsCartList(productsCartArray);
}

//Función de Bootstrap para validación de formulario
(function () {
    'use strict'


    var forms = document.querySelectorAll('.needs-validation')


    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()