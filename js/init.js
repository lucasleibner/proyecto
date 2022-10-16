const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function checkLogin(){
  let username = localStorage.getItem("username")

  if(username == null){
      window.location.href="login.html"
  }else{
      document.getElementById('user').innerHTML = `
<div class="collapse navbar-collapse d-block" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${username}
          </a>
          <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="login.html" onclick="localStorage.removeItem('username')">Cerrar sesión</a></li>
          </ul>
        </li>
      </ul>
    </div>`;
  }

}