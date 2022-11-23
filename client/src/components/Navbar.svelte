<script>
    import ProfileMenu from "./ProfileMenu.svelte";
    import { username } from "../main/Index.svelte";
    //Opening and closing the profile menu
    let menuOpen = false;
    function OpenProfileMenu(){
        menuOpen = menuOpen ? false : true;
    }
</script>

<style>
    #navbar{
        width: 100vw;
        height: 10vmin;
        background-color: rgb(50, 50, 50);
        border-bottom: 0.5vmin solid white;
        font-family: "Roboto";
        font-size: 4vmin;
    }
    .option{
        position: relative;
        color: white;
        margin-left: 2.5vmin;
        margin-top: 2.5vmin;
        font-weight: 500;
        user-select: none;
        text-decoration: none;
        vertical-align: middle;
        display: inline-block;
    }
    #profile-wrapper{
        left:91.5vw;
        top: 1vh;
        position: absolute;
    }
    #profile-username{
        color: white;
    }
    img{
        height: 8vmin;
        width: auto;
        border-radius: 50%;
        cursor:pointer;
    }
    .profile{
        display: inline-block;
        vertical-align: middle;
    }
</style>

<div id = "navbar">
    <div id = "options-wrapper">
        <a class = "option" id = "option-home" href = "/main">Home</a>
        <a class = "option " id = "option-leaderboard" href = "/leaderboard.html">Leaderboard</a>
        <a class = "option" id = "option-play" href = "/play">Play</a>
    </div>
    <div id = "profile-wrapper">
        <div class = "profile" id = "profile-username">{username}</div>
        <a class = "profile" id = "profile-picture" on:click={OpenProfileMenu}><img alt = "profilepicture" src = "/assets/picture.png"></a>
    </div>
</div>

{#if menuOpen == true}
    <ProfileMenu></ProfileMenu>
{/if}