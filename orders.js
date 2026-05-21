const orders =

JSON.parse(
localStorage.getItem(
"orders"
)
)||[];

const orderList =

document.getElementById(
"orders-list"
);

/* EMPTY */

if(
orders.length===0
){

orderList.innerHTML = `

<div class="empty-orders">

<h2>

No Orders Yet 🛒

</h2>

<p>

Place your first order

</p>

<a href="index.html">

<button>

Continue Shopping

</button>

</a>

</div>

`;

}

/* SHOW ORDERS */

else{

orders.reverse().forEach(
order=>{

/* TRACKING */

const stages = [

"Confirmed",

"Printing",

"Packed",

"Shipped",

"Delivered"

];

let trackingHTML = "";

stages.forEach(
stage=>{

trackingHTML += `

<div class="track

${order.status===stage ?

"active"

:

""}

">

${stage}

</div>

`;

});

orderList.innerHTML += `

<div class="order-card">

<h2>

Order #

${order.id}

</h2>

<p>

👤 Customer :

${order.customer}

</p>

<p>

💳 Payment :

${order.payment}

</p>

<p>

💰 Total :

₹${order.total}

</p>
<p>

📞 Phone :

${order.phone}

</p>

<p>

📧 Email :

${order.email}

</p>

<p>

🏠 Address :

${order.address}

</p>

<p>

🌆 City :

${order.city}

</p>

<p>

🗺 State :

${order.state}

</p>
<p>

📮 Pincode :

${order.pincode}

</p>

<p>

📅 Date :

${new Date(
order.date
).toLocaleDateString()}

</p>

<hr>

<h3>

🛍 Ordered Products

</h3>

${order.items.map(item=>`

<div class="product-line">

📦 ${item.name}

<br>

📏 Size :

${item.size}

<br>

🔢 Qty :

${item.qty}

<br>

💰 ₹${item.price}

</div>

`).join("")}

<br>

<button
class="print-btn"
onclick="printOrder(${order.id})">

🖨 Print Order

</button>

<div class="tracking">

${trackingHTML}

</div>

<select
onchange="updateStatus(

${order.id},

this.value

)"

class="status-select">

<option>

Change Status

</option>

<option value="Confirmed">

Confirmed

</option>

<option value="Printing">

Printing

</option>

<option value="Packed">

Packed

</option>

<option value="Shipped">

Shipped

</option>

<option value="Delivered">

Delivered

</option>

</select>

`;

});

}

function printOrder(id){

const orders =

JSON.parse(
localStorage.getItem(
"orders"
)
)||[];

const order =

orders.find(
x=>x.id===id
);

let printWindow =

window.open(
"",
"_blank"
);

printWindow.document.write(`

<h1>

The Fav' Maverick Studio

</h1>

<hr>

<h2>

Order #

${order.id}

</h2>

<p>

Customer :

${order.customer}

</p>

<p>

Phone :

${order.phone}

</p>

<p>

Email :

${order.email}

</p>

<p>

Address :

${order.address}

${order.city}

${order.state}

${order.pincode}

</p>

<hr>

<h3>

Products

</h3>

${order.items.map(item=>`

<p>

${item.name}

|

${item.size}

|

Qty :

${item.qty}

|

₹${item.price}

</p>

`).join("")}

<hr>

<h2>

TOTAL :

₹${order.total}

</h2>

`);

printWindow.print();

}

function updateStatus(

id,

status

){

let orders =

JSON.parse(
localStorage.getItem(
"orders"
)
)||[];

orders = orders.map(order=>{

if(
order.id===id
){

order.status=
status;

}

return order;

});

localStorage.setItem(

"orders",

JSON.stringify(
orders
)

);

location.reload();

}