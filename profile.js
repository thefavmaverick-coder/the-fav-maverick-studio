const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(!user){

window.location.href=

"login.html";

}

/* LOAD PROFILE */

loadProfile();

async function loadProfile(){

try{

const {

data:userData,

error:userError

} = await supabaseClient

.auth

.getUser();

if(
userError ||
!userData.user
){

window.location.href=

"login.html";

return;

}

const email =

userData.user.email;
document.getElementById(
"profile-email"
).innerText =

email;

/* GET PROFILE */

const {

data

} = await supabaseClient

.from(
"profiles"
)

.select("*")
.eq(
"email",
email
)
.maybeSingle();

if(!data){

return;

}

/* AUTO FILL */

document.getElementById(
"full_name"
).value=

data.full_name || "";

document.getElementById(
"phone"
).value=

data.phone || "";

document.getElementById(
"address"
).value=

data.address || "";

document.getElementById(
"city"
).value=

data.city || "";

document.getElementById(
"state"
).value=

data.state || "";

document.getElementById(
"pincode"
).value=

data.pincode || "";

}catch(err){

console.log(
err
);

}

}

/* SAVE PROFILE */

async function saveProfile(){

try{

const {

data:userData,

error:userError

} = await supabaseClient

.auth

.getUser();

if(
userError ||
!userData.user
){

alert(
"Login first"
);

window.location.href=
"login.html";

return;

}

const email =
userData.user.email;
document.getElementById(
"email"
).value = email;

const phone =
document.getElementById(
"phone"
).value.trim();

const pincode =
document.getElementById(
"pincode"
).value.trim();

if(
phone &&
phone.length !== 10
){

alert(
"Phone number must be 10 digits"
);

return;

}

if(
pincode &&
pincode.length !== 6
){

alert(
"Pincode must be 6 digits"
);

return;

}

const {

error

} = await supabaseClient

.from(
"profiles"
)

.upsert([{

email:email,

full_name:
document.getElementById(
"full_name"
).value.trim(),

phone:phone,

address:
document.getElementById(
"address"
).value.trim(),

city:
document.getElementById(
"city"
).value.trim(),

state:
document.getElementById(
"state"
).value.trim(),

pincode:pincode

}]);

if(error){

alert(
error.message
);

return;

}

alert(
"Profile Saved ✅"
);

}catch(err){

console.log(err);

alert(
"Save Failed ❌"
);

}

}


/* LOGOUT */

async function logout(){

await supabaseClient

.auth

.signOut();

window.location.href=

"login.html";

}

const {

data:{user}

} = await supabaseClient

.auth

.getUser();

if(!user){

window.location.href=

"login.html";

}