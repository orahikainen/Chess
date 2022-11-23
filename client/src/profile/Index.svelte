<script>
    import Navbar from "../components/Navbar.svelte";
    import ProfileViewer from "./components/ProfileViewer.svelte";
</script>

<style>
    :global(body){
        background-color: rgb(75,75,75);
        margin:0px;
    }
</style>

<Navbar></Navbar>
<ProfileViewer></ProfileViewer>