function AttemptRegister(){
    const nameInput = document.getElementById("nimi");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("salasana");
    const numberInput = document.getElementById("puhelinnumero")

    if(nameInput.value.length < 3) return;
    if(emailInput.value == "") return;
    if(passwordInput.value.length < 8) return;
    if(numberInput.value == "") return;

    fetch('/registerUser', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            name : nameInput.value,
            email : emailInput.value,
            password : passwordInput.value,
            number : numberInput.value,
        })
    })
    .then(response => response.json())

    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    numberInput.value = "";
}
function LogIn(){
    location.href = "/account/login";
}