async function trackOrder(){

const orderId =

document.getElementById(
"track-id"
).value.trim();

if(!orderId){

alert(
"Enter Order ID"
);

return;

}

try{

const response = await fetch(
`https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec?orderId=${orderId}`
);

const data =

await response.json();

const result =

document.getElementById(
"track-result"
);

if(!data.found){

result.innerHTML =

"<h3>❌ Order Not Found</h3>";

return;

}

result.innerHTML = `

<div class="track-card">

<h2>📦 Order #${data.orderId}</h2>

<p>👤 Customer: <b>${data.customer}</b></p>

<p>💰 Total: <b>₹${data.total}</b></p>

<p>💳 Payment: <b>${data.payment}</b></p>

<p>✅ Status: <b>${data.status}</b></p>

<p>🚚 Courier: <b>${data.courier || "-"}</b></p>

<p>🔍 Tracking ID: <b>${data.trackingId || "-"}</b></p>

<p>📅 Expected Delivery: <b>${data.expectedDelivery || "-"}</b></p>

</div>

`;

}catch(error){

console.log(error);

alert(
"Tracking unavailable"
);

}

}
