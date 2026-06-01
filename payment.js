function startRazorpay(total){

const options = {

key:
"rzp_live_Ss2wR4oKoWhCAT",

amount:
total * 100,

currency:
"INR",

name:
"The Fav' Maverick Studio",

description:
"Poster Order",

prefill:{

name:
document
.getElementById("name")
.value,

email:
document
.getElementById("email")
.value,

contact:
document
.getElementById("phone")
.value

},

config:{

display:{

blocks:{

upiBlock:{

name:"UPI Payment",

instruments:[
{
method:"upi"
}
]

},

cardBlock:{

name:"Cards",

instruments:[
{
method:"card"
}
]

},

bankBlock:{

name:"Banking",

instruments:[

{
method:"netbanking"
},

{
method:"wallet"
}

]

}

},

sequence:[
"upiBlock",
"cardBlock",
"bankBlock"
],

preferences:{
show_default_blocks:true
}

}

},

handler: async function(response){

alert(
"Payment Successful ✅"
);

/* GET ORDER */

const order =
JSON.parse(
localStorage.getItem(
"pendingOrder"
)
);

try{

await fetch(
"https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec",
{
method:"POST",

mode:"no-cors",

body:JSON.stringify({

orderId: order.id,

customer: order.customer,

phone: order.phone,

email: order.email,

address: order.address,

products: order.items,

total: order.total,

payment: "ONLINE PAID",

paymentId:
response.razorpay_payment_id

})

}
);

console.log(
"Online Order Saved"
);

}catch(error){

console.log(
"Google Sheets Error",
error
);

}

/* SAVE LAST ORDER */

if(order){

localStorage.setItem(

"latestOrder",

JSON.stringify(order)

);

}

/* CLEAR CART */

localStorage.removeItem(
"cart"
);

localStorage.removeItem(
"pendingOrder"
);

/* SUCCESS PAGE */

window.location.href =
"success.html";

},

modal:{

ondismiss:function(){

alert(
"Payment Cancelled ❌"
);

localStorage.removeItem(
"pendingOrder"
);

}

},

theme:{

color:"#facc15"

}

};

const rzp =
new Razorpay(options);

/* PAYMENT FAILED */

rzp.on(
"payment.failed",
function(response){

alert(
"Payment Failed ❌ Please Try Again"
);

console.log(
response.error
);

}
);

rzp.open();

}
