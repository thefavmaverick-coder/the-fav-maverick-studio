const password = prompt(
"Enter Admin Password"
);

if(password !== "Ambirajan@2005"){

document.body.innerHTML =
"<h1>Access Denied</h1>";

throw new Error("Unauthorized");

}

let allOrders = [];

async function loadOrders(){

const container =
document.getElementById(
"orders-container"
);

container.innerHTML =
"Loading Orders...";

try{

const response =
await fetch(

"https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec?action=allOrders"

);

const orders =
await response.json();

allOrders = orders;

document.getElementById(
"total-orders"
).innerText =
orders.length;

let sales = 0;

orders.forEach(order=>{

sales +=
Number(order.total || 0);

});

document.getElementById(
"total-sales"
).innerText =
"₹" + sales;

renderOrders(
orders.reverse()
);

}catch(error){

console.log(error);

document.getElementById(
"orders-container"
).innerHTML =
"Unable To Load Orders";

}

}

function renderOrders(orders){

const container =
document.getElementById(
"orders-container"
);

container.innerHTML = "";

orders.forEach(order=>{

container.innerHTML += `

<div class="order-card">

<div class="order-id">
📦 ${order.orderId}
</div>

<p>
👤 <b>${order.customer}</b>
</p>

<p>
📱 ${order.phone}
</p>

<p>
💰 ₹${order.total}
</p>

<p>
📅 ${new Date(order.date).toLocaleDateString()}
</p>

<p>
💳 ${order.payment}
</p>

<p>
🖼️ ${order.products}
</p>

<p>
📦 Status:
<span class="status">
${order.status}
</span>
</p>

<p>
🚚 Tracking:
${order.trackingId || "-"}
</p>

<button
class="invoice-btn"
onclick="viewInvoice('${order.orderId}')">

🧾 View Invoice

</button>

</div>

`;

});

}

function searchOrders(){

const value =

document.getElementById(
"search-order"
).value.toLowerCase();

const filtered =

allOrders.filter(order=>

String(order.orderId)
.toLowerCase()
.includes(value)

);

renderOrders(filtered);

}

function viewInvoice(orderId){

window.open(

`invoice.html?id=${orderId}`,

"_blank"

);

}

loadOrders();
