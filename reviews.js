let reviews =

JSON.parse(
localStorage.getItem(
"reviews"
)
)||[];

function loadReviews(){

const box =

document.getElementById(
"review-list"
);

box.innerHTML="";

reviews.reverse().forEach(
review=>{

box.innerHTML += `

<div class="review-card">

<h3>

${review.name}

</h3>

<p>

${review.rating}

</p>

<p>

${review.text}

</p>

</div>

`;

});

}

function addReview(){

const name =

document
.getElementById(
"review-name"
)
.value;

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
.value;

if(
!name ||
!text
){

alert(
"Fill review"
);

return;

}

reviews.push({

name:name,

rating:rating,

text:text

});

localStorage.setItem(

"reviews",

JSON.stringify(
reviews
)

);

loadReviews();

}

loadReviews();