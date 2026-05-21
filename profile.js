async function saveProfile(){

const {

data:userData

} = await supabaseClient

.auth

.getUser();

const email =

userData.user.email;

await supabaseClient

.from(
"profiles"
)

.upsert([{

email:

email,

full_name:

document.getElementById(
"full_name"
).value,

phone:

document.getElementById(
"phone"
).value,

address:

document.getElementById(
"address"
).value,

city:

document.getElementById(
"city"
).value,

state:

document.getElementById(
"state"
).value,

pincode:

document.getElementById(
"pincode"
).value

}]);

alert(
"Profile Saved ✅"
);

}