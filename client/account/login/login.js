function AttemptLogin(){
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if(emailInput.value == "") return;
    if(passwordInput.value == "") return;

    fetch('http://localhost:3000/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email : emailInput.value,
            password : passwordInput.value,
        })
    })
    .then(res => res.json())
    .then(text => {
        if(!text.data){
            emailInput.value = "";
            passwordInput.value = "";
            return;
        }
        fetch('http://localhost:3000/getUsername', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email : emailInput.value,
                password : passwordInput.value,
            })
        })
        .then(res => res.json())
        .then(text => {
            Login(text.data[0].nimi);
        }) 
    });

}
function Login(username){
    document.cookie = "loggedIn = true; path=/";
    document.cookie = "Username = " + username + "; path=/";
    location.href = "http://localhost:3000/main";
}
function Register(){
    location.href = "http://localhost:3000/account/register";
}