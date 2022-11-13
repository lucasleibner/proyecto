let productsCartArray = [];
let porcentajeEnvio = 0.15;

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();

    productsCartArray = JSON.parse(localStorage.getItem('carrito-' + localStorage.getItem('username')));
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

    document.getElementById("rbtnPremium").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        costos(productsCartArray);
    });

    document.getElementById("rbtnExpress").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        costos(productsCartArray);
    });

    document.getElementById("rbtnStandard").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        costos(productsCartArray);
    });

    document.getElementById("cred").addEventListener("change", function () {
        document.getElementById('accountNo').disabled = true;

        document.getElementById('cardNumber').disabled = false;
        document.getElementById('code').disabled = false;
        document.getElementById('expDate').disabled = false;

        document.getElementById('formaPago').innerHTML = "Tarjeta de crédito";

        document.getElementById('accountNo').classList.remove('is-valid');
        document.getElementById('accountNo').classList.remove('is-invalid');
        document.getElementById('accountNo').value = "";

    });

    document.getElementById("transf").addEventListener("change", function () {
        document.getElementById('accountNo').disabled = false;

        document.getElementById('cardNumber').disabled = true;
        document.getElementById('code').disabled = true;
        document.getElementById('expDate').disabled = true;

        document.getElementById('formaPago').innerHTML = "Transferencia bancaria";

        document.getElementById('cardNumber').classList.remove('is-valid');
        document.getElementById('cardNumber').classList.remove('is-invalid');
        document.getElementById('code').classList.remove('is-valid');
        document.getElementById('code').classList.remove('is-invalid');
        document.getElementById('expDate').classList.remove('is-valid');
        document.getElementById('expDate').classList.remove('is-invalid');

        document.getElementById('cardNumber').value = "";
        document.getElementById('code').value = "";
        document.getElementById('expDate').value = "";

    });

    document.getElementById('buy').addEventListener('click', () => {

        let calle = document.getElementById('calle');
        let numero = document.getElementById('numero');
        let esquina = document.getElementById('esquina');

        let validCalle = false;
        let validNumero = false;
        let validEsquina = false;

        if (calle.value == "") {
            calle.classList.remove('is-valid');
            calle.classList.add('is-invalid');

            validCalle = false;
        } else {
            calle.classList.remove('is-invalid');
            calle.classList.add('is-valid');

            validCalle = true;
        }

        if (numero.value == "") {
            numero.classList.remove('is-valid');
            numero.classList.add('is-invalid');

            validNumero = false;
        } else {
            numero.classList.remove('is-invalid');
            numero.classList.add('is-valid');

            validNumero = true;
        }

        if (esquina.value == "") {
            esquina.classList.remove('is-valid');
            esquina.classList.add('is-invalid');

            validEsquina = false;
        } else {
            esquina.classList.remove('is-invalid');
            esquina.classList.add('is-valid');

            validEsquina = true;
        }
        let successfulPayment = isValidPayment()
        if (validCalle && validNumero && validEsquina && successfulPayment) {
            document.getElementById('alerta').classList.remove('d-none');
            
        }


    });
});

function isValidPayment() {

    let cardNumber = document.getElementById('cardNumber');
    let code = document.getElementById('code');
    let expDate = document.getElementById('expDate');
    let accountNo = document.getElementById('accountNo');

    let isCardPayment = document.getElementById('cred').checked;
    let isBankTransfer = document.getElementById('transf').checked;

    if (isCardPayment) {

        let validCardNo = false;
        let validCode = false;
        let validExp = false;


        if (cardNumber.value == "") {
            cardNumber.classList.remove('is-valid');
            cardNumber.classList.add('is-invalid');

            validCardNo = false;
        } else {
            cardNumber.classList.remove('is-invalid');
            cardNumber.classList.add('is-valid');

            validCardNo = true;
        }

        if (code.value == "") {
            code.classList.remove('is-valid');
            code.classList.add('is-invalid');

            validCode = false;
        } else {
            code.classList.remove('is-invalid');
            code.classList.add('is-valid');

            validCode = true;
        }

        if (expDate.value == "") {
            expDate.classList.remove('is-valid');
            expDate.classList.add('is-invalid');

            validExp = false;
        } else {
            expDate.classList.remove('is-invalid');
            expDate.classList.add('is-valid');

            validExp = true;
        }
        if (!validCardNo || !validCode || !validExp) {
            document.getElementById('paymentError').innerHTML = "Faltan campos por completar."
            document.getElementById('selectPayment').classList.add('is-invalid');
        } else {
            document.getElementById('selectPayment').classList.remove('is-invalid');
            return true;
        }

    } else if (isBankTransfer) {
        let validAccountNo = false;

        if (accountNo.value == "") {
            accountNo.classList.remove('is-valid');
            accountNo.classList.add('is-invalid');

            validAccountNo = false;
        } else {
            accountNo.classList.remove('is-invalid');
            accountNo.classList.add('is-valid');

            validAccountNo = true;
        }

        if (!validAccountNo) {
            document.getElementById('paymentError').innerHTML = "Faltan campos por completar."
            document.getElementById('selectPayment').classList.add('is-invalid');
        } else {
            document.getElementById('selectPayment').classList.remove('is-invalid');
            return true;
        }
    }

    if (!isCardPayment && !isBankTransfer) {
        document.getElementById('selectPayment').classList.add('is-invalid');
    }
    return false;

}

function showProductsCartList(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        const producto = array[i];
        if (producto.count > 0) {
            contenido += `<tr>
    <td class="w-25"><img src="${producto.image}" class="w-75"></td>
    <td class="w-25">${producto.name}</td>
    <td class="w-25">${producto.currency + " " + producto.unitCost}</td>
    <td><input class="w-50" type="number" min="1" name="cdad" id=${"cdad" + i} value="${producto.count}" onchange="changeQtity()"></td>
    <td class="w-25"><strong>${producto.currency + " " + (producto.unitCost * producto.count)}</strong></td>
    <td><div class="text-danger border border-danger p-1" onclick="deleteProd(${i})" role="button"><i class="fas fa-trash-alt"></i></div></td>
    </tr>`} else {
            array.splice(i, 1);
            i--;
            localStorage.setItem('carrito-' + localStorage.getItem('username'), JSON.stringify(productsCartArray))

        }


    }
    costos(array);
    document.getElementById('tbody').innerHTML = contenido;
}

function changeQtity() {
    for (let i = 0; i < productsCartArray.length; i++) {
        const prod = productsCartArray[i];
        prod.count = document.getElementById("cdad" + i).value;
    }
    localStorage.setItem('carrito-' + localStorage.getItem('username'), JSON.stringify(productsCartArray))
    showProductsCartList(productsCartArray);
}

function deleteProd(indice) {
    productsCartArray[indice].count = 0;
    localStorage.setItem('carrito-' + localStorage.getItem('username'), JSON.stringify(productsCartArray))
    showProductsCartList(productsCartArray);
}

function costos(array) {
    let subtotal = 0;
    for (let i = 0; i < array.length; i++) {
        const moneda = array[i].currency;
        const preSubtotal = array[i].unitCost * array[i].count;

        if (moneda === "USD") {
            subtotal += preSubtotal;
        } else {
            subtotal += Math.round(preSubtotal / 40);
        }
    }
    let costoEnvio = Math.round(subtotal * porcentajeEnvio);
    document.getElementById('costoSubtotal').innerHTML = "USD " + subtotal;
    document.getElementById('costoEnvio').innerHTML = "USD " + costoEnvio;
    document.getElementById('costoTotal').innerHTML = "USD " + (subtotal + costoEnvio);

}
