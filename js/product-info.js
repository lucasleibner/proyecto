let product;
let comments;

document.addEventListener("DOMContentLoaded", function (e) {
    checkLogin();
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem('prodId') + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProduct();
            showRelatedProducts();
            buyProduct();
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodId') + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments();
        }
    });

    document.getElementById('enviar').addEventListener('click', () => {
        let newComment = document.getElementById('comment').value;
        if (newComment != "") {
            let newScore = document.getElementById('score').value;
            let currentDate = new Date();
            let dia = currentDate.getDate();
            let mes = currentDate.getMonth() + 1;
            let anio = currentDate.getFullYear();
            let hora = currentDate.getHours();
            let min = currentDate.getMinutes();
            let sec = currentDate.getSeconds();

            let comentario = {
                description: newComment,
                score: newScore,
                user: localStorage.getItem("username"),
                dateTime: anio + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + sec,
            }
            comments.push(comentario)
            showComments();
        } else {
            alert("Debe ingresar un comentario")
        }

    })
});

function showProduct() {
    let htmlContentToAppend = "";
    let images = product.images;
    let variable = "";

    for (let i = 0; i < images.length; i++) {
        let imagen = images[i];
        if (i == 0) {
            variable += `
            <div class="carousel-item active">
            <img src="` + imagen + `" class="img-thumbnail d-block w-100" alt="product image">
               </div>
               `
        } else {
            variable += `
               <div class="carousel-item">
               <img src="` + imagen + `" class="img-thumbnail d-block w-100" alt="product image">
               </div>
               
        `}
    }

    htmlContentToAppend += `
    <div class="m-1 p-4 pt-5 lead">
        <h2 class="d-inline">${product.name}</h2> 
        <form class="d-inline row justify-content-md-end">
        <button type="button" class="btn btn-success float-end" style="width: 100px;" id="comprar">Comprar</button>
        <input type="number" value="1" min="1" style="width: 60px;" class="float-end" id="canti">
        
        </form>
        </div>
   
    <hr>
    
    <div class="col">
        <div class="m-3">
            <p class="mb-1"><strong>Precio</strong></p>
            <p class="mb-1">${product.currency + " " + product.cost}</p>
        </div>

        <div class="m-3">
            <p class="mb-1"><strong>Descripción</strong></p>
            <p class="mb-1">${product.description}</p>
        </div>

        <div class="m-3">
            <p class="mb-1"><strong>Categoría</strong></p>
            <p class="mb-1">${product.category}</p>
        </div>

        <div class="m-3">
             <p class="mb-1"><strong>Cantidad de Vendidos</strong></p>
             <p class="mb-1">${product.soldCount}</p>
        </div>
        
        <div class="m-3">
            <p class="mb-1"><strong>Imágenes ilustrativas</strong></p>
            <div id="carouselExampleControls" class="carousel slide mx-auto w-75" data-bs-ride="carousel">
                <div class="carousel-inner">
                    ${variable}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>    `
    document.getElementById("prodInfo").innerHTML = htmlContentToAppend;

}
function showComments() {
    let comentarios = "";
    for (let i = 0; i < comments.length; i++) {
        let comentario = comments[i];
        let star = "";

        for (let i = 0; i < comentario.score; i++) {
            star += `<i class="fa fa-star checked"></i>`
        }
        if (comentario.score < 5) {
            for (let i = comentario.score; i < 5; i++) {
                star += `<i class="fa fa-star"></i>`
            }
        }

        comentarios += `
        <div class="list-group-item">
             
                  <div class="d-flex w-100 justify-content-between">
                      <div class="mb-0">
                      <h6 class="m-1"><strong>${comentario.user}</strong>${" - " + comentario.dateTime + " - " + star}</h6>
                      <p class="small m-1 mb-0 p-0">${comentario.description}</p>
                      </div>
                 </div>
        </div>
        `
        document.getElementById("comments").innerHTML = comentarios;
    }
}

function showRelatedProducts() {
    let htmlContentToAppend = "";
    let relProd = product.relatedProducts;

    for (let i = 0; i < relProd.length; i++) {
        let prod = relProd[i];
        htmlContentToAppend += ` 
        <div class="w-25 card mb-4 custom-card cursor-active p-0 m-1" onclick="setProdID(${prod.id})">
        <img src="` + prod.image + `" alt="product image" class="img-thumbnail p-0">
        <h7 class="m-2">${prod.name}</h7>
        </div>
        `
    }

    let contenido = `<div>
    <hr>
    <h4 class="mb-4">Productos relacionados</h4>
             <div class="row h-25">
             ${htmlContentToAppend}
             </div>
        </div>`

    document.getElementById("relatedProducts").innerHTML = contenido;
}
function setProdID(id) {
    localStorage.setItem("prodId", id);
    window.location = "product-info.html"
}

function buyProduct() {
    document.getElementById('comprar').addEventListener('click', () => {
        let comprado = {};
        let carro = [];
        comprado.id = product.id
        comprado.name = product.name;
        comprado.count = document.getElementById('canti').value;
        comprado.unitCost = product.cost;
        comprado.currency = product.currency;
        comprado.image = product.images[0];


        carro = JSON.parse(localStorage.getItem('carrito-' + localStorage.getItem('username')));

        if (carro == null) {
            getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    carro = resultObj.data.articles;
                    carro.push(comprado);
                    localStorage.setItem('carrito-' + localStorage.getItem('username'), JSON.stringify(carro));
                }
            });
        } else {

            carro.push(comprado)

            localStorage.setItem('carrito-' + localStorage.getItem('username'), JSON.stringify(carro));
        }
window.location.href="cart.html"
    });

}