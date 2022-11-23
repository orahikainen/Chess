<script>
    import { Socket } from '../../stores/socket.js';
    export let sender;

    var socket;
    Socket.subscribe(data => {
        socket = data;
    });

    function Accept(){
        const user = document.cookie.split("Username=")[1].split(";")[0];
        const request = {player1:sender,player2:user};
        socket.emit('createRoom',request);
    }
    
    function Decline(){
        
    }
</script>

<style>
    #request-wrapper{
        width: 20vmin;
        height: 10vmin;
        background-color: rgb(100,100,100);
        border: 0.25vmin solid black;
        top:87.5%;
        left:1%;
        position: absolute;
    }
    #request-info{
        color:white;
        font-family: "Roboto";
    }
</style>

<div id="request-wrapper">
    <div id="request-info">Request from {sender}</div>
    <button id="button-accept" on:click={Accept}>Accept</button>
    <button id="button-decline" on:click={Decline}>Decline</button>
</div>