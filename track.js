async function trackOrder(){

const id =

document.getElementById(
"track-id"
).value;

const result =

document.getElementById(
"track-result"
);

const {

data,

error

} = await supabaseClient

.from(
"orders"
)

.select("*")

.eq(
"id",
id
)

.single();

if(error || !data){

result.innerHTML=

"Order Not Found";

return;

}

result.innerHTML = `

<div class="track-card">

<h2>

Order #

${data.id}

</h2>

<p>

📦 Status :

${data.status}

</p>

<p>

🚚 Courier :

${data.courier_name || "-"}

</p>

<p>

🔍 Tracking ID :

${data.tracking_id || "-"}

</p>

<p>

📅 Delivery :

${data.expected_delivery || "-"}

</p>

</div>

`;

}