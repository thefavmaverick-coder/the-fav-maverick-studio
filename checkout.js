
/* LOAD CUSTOMER PROFILE */

loadProfile();

async function loadProfile(){

try{

const {

data:userData

} = await supabaseClient

.auth

.getUser();

if(
!userData.user
){

return;

}

const email =

userData.user.email;

/* GET PROFILE */

const {

data

} = await supabaseClient

.from(
"profiles"
)

.select("*")

.eq(
"email",
email
)

.maybeSingle();
if(
!data
){

return;

}
const {
data:{user}
} = await supabaseClient
.auth
.getUser();

if(!user){

alert(
"Please login first"
);

window.location.href =
"login.html";

}

/* AUTO FILL */

document.getElementById(
"name"
).value =

data.full_name || "";

document.getElementById(
"phone"
).value =

data.phone || "";

document.getElementById(
"email"
).value =

data.email || email;

document.getElementById(
"address"
).value =

data.address || "";

document.getElementById(
"city"
).value =

data.city || "";

document.getElementById(
"state"
).value =

data.state || "";

document.getElementById(
"pincode"
).value =

data.pincode || "";

}catch(error){

console.log(
error
);

}

}


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

checkoutTotal.innerText = 0;

subtotalEl.innerText = 0;

shippingEl.innerText = 0;

discountEl.innerText = 0;
document.querySelector(
".place-btn"
).disabled = true;

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

if(!response) return;

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
.Name;

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
async function placeOrder(){
    const btn =
document.querySelector(
".place-btn"
);

btn.disabled = true;

btn.innerText =
"Processing...";

if(
!cart ||
cart.length === 0
){

alert(
"Your cart is empty. Please add products before placing an order."
);

btn.disabled = false;

btn.innerText =
"Proceed To Payment";

window.location.href =
"index.html";

return;

}


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
const door =
document.getElementById("door").value.trim();

const street =
document.getElementById("street").value.trim();

const area =
document.getElementById("area").value.trim();

const district =
document.getElementById("district").value.trim();

const city =
document.getElementById(
"city"
).value.trim();

const state =
document.getElementById(
"state"
).value.trim();
const country =
document.getElementById("country").value.trim();

const pincode =
document.getElementById(
"pincode"
).value.trim();

const paymentMethod =

document.querySelector(
'input[name="payment"]:checked'
).value;

const fullAddress = [

door ? `Door: ${door}` : "",

street ? `Street: ${street}` : "",

area ? `Area: ${area}` : "",

address ? `Address: ${address}` : "",

city ? `City: ${city}` : "",

district ? `District: ${district}` : "",

state ? `State: ${state}` : "",

country ? `Country: ${country}` : "",

pincode ? `Pincode: ${pincode}` : ""

]
.filter(Boolean)
.join("\n");

/* REQUIRED FIELDS */

if(
!name ||
!phone ||
!email ||
!address ||
!city ||
!state ||
!pincode
){

btn.disabled = false;

btn.innerText =
"Proceed To Payment";

alert(
"Please fill all required delivery details."
);

return;

}


/* PHONE VALIDATION */
if(
!/^[0-9]{10}$/
.test(phone)
){

btn.disabled = false;

btn.innerText =
"Proceed To Payment";

alert(
"Enter Valid 10 Digit Phone Number"
);

return;

}

/* PINCODE VALIDATION */

if(pincode.length!==6){

btn.disabled = false;

btn.innerText =
"Proceed To Payment";

alert(
"Enter valid pincode"
);

return;

}

if(
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email)
){

alert(
"Enter Valid Email Address"
);

btn.disabled = false;

btn.innerText =
"Proceed To Payment";

return;

}


/* CREATE ORDER */

const order = {

id:
"FM" +
Math.floor(
100000 + Math.random() * 900000
),

customer:
name,

phone:
phone,

email:
email,

address:
fullAddress,

city:
city,

state:
state,

pincode:
pincode,

payment:
paymentMethod,

items:
cart,

total:
grandTotal,

status:
"Confirmed",

date:
new Date()

};

/* SAVE INVOICE */

localStorage.setItem(

"latestOrder",

JSON.stringify(
order
)

);

/* EMAIL TEMPORARILY DISABLED */

try{

await emailjs.send(

"service_favmaverick",

"template_favmaverick",

{

customer_name:name,

customer_email:email,

order_id:order.id,

total:grandTotal,

status:"Confirmed"

}

);

console.log("Email Sent ✅");

}catch(error){

console.log(error);

}

/* ONLINE PAYMENT */

if(
paymentMethod==="ONLINE"
){

localStorage.setItem(
"pendingOrder",
JSON.stringify(order)
);

startRazorpay(
grandTotal
);

return;

}
/* SAVE TO GOOGLE SHEETS */

try{

await fetch(
"https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec",
{
method:"POST",

mode:"no-cors",

body:JSON.stringify({

orderId: order.id,

customer: name,

phone: phone,

email: email,

address: fullAddress,

products: cart.map(item =>

`${item.name} | Image: ${item.image.split("/").pop()} | Size: ${item.size} | Qty: ${item.qty} | Price: ₹${item.price}`

).join(" || "),
total: grandTotal,

payment: paymentMethod

})

}
);

console.log(
"Google Sheets Request Sent"
);

}catch(error){

console.error(
"Google Sheets Error:",
error
);

}

/* SAVE ORDER FOR INVOICE */

localStorage.setItem(

"latestOrder",

JSON.stringify({

id: order.id,

customer: name,

phone: phone,

email: email,

address: fullAddress,

items: cart,

total: grandTotal,

payment: paymentMethod,

status: "NEW ORDER",

date: new Date()

})

);
/* COD SUCCESS */

alert(
"Order Placed Successfully ✅"
);

setTimeout(() => {

localStorage.removeItem(
"cart"
);

window.location.href =
"success.html";

}, 500);
}