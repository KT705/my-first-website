const openNavbr = document.querySelector("#opennavbr");
const navbr = document.querySelector(".navbar");
const closeNavbr = document.querySelector("#closenavbr");
openNavbr.addEventListener("click", () => navbr.classList.add("active"));
closeNavbr.addEventListener("click", () => navbr.classList.remove("active"));

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close")
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"))

//-------------------add to Cart---------------
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productcards = event.target.closest(".card")
        addToCart(productcards);
    });
});

const cartContainer = document.querySelector(".cart-container");
const addToCart = productcards => {
    const cardImgSrc = productcards.querySelector("img").src;
    const cardTitle = productcards.querySelector(".product-title").textContent;
    const cardPrice = productcards.querySelector(".price").textContent;

//---------------------------add to cart notification-------------------
    const cartItems = cartContainer.querySelectorAll(".cart-product-title");
    for(let item of cartItems){
        if(item.textContent === cardTitle){
            alert("This item is already in the cart");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${cardImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${cardTitle}</h2>
            <span class="cart-product-price">${cardPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <img class="cart-remove" src="delete-bin-2-line.png"></img>
    `;

    cartContainer.appendChild(cartBox);

//-------------------deleting items from cart----------------------

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    //---------------------increment and decrement buttons-----------------
    
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            if(quantity === 1){
              decrementButton.style.color = "#999";
            }
        }else if(event.target.id === "increment"){
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

//----------------------------total price-------------------------------------------------

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContainer.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-product-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};


let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".item-count");
    cartItemCount += change;
    if(cartItemCount > 0){
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    }else{
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

//--------------------------buy now button-----------------------------

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContainer.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0){
        alert("Your cart is empty please add items.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase");
});

//-------------------gallery add to Cart---------------
const galleryAddToCartButtons = document.querySelectorAll(".gallery-add-to-cart");
galleryAddToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const galleryProductCard = event.target.closest(".gallery-card");
        // Use the same addToCart logic, but adapt for gallery card structure
        if (galleryProductCard) {
            // Temporarily map gallery card to menu card structure for addToCart
            // Create a fake card object with expected selectors
            const galleryCard = {
                querySelector: function(sel) {
                    if (sel === "img") return galleryProductCard.querySelector("img");
                    if (sel === ".product-title") return galleryProductCard.querySelector(".gallery-product-title");
                    if (sel === ".price") return galleryProductCard.querySelector(".gallery-price");
                    return galleryProductCard.querySelector(sel);
                }
            };
            addToCart(galleryCard);
        }
    });
});
