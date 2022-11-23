<script context="module">
    export function UpdateTheme(){
        if(document.cookie.split("%")[1] == undefined || document.cookie.split("%")[1].split("%")[0] == undefined) return;
        var colors = document.cookie.split("%")[1].split("%")[0];
        var theme = {
            light: colors.split("&")[0],
            dark: colors.split("&")[1],
        };
        const root = document.querySelector(':root');
        root.style.setProperty('--dark-color', theme.dark);
        root.style.setProperty('--light-color', theme.light);   
    }
</script>

<script>
    UpdateTheme();
    const playerColor = document.cookie.split("color=")[1].split(";")[0];
    function convertToAN(tile){
        var characters = ['a','b','c','d','e','f','g','h'];
        var tileConverted = characters[tile.x - 1] + tile.y;
        return tileConverted;
    }
    function determineColor(x,y){
        if(y % 2 == 0 && x % 2 == 0){
            return "light";
        }
        if(y % 2 == 1 && x % 2 == 1){
            return "light";
        }
        if(y % 2 == 1 && x % 2 == 0){
            return "dark";
        }
        if(y % 2 == 0 && x % 2 == 1){
            return "dark";
        }
        return null;
    }

    let holding = false;
    let id = null;
    let mouseX;
    let mouseY;
    let element; 
    let closest = undefined;
    window.onmousedown = (e) => {
        element = document.getElementById("holding");
        if(element != undefined && id != null) return;
        document.getElementById("board").childNodes.forEach(element => {
            element.childNodes.forEach(child => {
                if(child.className != undefined){
                    const rect = child.getBoundingClientRect();
                    var x = e.clientX - rect.x - rect.width / 2;
                    var y = e.clientY - rect.y - rect.height / 2;
                    if(x < 50 && x > -50 && y < 50 && y > -50){
                        closest = child;
                    }
                }
            });
        });
        if(closest == undefined) return;
        if(closest != undefined && closest.style.backgroundImage != ""){
            element.style.backgroundImage = closest.style.backgroundImage;
            closest.style.backgroundImage = "none";
        }
        holding = true;
        mouseX = e.x;
        mouseY = e.y;
        move();
        id = window.setInterval(move, 10);
    }
    window.onmousemove = (e) => {
        mouseX = e.x;
        mouseY = e.y;
    }
    function move(){
        if(closest == undefined) return;
        element.style.left = mouseX - element.clientWidth / 2 + "px";
        element.style.top = mouseY - element.clientHeight / 2 + "px";
    }
    window.onmouseup = (e) => {
        holding = false;
        window.clearInterval(id);
        if(closest == undefined) return;
        var closest2;
        document.getElementById("board").childNodes.forEach(element => {
            element.childNodes.forEach(child => {
                if(child.className != undefined){
                    const rect = child.getBoundingClientRect();
                    var x = e.clientX - rect.x - rect.width / 2;
                    var y = e.clientY - rect.y - rect.height / 2;
                    if(x < 50 && x > -50 && y < 50 && y > -50){
                        closest2 = child;
                    }
                }
            });
        });
        if(closest2 == undefined || closest.id == closest2.id){
            closest.style.backgroundImage = element.style.backgroundImage;
        }
        element.style.backgroundImage = "none";
        id = null;
        element = null;
        closest = undefined;
    }
</script>

<style>
    :root{
        --dark-color: rgb(75, 75, 75);
        --light-color: rgb(255, 255, 255);
    }
    #board{
        position: absolute;
        left: 50%;
        top: 50%;
        outline: 1.5vmin solid black;
        transform: translate(-50%, -45%);
        height: 80vh;
        aspect-ratio: 1 !important;
        display: table;
        border-collapse: collapse;
        table-layout: fixed;
        color:white;
        z-index: 0;
    }
    th{
        padding: 0;
        overflow: hidden;
        display: table-cell;
        background-position: center;
        background-repeat: no-repeat;
        background-size:contain;
        vertical-align: middle;
        text-align: center;
        font-size: 2vmin;
        user-select: none;
        width: 10vmin;
        height: 10vmin;
    }
    .dark{
        background-color: var(--dark-color);
    }
    .dark:hover{
        opacity: 75%;
    }
    .light{
        background-color: var(--light-color);
    }
    .light:hover{
        opacity: 75%;
    }
    .material-icons{
        color:white;
        -webkit-text-stroke-width: 0.25vmin;
        -webkit-text-stroke-color: black;
    }
    #holding{
        background-position: center;
        background-repeat: no-repeat;
        background-size:contain;
        position: absolute;
        height: 10vmin;
        width: 10vmin;
        aspect-ratio: 1/1 !important;
    }
</style>

<table id = "board" class = "material-icons">
    {#each Array(8) as _, indexY (indexY)}
        <tr>
        {#each Array(8) as _, indexX (indexX)}
            {#if playerColor == "white"}
                <th class = {determineColor(indexX + 1, indexY + 1)} id = {convertToAN({x:(indexX + 1),y:(Math.abs(indexY-8))})}></th>
            {/if}
            {#if playerColor == "black"}
                <th class = {determineColor(indexX + 1, indexY + 1)} id = {convertToAN({x:Math.abs(indexX-8),y:(indexY + 1 )})}></th>
            {/if}
        {/each}
        </tr>
	{/each}
</table>

<div id="holding"></div>
