
let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const productList =
document.getElementById("product-list");

const cartItems =
document.getElementById("cart-items");

const totalEl =
document.getElementById("total");

const cartCount =
document.getElementById("cart-count");

const overlay =
document.getElementById("overlay");

/* RENDER PRODUCTS */

function renderProducts(){

    productList.innerHTML = "";

    products.forEach(product => {

        const div =
        document.createElement("div");

        div.classList.add("product-card");

       div.innerHTML = `

<img src="${product.image}"
class="product-img"
onclick="
window.location.href=
'product.html?id=${product.id}'
"

<h3>${product.name}</h3>

<p class="price">
₹${product.sizes[0].price}
</p>

<select id="size-${product.id}"
class="size-select"
onchange="updatePrice(${product.id})">

${product.sizes.map(size => `

<option value="${size.size}"
data-price="${size.price}">

${size.size} - ₹${size.price}

</option>

`).join("")}

</select>

<button onclick="addToCart(${product.id})">

Add To Cart

</button>

`;

        productList.appendChild(div);

    });

}

/* UPDATE PRICE */

function updatePrice(id){

    const select =
    document.getElementById(`size-${id}`);

    const price =
    select.options[
        select.selectedIndex
    ].dataset.price;

    document
    .querySelectorAll(".product-card")
    .forEach(card => {

        if(
            card.innerHTML.includes(
                `size-${id}`
            )
        ){

            card.querySelector(".price")
            .innerText = `₹${price}`;

        }

    });

}

/* FILTER PRODUCTS */

function filterProducts(){

    const search =
    document
    .getElementById("search")
    .value
    .toLowerCase();

    const size =
    document
    .getElementById("size-filter")
    .value;

    productList.innerHTML = "";

    const filtered =
    products.filter(product => {

        /* SEARCH */

        const matchesSearch =

        product.name
        .toLowerCase()
        .includes(search);

        /* SIZE */

        const matchesSize =

        size === "All" ||

        product.sizes.some(s =>
            s.size === size
        );

        return matchesSearch &&
        matchesSize;

    });

    filtered.forEach(product => {

        const div =
        document.createElement("div");

        div.classList.add("product-card");

        div.innerHTML = `

        <img src="${product.image}"
        class="product-img"
        onclick="
        window.location.href=
        'product.html?id=${product.id}'
        "
        >

        <h3>${product.name}</h3>

        <p class="price">
        ₹${product.sizes[0].price}
        </p>

        <select id="size-${product.id}"
        class="size-select"
        onchange="updatePrice(${product.id})">

        ${product.sizes.map(size => `

        <option value="${size.size}"
        data-price="${size.price}">

        ${size.size} - ₹${size.price}

        </option>

        `).join("")}

        </select>

        <button onclick="addToCart(${product.id})">

        Add To Cart

        </button>

        `;

        productList.appendChild(div);

    });

}

/* ADD TO CART */

function addToCart(id){

    const product =
    products.find(p => p.id === id);

    const sizeSelect =
    document.getElementById(`size-${id}`);

    const selectedSize =
    sizeSelect.value;

    const selectedOption =
    product.sizes.find(
        s => s.size === selectedSize
    );

    const cartItem =
    cart.find(item =>

        item.id === id &&
        item.size === selectedSize

    );

    if(cartItem){

        cartItem.qty++;

    }else{

        cart.push({

            id:product.id,

            name:product.name,

            image:product.image,

            size:selectedSize,

            price:selectedOption.price,

            qty:1

        });

    }

    saveCart();

    updateCart();

}

/* UPDATE CART */

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

        count += item.qty;

        const div =
        document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `

        <img src="${item.image}">

        <div class="cart-info">

           <h4>
${item.name}
(${item.size})
</h4>

            <p>
            ₹${item.price} x ${item.qty}
            </p>

            <div class="qty-box">

                <button onclick="changeQty(${item.id},'${item.size}',-1)">
-
</button>

<button onclick="changeQty(${item.id},'${item.size}',1)">
+
</button>

            </div>

            <button class="remove-btn"
onclick="removeItem(${item.id},'${item.size}')">
Remove
</button>

        </div>

        `;

        cartItems.appendChild(div);

    });

    totalEl.innerText = total;

    cartCount.innerText = count;
    saveCart();

}

/* QUANTITY */

