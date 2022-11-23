<script>
    import { username } from "../main/Index.svelte";
    import ThemeMenu from "./ThemeMenu.svelte";
    function LogOut(){

    }
    function OpenProfile(){
        location.href = "/profile/" + username;
    }

    var themeMenuOpen = false
    function OpenThemeMenu(){
        themeMenuOpen = themeMenuOpen ? false : true;
    }
</script>

<style>
    #menu-wrapper{
        position: relative;
        color:white;
        font-family: "Roboto";
        font-size: 3vmin;
        float:right;
        height: 40vmin;
        width: 25vmin;
        background-color: rgb(100,100,100);
        border: 0.25vmin solid black;
        margin-right: 1vmin;
        margin-top: 1vmin;
        border-radius: 1vmin;
        user-select: none;
        z-index: 2;
    }
    #profile-wrapper{
        position: relative;
        width: 101%;
        height: 47.5%;
        border-bottom: 0.25vmin solid black;
        margin-left:-0.1vmin;
    }
    #options-wrapper{
        position: relative;
        margin-left: 15%;
        margin-top: 5%;
    }
    #profile-picture{
        position: relative;
        margin-left: 23.5%;
        margin-top: 5%;
    }
    #profile-username{
        position: relative;
        margin-left: 40%;
        user-select: all;
    }
    img{
        border-radius: 50%;
    }
    .option{
        cursor:pointer;
    }
</style>

<div id = "menu-wrapper">
    <div id = "profile-wrapper">
        <div id = "profile-picture"><img alt = "profilepicture" src = "/assets/picture.png"></div>
        <div id = "profile-username">{username}</div>
    </div>
    <div id = "options-wrapper">
        <div class = "option" id = "option-logout" on:click={LogOut}>Log out</div>
        <div class = "option" id = "option-openprofile" on:click={OpenProfile}>Open profile</div>
        <div class = "option" id = "option-theme" on:click={OpenThemeMenu}>Theme</div>
    </div>
</div>

{#if themeMenuOpen == true}
    <ThemeMenu></ThemeMenu>
{/if}