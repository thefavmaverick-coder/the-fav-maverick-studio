async function loadMyOrders(){

const {

data:userData,

error:userError

} = await supabaseClient

.auth

.getUser();

if(
userError ||
!userData.user
){

window.location.href=

"login.html";

return;

}

const email =

userData.user.email;

const box =

document.getElementById(
"my-orders-list"
);

box.innerHTML=

"Loading Orders...";

const {

data,

error

} = await supabaseClient

.from(
"orders"
)

.select("*")

.eq(
"email",
email
)

.order(
"created_at",
{
ascending:false
}
);

if(error){

box.innerHTML=

"Error Loading Orders";

return;

}

if(data.length===0){

box.innerHTML=`

<h2>

No Orders Found

</h2>

`;

return;

}

box.innerHTML="";

data.forEach(
order=>{

box.innerHTML += `

<div class="my-order-card">

<h2>

Order #

${order.id}

</h2>

<p>

📦 Status :

${order.status}

</p>

<p>

💰 Total :

₹${order.total}

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

</div>

`;

});

}

loadMyOrders();

async function logoutUser(){

await supabaseClient
.auth
.signOut();

window.location.href =
"login.html";

}