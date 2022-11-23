<script>
    import Navbar from "../components/Navbar.svelte";
    import Board from "./components/Board.svelte";
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
<Board></Board>