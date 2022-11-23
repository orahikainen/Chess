<script context = "module">
    import Navbar from "../components/Navbar.svelte";
    var name = undefined;
    if(document.cookie.split("Username=")[1] != undefined){
        name = document.cookie.split("Username=")[1].split(";")[0];
        if(name == undefined){
            location.href = "/login"
        }
    }
    else{
        location.href = "/login"
    }
    export const username = name;
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