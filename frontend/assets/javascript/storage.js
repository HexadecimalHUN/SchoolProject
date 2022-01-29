
const _localStorage = window.localStorage;
const _targetSession = {
    cart: [],
    user: [],
};

if (!_localStorage.getItem("session")){
    console.log(JSON.stringify(_targetSession))
    _localStorage.setItem("session",JSON.stringify(_targetSession));
}

//Controls if the cart badge is visible or now

function _showCartIcon(numOfProducts){
    const cartButton = document.querySelector("ul li .cart");
    if (numOfProducts < 1){
        cartButton.classList.remove("item-in-cart")
        cartButton.querySelector(".cart-badge").innerHTML = numOfProducts;
    } else {
        cartButton.classList.add("item-in-cart");
        cartButton.querySelector(".cart-badge").innerHTML = numOfProducts;
    }
}

//Update local storage content

function v(obj, value){
    _showCartIcon(obj.cart.length);
    _localStorage.session = JSON.stringify(obj);

    const amountDiv = document.querySelector(
        `[data-priduct-id="${value.id}"].item.quantity input`
    );

    const priceDiv = document.querySelector(
        `[data-priduct-id="${value.id}"].item.total-price`
    );
}
//Remove product from local storage

function _removeCartElement(value, obj){
    const elementIndex = obj.cart.indexOf(value);
    obj.cart.splice(elementIndex,1);

    const deleteElement = document.querySelector(`[data-product-id="${value.id}].item`);

    const fullDiv = document.querySelector(".container .products-in-cart");
    if (!fullDiv) return;

    fullDiv.removeChild(deleteElement);

    const cOB = document.querySelector(".shopping-cart.container .btn.black");
    if (!obj.cart[0]) cOB.disabled = true;

    //--TODO: Not product in cart yet prevent empty

    
}

//Broadcast events between components by switchcases
//target: _targetSession
//handlers: initLocalStorage, cart, incCart, decCart, remCart, nillItem, usr, 

const storagePx = new Proxy(_targetSession,{
    set: function (obj, prop, value){
        switch(prop){
            case "initLocalStorage":
                obj.cart = !value ? [] : value.cart;
                obj.user = !value ? {} : value.user;
                return true;
            
            case "cart":
                const isAlreadyExist = obj.cart.find(
                    (cartItem) => cartItem.id == value.id
                );
                if (!isAlreadyExist){obj.cart.push(value)}
                else{
                    isAlreadyExist.quantity += 1;
                    isAlreadyExist.price =
                        parseFloat(isAlreadyExist.price) +
                        parseFloat(isAlreadyExist.unitPrice);
                }
                obj.cart.push(value);
                _localStorage.session = JSON.stringify(obj)

                return true;
            case "incCart":
                const runningNumInc = obj.cart.find((prod) => prod.id == value.id)
                runningNumInc.quantity += 1;
                runningNumInc.price = parseFloat(runningNumInc.price) + parseFloat(runningNumInc.unitPrice);
                _updateCartElement(obj,value); 
                return true;
            case "decCart":
                const runningNumDec = obj.cart.find((prod) => prod.id == value.id)
                runningNumDec.quantity -= 1;
                runningNumDec.price = parseFloat(runningNumDec.price) + parseFloat(runningNumDec.unitPrice);
                _updateCartElement(obj,value);

                //TODO: when num reach 0 dump it


                return true;
            case "remCart":
                _removeCartElement(value, obj);
                _updateCartElement((obj, value));
                

                return true;
            case "nillItem":
                obj.cart = [];
                _localStorage.session = JSON.stringify(obj);
                
                return true;
            case "usr":
                obj.user = value;
                _localStorage.session = JSON.stringify(onj);
                return true;
        }
    },
    get: function (obj, prop) {
        if (prop == "cart") {
          return obj.cart;
        }
        if (prop == "user") {
          return obj.user;
        }
    },
});
function autoloadLocalStorage() {
    const sessionStorageContent = JSON.parse(_localStorage.getItem("session"));
    storagePx.initLocalStorage = sessionStorageContent;
  }
  
  const setCartBadge = () => _showCartBadge(storagePx.cart.length);
  
  export { storagePx, autoloadLocalStorage, setCartBadge };