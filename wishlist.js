let wishlist =

JSON.parse(
localStorage.getItem(
"wishlist"
)
)||[];

const box =

document.getElementById(
"wishlist-items"
);

function loadWishlist(){

box.innerHTML="";

if(
wishlist.length===0
){

box.innerHTML=`

<h3>

No Wishlist Items

</h3>

`;

return;

}

wishlist.forEach(
item=>{

box.innerHTML += `

<div class="wish-card">

<img
src="${item.image}">

<h3>

${item.name}

</h3>

<p>

₹${item.price}

</p>

<button
onclick="moveCart(${item.id})">

Add To Cart

</button>

</div>

`;

});

}

function moveCart(id){

const product=

wishlist.find(
x=>x.id===id
);

let cart=

JSON.parse(
localStorage.getItem(
"cart"
)
)||[];

cart.push({

...product,

qty:1

});

localStorage.setItem(

"cart",

JSON.stringify(
cart
)

);

alert(
"Added To Cart ✅"
);

}

loadWishlist();