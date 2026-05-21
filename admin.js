let orders =

JSON.parse(
localStorage.getItem(
"orders"
)
)||[];

const box =

document.getElementById(
"admin-orders"
);

loadOrders();

function loadOrders(){

box.innerHTML="";

if(
orders.length===0
){

box.innerHTML=`

<h2>

No Orders

</h2>

`;

return;

}

orders.reverse().forEach(
order=>{

box.innerHTML += `

<div class="admin-card">

<h2>

Order #

${order.id}

</h2>

<p>

👤

${order.customer}

</p>

<p>

📞

${order.phone}

</p>

<p>

📧

${order.email}

</p>

<p>

🏠

${order.address}

</p>

<p>

💰

₹${order.total}

</p>

<p>

Status :

${order.status}

</p>

<div class="admin-buttons">

<button
onclick="updateOrder(

${order.id},

'Confirmed'

)">

Confirmed

</button>

<button
onclick="updateOrder(

${order.id},

'Printing'

)">

Printing

</button>

<button
onclick="updateOrder(

${order.id},

'Packed'

)">

Packed

</button>

<button
onclick="updateOrder(

${order.id},

'Shipped'

)">

Shipped

</button>

<button
onclick="updateOrder(

${order.id},

'Delivered'

)">

Delivered

</button>

</div>

<button
onclick="printOrder(
${order.id}
)">

🖨 Print

</button>

</div>

`;

});

}

function updateOrder(

id,

status

){

orders = orders.map(
order=>{

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

loadOrders();

}

function printOrder(id){

window.open(

"orders.html",

"_blank"

);

}