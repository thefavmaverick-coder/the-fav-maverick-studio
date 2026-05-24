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

image:

"images/QrCode.jpeg",

prefill:{

name:

document
.getElementById(
"name"
).value,

email:

document
.getElementById(
"email"
).value,

contact:

document
.getElementById(
"phone"
).value

},

config:{

display:{

blocks:{

upiBlock:{

name:

"UPI Payment",

instruments:[

{

method:"upi"

}

]

},

cardBlock:{

name:

"Cards",

instruments:[

{

method:"card"

}

]

},

bankBlock:{

name:

"Banking",

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

handler:function(response){

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

/* SAVE LAST ORDER */

if(order){

localStorage.setItem(

"latestOrder",

JSON.stringify(
order
)

);

}

/* CLEAR CART */

localStorage.removeItem(
"cart"
);

localStorage.removeItem(
"pendingOrder"
);

/* SUCCESS */

window.location.href=

"success.html";

},

theme:{

color:"#facc15"

}

};

const rzp =

new Razorpay(
options
);

rzp.open();

}