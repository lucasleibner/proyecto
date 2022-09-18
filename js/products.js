//array donde se cargarán los datos recibidos:
let categoryArray = [];
let currentProductsArray = [];
let minCount = undefined;
let maxCount = undefined;
let search = undefined;

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(){
    let htmlContentToAppend = "";
    let contenido = "";

contenido = `<div class="text-center p-4">
<h2>Productos</h2>
<p class="lead">Aquí verás todos los productos de la categoría <strong>` + categoryArray.catName + `</strong></p>`


    for(let i = 0; i < currentProductsArray.length; i++){ 
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
                if (search == undefined || search == "" || product.name.toUpperCase().includes(search) || product.description.toUpperCase().includes(search)) {
        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ` - ` + product.currency + ` ` + product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        `}}}
        document.getElementById("titulo").innerHTML = contenido; 
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;    
}

document.addEventListener("DOMContentLoaded", function(e){
    checkLogin();
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data.products;
            categoryArray = resultObj.data;
            showProductsList();
        }
    });

    document.getElementById("search").addEventListener("input", function(){
        search = document.getElementById("search").value.toUpperCase();
showProductsList()
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts("ASC");
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts("DESC"); 
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts("REL");
    });
});

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === "ASC")
    {
        result = array.sort(function(a, b) {
            return a.cost - b.cost;
        });
    }else if (criteria === "DESC"){
        result = array.sort(function(a, b) {
            return b.cost - a.cost;
        });
    }else if (criteria === "REL"){
        result = array.sort(function(a, b) {
            return parseInt(b.soldCount) - parseInt(a.soldCount);
        });
    }

    return result;
}

function setProdID(id) {
    localStorage.setItem("prodId", id);
    window.location = "product-info.html"
}