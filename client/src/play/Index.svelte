<script>
    import { Socket } from '../stores/socket.js';
    import Navbar from "../components/Navbar.svelte";
    import UsernameInput from "./components/UsernameInput.svelte";
    import RequestPopup from './components/RequestPopup.svelte';

    var socket;
    Socket.subscribe(data => {
        socket = data;
    });

    let playAgainstFriend = false;
    let popup = false;
    let sender = undefined;

    const username = document.cookie.split("Username=")[1].split(";")[0];

    socket.on('request', (request) => {
        sender = request.sender;
        popup = true;
    });

    socket.on('joinRoom', (room) => {
        location.href = "/room/" + room.id;
    });

    function PlayAgainstBot(){

    }
    function PlayAgainstFriend(){
        playAgainstFriend = playAgainstFriend == true ? false : true;
    }
    function PlayAgainstRandom(){

    }
</script>

<style>
    :global(body){
        background: linear-gradient(to bottom,  rgb(30,30,30) 60%,rgb(40, 0, 80) 100%);
        height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin:0px;
        overflow: hidden;
    }
</style>

<Navbar></Navbar>

<button on:click={PlayAgainstBot}>Play against a bot</button>
<button on:click={PlayAgainstFriend}>Play against a friend</button>
<button on:click={PlayAgainstRandom}>Play against a random player</button>

{#if playAgainstFriend == true}
    <UsernameInput></UsernameInput>
{/if}

{#if popup == true}
    <RequestPopup sender={sender}></RequestPopup>
{/if}