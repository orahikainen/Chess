function Main(){
    if(!document.cookie.includes("loggedIn=true") || !document.cookie.includes("Username")){
        location.href = "http://127.0.0.1:5500/client/account/login";
    }
    const username = document.cookie.split("Username=")[1].split(";")[0];
    document.getElementById("username").innerHTML = username;
}
function PlayAgainstBot(){
    location.href = "http://127.0.0.1:5500/client/chess";
}
function PlayAgainstRandom(){
    location.href = "http://127.0.0.1:5500/client/chess";
}
function PlayAgainstFriend(){
    const div = document.createElement("div");
    div.id = "playAgainstFriend";

    const label = document.createElement("label");
    label.innerHTML = "Enter name:";
    label.id = "nameLabel";
    div.appendChild(label)

    const input = document.createElement("input");
    input.id = "nameInput";
    div.appendChild(input)

    div.appendChild(document.createElement("br"));

    const button = document.createElement("button");
    button.innerHTML = "Send request";
    button.id = "nameButton";
    button.onclick = function(){RequestSent()};
    div.appendChild(button);

    document.body.append(div);
    //location.href = "http://127.0.0.1:5500/client/chess";
}
function RequestSent(){
    const username = document.getElementById("nameInput").value;
    fetch('http://localhost:3000/getLoggedInUsers', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
    })
    .then(res => res.json())
    .then(text => {
        console.log(text)
    })
}
var menuOpen = false;
function OpenUserMenu(){
    if(menuOpen){
        document.getElementById("userMenu").remove();
        menuOpen = false;
        return;
    }
    const div = document.createElement("div");
    var left = window.scrollX + document.getElementById("username").getBoundingClientRect().left;
    var top = window.scrollY + document.getElementById("username").getBoundingClientRect().top;
    div.style.left = ((left / screen.width) * 100) - 7.5 + "vw";
    div.style.top = ((top / screen.height) * 100) + 4 + "vh";
    div.id = "userMenu";

    const list = document.createElement("ul");
    list.style.paddingLeft = "1vmin";
    function CreateOption(name){
        const option = document.createElement("li");
        option.innerHTML = name;
        option.id = "option";
        option.onclick = function(){OptionClicked(name)};
        list.appendChild(option)
    }
    const options = ["Log out","option 2","option 3","option 4","option 5","option 6", "option 7", "option 8"];
    for(let i = 0; i < options.length; i++){
        CreateOption(options[i]);
    }
    div.appendChild(list);

    document.body.append(div);
    menuOpen = true;
}
function OptionClicked(name){
    switch(name){
        case "Log out":
            LogOut();
            break;
    }
}
function LogOut(){
    document.cookie = "loggedIn=; Max-Age=0; path=/;";
    document.cookie = "Username=; Max-Age=0; path=/;"
    location.href = "http://127.0.0.1:5500/client/account/login";
}
Main();