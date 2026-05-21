async function signup(){

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const { error } =

await supabaseClient
.auth
.signUp({

email,
password

});

if(error){

alert(
error.message
);

return;

}

alert(
"Signup Success ✅ Check Email"
);

}

async function login(){

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const { error } =

await supabaseClient
.auth
.signInWithPassword({

email,
password

});

if(error){

alert(
error.message
);

return;

}

window.location.href=

"my-orders.html";

}