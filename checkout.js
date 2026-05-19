const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems =
document.getElementById("checkout-items");

const checkoutTotal =
document.getElementById("checkout-total");

let total = 0;

/* SHOW PRODUCTS */

if(cart.length === 0){

    checkoutItems.innerHTML =

    "<p>Your cart is empty</p>";

}else{

    cart.forEach(item => {

        total += item.price * item.qty;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img src="${item.image}">

            <div>

                <h4>
                ${item.name}
                (${item.size})
                </h4>

                <p>
                ₹${item.price}
                x ${item.qty}
                </p>

            </div>

        </div>

        `;

    });

}

checkoutTotal.innerText = total;

/* PAYMENT METHOD */

const paymentOptions =

document.querySelectorAll(
'input[name="payment"]'
);

paymentOptions.forEach(option => {

    option.addEventListener(

        "change",

        function(){

            if(this.value === "UPI"){

                document
                .getElementById("upi-box")
                .style.display = "block";

            }else{

                document
                .getElementById("upi-box")
                .style.display = "none";

            }

        }

    );

});

/* PLACE ORDER */

function placeOrder(){

    const name =
    document.getElementById("name").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const address =
    document.getElementById("address").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const state =
    document.getElementById("state").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();

    const paymentMethod =

    document.querySelector(
    'input[name="payment"]:checked'
    ).value;

    /* REQUIRED CHECK */

    if(

        name === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === ""

    ){

        alert(
        "Please fill all required details"
        );

        return;
    }

    /* PHONE CHECK */

    if(phone.length !== 10){

        alert(
        "Enter valid 10 digit phone number"
        );

        return;
    }

    /* PINCODE CHECK */

    if(pincode.length < 6){

        alert(
        "Enter valid pincode"
        );

        return;
    }

    /* SAVE ORDER */

    const order = {

        customer:name,

        phone:phone,

        address:address,

        city:city,

        state:state,

        pincode:pincode,

        payment:paymentMethod,

        items:cart,

        total:total,

        date:new Date()

    };

    localStorage.setItem(

        "latestOrder",

        JSON.stringify(order)

    );

    /* SUCCESS */

  /* WHATSAPP MESSAGE */

let message =

`🛍️ NEW ORDER - The_Fav'Maverick_Studio

👤 Name : ${name}

📞 Phone : ${phone}

🏠 Address : ${address}

🌆 City : ${city}

🗺️ State : ${state}

📮 Pincode : ${pincode}

💳 Payment : ${paymentMethod}

------------------------

`;

cart.forEach(item => {

message +=

`📦 ${item.name}

📏 Size : ${item.size}

🔢 Qty : ${item.qty}

💰 Price : ₹${item.price}

------------------------

`;

});

message +=

`🧾 TOTAL : ₹${total}`;

/* YOUR NUMBER */

const whatsappNumber =

"916369624206";

/* OPEN WHATSAPP */

const whatsappURL =

`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

window.open(
whatsappURL,
"_blank"
);

/* CLEAR CART */

localStorage.removeItem("cart");

/* REDIRECT */

window.location.href =
"success.html";

    /* CLEAR CART */

    localStorage.removeItem("cart");

    /* REDIRECT */

    window.location.href =
    "success.html";

}