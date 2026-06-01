const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(!user){

window.location.href=

"login.html";

}

/* LOAD ORDERS */

loadMyOrders();

async function loadMyOrders(){

try{

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

if(
!data ||
data.length===0
){

box.innerHTML=`

<h2>

No Orders Found 🛒

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

📦 Order #

${order.id}

</h2>

<p>

💰 Total :

₹${order.total}

</p>

<p>

📦 Status :

${order.status || "Confirmed"}

</p>

<p>

💳 Payment :

${order.payment_method || "-"}

</p>

<p>

🚚 Courier :

${order.courier_name || "-"}

</p>

<p>

🔍 Tracking ID :

${order.tracking_id || "-"}

</p>

<p>

📅 Delivery :

${order.expected_delivery || "-"}

</p>

<p>

🕒 Date :

${new Date(
order.created_at
).toLocaleDateString()}

</p>

</div>

`;

});

}catch(err){

console.log(
err
);

}

}

/* LOGOUT */

async function logoutUser(){

await supabaseClient

.auth

.signOut();

window.location.href=

"login.html";

}

