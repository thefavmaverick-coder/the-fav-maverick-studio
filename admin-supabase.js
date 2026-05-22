const ADMIN_EMAIL = "thefavmaverick@gmail.com";

/* CHECK ADMIN ACCESS */

async function checkAdmin(){

const {
data:{user}

} = await supabaseClient.auth.getUser();

if(!user){

window.location.href = "login.html";
return;

}

if(user.email !== ADMIN_EMAIL){

alert("Access Denied ❌");

window.location.href = "index.html";

return;

}

loadOrders();

}

/* LOAD ORDERS */

async function loadOrders(){

const {
data,
error

} = await supabaseClient

.from("orders")

.select("*")

.order(
"created_at",
{
ascending:false
}
);

const box =

document.getElementById(
"admin-orders"
);

box.innerHTML = "";

if(error){

box.innerHTML =
"Error loading orders";

return;

}

if(!data || data.length===0){

box.innerHTML =
"No Orders";

return;

}

data.forEach(order=>{

box.innerHTML += `

<div class="admin-card">

<h2>
Order #${order.id}
</h2>

<p>
👤 ${order.customer_name}
</p>

<p>
📞 ${order.phone}
</p>

<p>
📧 ${order.email}
</p>

<p>
🏠 ${order.address}
</p>

<p>
💰 ₹${order.total}
</p>

<p>
📦 Status :
${order.status || "Confirmed"}
</p>

<p>
🚚 Courier :
${order.courier_name || "-"}
</p>

<p>
🔍 Tracking :
${order.tracking_id || "-"}
</p>

<p>
📅 Delivery :
${order.expected_delivery || "-"}
</p>

<select
onchange="
updateStatus(
'${order.id}',
this.value
)
">

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

<br><br>

<input
type="text"
id="courier-${order.id}"
placeholder="Courier Name"
>

<br><br>

<input
type="text"
id="tracking-${order.id}"
placeholder="Tracking ID"
>

<br><br>

<input
type="date"
id="delivery-${order.id}"
>

<br><br>

<button
onclick="
saveTracking(
'${order.id}'
)
">

Save Tracking

</button>

<button
onclick="
sendWhatsApp(
'${order.phone}',
'${order.customer_name}',
'${order.status || "Confirmed"}',
'${order.tracking_id || ""}'
)
">

📲 Notify Customer

</button>

</div>

`;

});

}

/* UPDATE STATUS */

async function updateStatus(
id,
status
){

await supabaseClient

.from("orders")

.update({
status:status
})

.eq(
"id",
id
);

loadOrders();

}

/* SAVE TRACKING */

async function saveTracking(id){

const courier =

document.getElementById(
`courier-${id}`
).value;

const tracking =

document.getElementById(
`tracking-${id}`
).value;

const delivery =

document.getElementById(
`delivery-${id}`
).value;

await supabaseClient

.from("orders")

.update({

courier_name:
courier,

tracking_id:
tracking,

expected_delivery:
delivery

})

.eq(
"id",
id
);

alert(
"Tracking Saved ✅"
);

loadOrders();

}

/* WHATSAPP */

function sendWhatsApp(
phone,
customer,
status,
tracking
){

const message =

`Hello ${customer}

Your order status:

${status}

Tracking ID:

${tracking}

Thank you for shopping with The Fav' Maverick Studio`;

const url =

`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

window.open(
url,
"_blank"
);

}

/* START */

checkAdmin();