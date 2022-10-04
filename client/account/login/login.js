function AttemptLogin(){
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password")
    if(emailInput.value == "") return;
    if(passwordInput.value == "") return
    fetch('/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            email : emailInput.value,
            password : passwordInput.value,
        })
    })
    .then(res => res.text())
    .then(verified => {
        if(!verified){
            emailInput.value = "";
            passwordInput.value = "";
            return;
        }
        fetch('/getUsername', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email : emailInput.value,
                password : passwordInput.value,
            })
        })
        .then(res => res.text())
        .then(name => {
            Login(name);
        }) 
    })
}
function Login(username){
    document.cookie = "loggedIn = true; path=/";
    document.cookie = "Username = " + username + "; path=/";
    location.href = "/main";
}
function Register(){
    location.href = "/account/register";
}