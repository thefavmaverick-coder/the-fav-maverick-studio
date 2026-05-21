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

if(order){

box.innerHTML = `

<h2>

Invoice

#${order.id}

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

Address :

${order.address}

</p>

<hr>

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

Total :

₹${order.total}

</h2>

`;

}