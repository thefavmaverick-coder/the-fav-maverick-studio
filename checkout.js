
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

.single();

if(
!data
){

return;

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
checkoutTotal.innerText = 0;

subtotalEl.innerText = 0;

shippingEl.innerText = 0;

discountEl.innerText = 0;

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

    /* CHECK LOGIN */

const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(!user){

alert(
"Please login before placing order"
);

window.location.href=

"login.html";

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

/* VALIDATION */

if(
!name ||
!phone ||
!email ||
!address ||
!city ||
!state ||
!pincode
){

alert(
"Please fill complete delivery address"
);

return;

}

if(phone.length!==10){

alert(
"Enter valid phone number"
);

return;

}

if(pincode.length!==6){

alert(
"Enter valid pincode"
);

return;

}

/* CREATE ORDER */

const order = {

id:
Date.now(),

customer:
name,

phone:
phone,

email:
email,

address:
address,

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

/* EMAIL */

try{

emailjs.send(

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

}catch(error){

console.log(error);

}

/* SAVE TO SUPABASE */

try{

const {
data:{user}

} = await supabaseClient
.auth
.getUser();

await supabaseClient

.from(
"orders"
)

.insert([{

customer_name:
name,

phone:
phone,

email:
email,

address:
address,

city:
city,

state:
state,

pincode:
pincode,

payment_method:
paymentMethod,

items:
cart,

total:
grandTotal,

status:
"Confirmed",

courier_name:
"",

tracking_id:
"",

expected_delivery:
""

}]);

for(const item of cart){

await supabaseClient

.from(
"order_items"
)

.insert([{

order_id:

order.id,

product_name:

item.name,

size:

item.size,

qty:

item.qty || 1,

price:

item.price,

image:

item.image

}]);

}

}catch(error){

console.log(
"Supabase Error",
error
);

alert(
"Order save failed ❌"
);

return;

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

/* COD SUCCESS */

alert(
"Order Placed Successfully ✅"
);

localStorage.removeItem(
"cart"
);

window.location.href=
"success.html";

}

