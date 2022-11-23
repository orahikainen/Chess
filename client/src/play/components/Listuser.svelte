<script> 
    import { Socket } from '../../stores/socket.js';
    export let profilepicture;
    export let username;

    var socket;
    Socket.subscribe(data => {
        socket = data;
    });

    function SendRequest(){
       const user = document.cookie.split("Username=")[1].split(";")[0];
       const request = {sender:user,receiver:username};
       socket.emit('sendRequest', request);
    }
</script>

<style>
    #user-wrapper{
        width: 90%;
        height: 10%;
        background-color: white;
        border: 0.25vmin solid black;
        margin-top:5%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 0.5vmin;
    }
    #profilepicture{
        width: 5vmin;
        height: 5vmin;
        background-position: center;
        background-repeat: no-repeat;
        background-size:contain;
    }
    #username{
        font-family: "Roboto";
        font-size: 5vmin;
        color:rgb(30,30,30)
    }
    .user{
        display: inline-block;
    }
</style>

<div id = "user-wrapper">
    <div class="user" id="profilepicture" style="background-image: url(/assets/{profilepicture});"></div>
    <div class="user" id="username">{username}</div>
    <button class="user" id="requestbutton" on:click={SendRequest}>Send</button>
</div>