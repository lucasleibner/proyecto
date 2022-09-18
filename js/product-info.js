let product;
let comments;

document.addEventListener("DOMContentLoaded", function (e) {
    checkLogin();
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem('prodId') + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProduct();
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodId') + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showComments();
        }
    });
    document.getElementById('enviar').addEventListener('click', ()=>{
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

        let comentario = { description: newComment, 
            score : newScore,
            user: localStorage.getItem("username"),
            dateTime: anio + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + sec,
        }
        comments.push(comentario)
        showComments();
        }else{
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
        variable += ` <div class="w-25">
        <img src="` + imagen + `" alt="product image" class="img-thumbnail m-3">
        </div>
        `
    }

    htmlContentToAppend += `
    <div class="m-1 p-4 lead">
        <h2>${product.name}</h2>
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
             <div class="row h-25">
             ${variable}
             </div>
        </div>
    </div>    `
    document.getElementById("prodInfo").innerHTML = htmlContentToAppend;

}
function showComments(){
    let comentarios = "";
    for (let i = 0; i < comments.length; i++) {
        let comentario = comments[i];
        let star = "";

        for (let i = 0; i < comentario.score; i++) {
            star += `<span class="fa fa-star checked"></span>`
        }
        if (comentario.score < 5) {
            for (let i = comentario.score; i < 5; i++) {
                star +=`<i class="fa fa-star"></i>`
            }
        }

        comentarios += `
        <div class="list-group-item">
             
                  <div class="d-flex w-100 justify-content-between">
                      <div class="mb-0">
                      <h6 class="m-1"><strong>${comentario.user}</strong>${ " - " + comentario.dateTime + " - " + star}</h6>
                      <p class="small m-1 mb-0 p-0">${comentario.description}</p>
                      </div>
                 </div>
        </div>
        `
        document.getElementById("comments").innerHTML = comentarios;
        console.log(comments);
    }
}