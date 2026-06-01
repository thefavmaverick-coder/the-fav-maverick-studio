async function loadReviews(){

const box =
document.getElementById(
"review-container"
);

if(!box){
return;
}

box.innerHTML =
"Loading Reviews...";

try{

const response =
await fetch(

"https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec?action=reviews"

);

const reviews =
await response.json();

box.innerHTML = "";

if(
!reviews ||
reviews.length === 0
){

box.innerHTML =
"<p>No Reviews Yet</p>";

return;

}

[...reviews]
.reverse()
.forEach(review=>{

box.innerHTML += `

<div class="review-card">

<h3>
${review.name}
</h3>

<p class="review-rating">
⭐ ${review.rating}
</p>

<p class="review-text">
"${review.review}"
</p>

<span class="verified-badge">
✔ Verified Customer
</span>

</div>

`;

});

}catch(error){

console.log(error);

box.innerHTML =
"Unable To Load Reviews";

}

}

async function addReview(){

const name =
document
.getElementById(
"review-name"
)
.value
.trim();

const rating =
document
.getElementById(
"review-rating"
)
.value;

const text =
document
.getElementById(
"review-text"
)
.value
.trim();

if(
!name ||
!text
){

alert(
"Please fill your review"
);

return;

}

try{

await fetch(
"https://script.google.com/macros/s/AKfycbzktfXentus8dVyKRKVFUmN_BKbAS0wQVrX_463Xs_jldZvkIgbTP7ye_bsIXE3erls8A/exec",
{
method:"POST",
mode:"no-cors",
body:JSON.stringify({

type:"review",

name:name,

rating:rating,

review:text

})

}
);

alert(
"Review Submitted Successfully ✅"
);

document
.getElementById(
"review-name"
)
.value = "";

document
.getElementById(
"review-text"
)
.value = "";

setTimeout(
loadReviews,
1500
);

}catch(error){

console.log(error);

alert(
"Review Submit Failed ❌"
);

}

}

loadReviews();
