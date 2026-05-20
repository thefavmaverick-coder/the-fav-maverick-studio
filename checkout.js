/* LOAD CART */

const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

/* ELEMENTS */

const checkoutItems =
document.getElementById(
"checkout-items"
);

const subtotalEl =
document.getElementById(
"subtotal"
);

const shippingEl =
document.getElementById(
"shipping"
);

const discountEl =
document.getElementById(
"discount"
);

const checkoutTotal =
document.getElementById(
"checkout-total"
);

/* VALUES */

let subtotal = 0;

let totalItems = 0;

let shipping = 80;

let discount = 0;

/* EMPTY CART */

if(cart.length===0){

checkoutItems.innerHTML = `

<div class="empty-cart">

<h3>Cart Empty 🛒</h3>

<p>Add products first</p>

<a href="index.html">

<button>

Back To Shop

</button>

</a>

</div>

`;

}

/* SHOW PRODUCTS */

else{

cart.forEach(item=>{

const price =

Number(
item.price
);

const qty =

Number(
item.qty
);

/* SUBTOTAL */

subtotal +=

price * qty;

/* TOTAL ITEMS */

totalItems += qty;

checkoutItems.innerHTML += `

<div class="checkout-item">

<img
src="${item.image}"

style="
width:90px;
height:90px;
object-fit:cover;
border-radius:12px;
">

<div>

<h4>

${item.name}

(${item.size})

</h4>

<p>

Qty :

${qty}

</p>

<p>

₹${price}

×

${qty}

</p>

</div>

</div>

`;

});

}



/* SHIPPING */

if(subtotal>=999){

shipping=0;

}

/* TOTAL */

let grandTotal =

subtotal +
shipping -
discount;

/* SHOW TOTAL */

subtotalEl.innerText =
subtotal;

shippingEl.innerText =

shipping===0

?

"FREE"

:

"₹80";

discountEl.innerText =
discount;

checkoutTotal.innerText =
grandTotal;


document.getElementById(
"total-items"
).innerText =
totalItems;

const qty = Number(item.qty);

totalItems += qty;


/* PAYMENT BOX */

const paymentOptions =

document.querySelectorAll(
'input[name="payment"]'
);

paymentOptions.forEach(
option=>{

option.addEventListener(
"change",

function(){

if(
this.value==="ONLINE"
){

document
.getElementById(
"upi-box"
)
.style.display=
"block";

}else{

document
.getElementById(
"upi-box"
)
.style.display=
"none";

}

}

);

});

/* PINCODE AUTO */

document
.getElementById(
"pincode"
)

.addEventListener(

"blur",

async()=>{

const pin =

document
.getElementById(
"pincode"
)
.value;

if(pin.length===6){

try{

const response =

await fetch(

`https://api.postalpincode.in/pincode/${pin}`

);

const data =
await response.json();

if(
data[0].Status==="Success"
){

document
.getElementById(
"city"
)

.value=

data[0]
.PostOffice[0]
.District;

document
.getElementById(
"state"
)

.value=

data[0]
.PostOffice[0]
.State;

}

}catch(error){

console.log(error);

}

}

}

);

/* PLACE ORDER */

function placeOrder(){

const name =
document.getElementById(
"name"
).value.trim();

const phone =
document.getElementById(
"phone"
).value.trim();

const email =
document.getElementById(
"email"
).value.trim();

const address =
document.getElementById(
"address"
).value.trim();

const city =
document.getElementById(
"city"
).value.trim();

const state =
document.getElementById(
"state"
).value.trim();

const pincode =
document.getElementById(
"pincode"
).value.trim();

const paymentMethod =

document.querySelector(
'input[name="payment"]:checked'
).value;

/* REQUIRED */

if(

name===""

||

phone===""

||

email===""

||

address===""

||

city===""

||

state===""

||

pincode===""

){

alert(
"Please fill complete delivery address"
);

return;

}

/* PHONE */

if(
phone.length!==10
){

alert(
"Enter valid 10 digit phone number"
);

return;

}

/* EMAIL */

if(
!email.includes("@")
){

alert(
"Enter valid email address"
);

return;

}

/* PINCODE */

if(
pincode.length!==6
){

alert(
"Enter valid pincode"
);

return;

}

/* ONLINE PAYMENT */

if(
paymentMethod==="ONLINE"
){

startRazorpay(
grandTotal
);

return;

}

/* COD */

alert(
"Order Placed Successfully ✅"
);

localStorage.removeItem(
"cart"
);

window.location.href=
"success.html";

}
