const order =

JSON.parse(

localStorage.getItem(
"latestOrder"
)

);

const box =

document.getElementById(
"invoice-content"
);

if(!order){

box.innerHTML = `

<div class="invoice-empty">

No Invoice Found

</div>

`;

}else{

box.innerHTML = `

<div class="invoice-section">

<h2>

Invoice #

${order.id}

</h2>

</div>

<div class="invoice-section">

<p>

Customer

</p>

<h3>

${order.customer}

</h3>

</div>

<div class="invoice-section">

<p>

Phone Number

</p>

<h3>

${order.phone}

</h3>

</div>

<div class="invoice-section">

<p>

Delivery Address

</p>

<h3>

${order.address}

</h3>

</div>

<div class="invoice-row">

<div>

<p>

Payment Method

</p>

<h3>

${order.payment || "COD"}

</h3>

</div>

<div>

<p>

Status

</p>

<h3>

${order.status || "Confirmed"}

</h3>

</div>

<div>

<p>

Date

</p>

<h3>

${new Date(
order.date
).toLocaleDateString()}

</h3>

</div>

</div>

<hr>

<h2 class="invoice-title">

Order Items

</h2>

<div class="invoice-items">

${order.items.map(item=>`

<div class="invoice-item">

<div>

<h3>

${item.name}

</h3>

<p>

Size :
${item.size}

</p>

<p>

Quantity :
${item.qty}

</p>

</div>

<div>

₹${item.price}

</div>

</div>

`).join("")}

</div>

<div class="invoice-total">

Total Amount

₹${order.total}

</div>

`;

}
