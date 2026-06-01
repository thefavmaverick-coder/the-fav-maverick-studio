const order = JSON.parse(
localStorage.getItem("latestOrder")
);

const box = document.getElementById(
"invoice-content"
);

if(!order){

box.innerHTML = `

<div class="invoice-empty">

<h2>Invoice Not Found</h2>

<p>
No recent order available.
</p>

</div>

`;

}else{

let subtotal = 0;

(order.items || []).forEach(item=>{

subtotal +=
Number(item.price) *
Number(item.qty);

});

const shipping =
subtotal >= 999 ? 0 : 80;

box.innerHTML = `

<div class="invoice-section">

<h2>

Invoice # ${order.id}

</h2>

</div>

<div class="invoice-row">

<div>

<p><b>Customer Name</b></p>

<h3>${order.customer}</h3>

</div>

<div>

<p><b>Phone Number</b></p>

<h3>${order.phone}</h3>

</div>

</div>

<div class="invoice-section">

<p><b>Email Address</b></p>

<h3>${order.email}</h3>

</div>

<div class="invoice-section">

<p><b>Delivery Address</b></p>

<h3>

<h3 style="white-space:pre-line;">

${order.address || ""}

</h3>

</div>

<div class="invoice-row">

<div>

<p><b>Payment</b></p>

<h3>${order.payment}</h3>

</div>

<div>

<p><b>Status</b></p>

<h3>${order.status || "Confirmed"}</h3>

</div>

<div>

<p><b>Order Date</b></p>

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

${(order.items || []).map(item=>`

<div class="invoice-item">

<div>

<h3>

${item.name}

</h3>

<p>

Size:
${item.size}

</p>

<p>

Quantity:
${item.qty}

</p>

</div>

<div>

₹${Number(item.price) * Number(item.qty)}

</div>

</div>

`).join("")}

</div>

<hr>

<div class="invoice-summary">

<p>

Subtotal

<span>

₹${subtotal}

</span>

</p>

<p>

Shipping

<span>

${shipping===0 ? "FREE" : "₹80"}

</span>

</p>

<p class="invoice-grand">

Grand Total

<span>

₹${order.total}

</span>

</p>

</div>

`;

}
