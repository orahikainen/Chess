<script>
    var name = undefined;
    if(document.cookie.split("viewingProfile=")[1] != undefined){
        name = document.cookie.split("viewingProfile=")[1].split(";")[0];
    }
    if(name == undefined){
        console.log("error");
    }

    const rating = 1000;
</script>

<style>
    #profilemenu-wrapper{
        position: absolute;
        background-color: rgb(100,100,100);
        width: 80vw;
        height: 70vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border: 0.25vmin solid black;
        border-radius: 1vmin;
        color:white;
        font-family: "Roboto";
    }
    #profilemenu-name{
        font-size: 4vmin;
    }
    img{
        height: 8vmin;
        width: auto;
        border-radius: 50%;
    }
</style>

<div id = "profilemenu-wrapper">
    <div id = "profilemenu-name">Viewing profile of {name}</div>
    <div id = "profilemenu-picture"><img alt = "profilepicture" src = "/assets/picture.png"></div>
    <div id = "profilemenu-statistics">
        <div id = "statistics-rating">Rating: {rating}</div>
    </div>
</div>