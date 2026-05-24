/* PASSWORD SHOW / HIDE */

function togglePassword(){

const pass =

document.getElementById(
"password"
);

if(
pass.type==="password"
){

pass.type="text";

}else{

pass.type="password";

}

}

/* CREATE ACCOUNT */

async function signup(){

const email =

document.getElementById(
"email"
).value.trim();

const password =

document.getElementById(
"password"
).value.trim();

/* VALIDATION */

if(
email==="" ||
password===""
){

alert(
"Fill email and password"
);

return;

}

if(
password.length < 6
){

alert(
"Password minimum 6 characters"
);

return;

}

/* SIGNUP */

const {

data,

error

} = await supabaseClient

.auth

.signUp({

email:email,

password:password

});

if(error){

alert(
error.message
);

return;

}

alert(
"Account Created ✅ Check Email Verification"

);

}

/* LOGIN */

async function login(){

const email =

document.getElementById(
"email"
).value.trim();

const password =

document.getElementById(
"password"
).value.trim();

if(
email==="" ||
password===""
){

alert(
"Enter login details"
);

return;

}

const {

data,

error

} = await supabaseClient

.auth

.signInWithPassword({

email:email,

password:password

});

if(error){

alert(
error.message
);

return;

}

/* SAVE USER */

localStorage.setItem(

"user",

email

);

alert(
"Login Success ✅"
);

/* REDIRECT */

window.location.href=

"profile.html";

}

/* LOGOUT */

async function logout(){

await supabaseClient

.auth

.signOut();

localStorage.removeItem(
"user"
);

window.location.href=

"login.html";

}

/* CHECK SESSION */

async function checkLogin(){

const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(user){

console.log(
"Logged user:",
user.email
);

}

}

checkLogin();


/* CHECK SESSION */

async function checkLogin(){

const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(user){

window.location.href=

"profile.html";

}

}

checkLogin();