function changeQty(id,size,change){

    const item = cart.find(p =>

        p.id === id &&
        p.size === size

    );

    if(!item) return;

    item.qty += change;

    if(item.qty <= 0){

        cart = cart.filter(p => !(

            p.id === id &&
            p.size === size

        ));

    }

    saveCart();

    updateCart();

}

/* REMOVE */

function removeItem(id,size){

    cart = cart.filter(p => !(

        p.id === id &&
        p.size === size

    ));

    saveCart();

    updateCart();

}

/* STORAGE */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* TOGGLE CART */

function toggleCart(){

    document
    .getElementById("cart")
    .classList.toggle("active");

    overlay.classList.toggle("active");

}

/* SCROLL */

function scrollProducts(){

    document
    .getElementById("products")
    .scrollIntoView({
        behavior:"smooth"
    });

}

/* PRODUCT POPUP */

function openPopup(id){

    const product =
    products.find(p => p.id === id);

    document
    .getElementById("popup-img")
    .src = product.image;

    document
    .getElementById("popup-title")
    .innerText = product.name;

    /* FIRST SIZE PRICE */

    document
    .getElementById("popup-price")
    .innerText =
    "₹" + product.sizes[0].price;

    document
    .getElementById("popup-desc")
    .innerText = product.desc;

    /* ADD SIZE OPTIONS */

    let sizeHTML = `

    <select id="popup-size"
    class="size-select">

    ${product.sizes.map(size => `

    <option value="${size.size}"
    data-price="${size.price}">

    ${size.size} - ₹${size.price}

    </option>

    `).join("")}

    </select>

    `;

    document
    .getElementById("popup-desc")
    .innerHTML += sizeHTML;

    /* CHANGE PRICE WHEN SIZE CHANGES */

    setTimeout(() => {

        document
        .getElementById("popup-size")
        .addEventListener("change",

        function(){

            const selectedPrice =

            this.options[
                this.selectedIndex
            ].dataset.price;

            document
            .getElementById("popup-price")
            .innerText =
            "₹" + selectedPrice;

        });

    },100);

    /* ADD TO CART */

    document
    .getElementById("popup-btn")
    .onclick = () => {

        const selectedSize =

        document
        .getElementById("popup-size")
        .value;

        const selectedOption =

        product.sizes.find(s =>

            s.size === selectedSize

        );

        const cartItem =

        cart.find(item =>

            item.id === product.id &&
            item.size === selectedSize

        );

        if(cartItem){

            cartItem.qty++;

        }else{

            cart.push({

                id:product.id,

                name:product.name,

                image:product.image,

                size:selectedSize,

                price:selectedOption.price,

                qty:1

            });

        }

        saveCart();

        updateCart();

        closePopup();

    };

    document
    .getElementById("popup")
    .classList.add("active");

}

/* CLOSE POPUP */

function closePopup(){
    
    document
    .getElementById("popup")
    .classList.remove("active");

}

/* START */

renderProducts();

updateCart();

function goToCheckout(){

    if(cart.length === 0){

        alert("Cart is empty");

        return;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href =
    "checkout.html";

}

/* REVIEWS */

let reviews = JSON.parse(
localStorage.getItem("reviews")
) || [];

/* SHOW REVIEWS */

function renderReviews(){

const container =
document.getElementById(
"review-container"
);

if(!container) return;

container.innerHTML = "";

reviews.forEach((review,index) => {

container.innerHTML += `

<div class="review-box">

<h3>
${"⭐".repeat(review.rating)}
</h3>

<p>
${review.text}
</p>

<h4>

— ${review.name}

</h4>

<p class="review-date">

${new Date().toLocaleDateString()}

</p>

<button class="delete-review"
onclick="deleteReview(${index})">

Delete

</button>

</div>

`;

});

}

/* ADD REVIEW */

function addReview(){

const name =
document.getElementById(
"review-name"
).value;

const rating =
document.getElementById(
"review-rating"
).value;

const text =
document.getElementById(
"review-text"
).value;

if(
name === "" ||
text === ""
){

alert("Please fill all fields");

return;
}

reviews.unshift({

name:name,

rating:rating,

text:text

});

localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);

document.getElementById(
"review-name"
).value = "";

document.getElementById(
"review-text"
).value = "";

renderReviews();

}

/* START REVIEWS */

renderReviews();

/* DELETE REVIEW */

function deleteReview(index){

reviews.splice(index,1);

localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);

renderReviews();

}