document.addEventListener("DOMContentLoaded", function(){

    checkLogin();

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

function checkLogin(){
    let username = localStorage.getItem("username")

    if(username == null){
        window.location.href="login.html"
    }
}