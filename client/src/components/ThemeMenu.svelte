<script>
    import {UpdateTheme} from "../room/components/Board.svelte";
    const PickDefaultTheme = (theme) => () => {
        let lightColor;
        let darkColor;
        if(theme == "default"){
            lightColor = "#FFFFFF"
            darkColor = "#4B4B4B";
        }
        if(theme == "coral"){
            darkColor = "#70A2A3";
            lightColor = "#B1E4B9";
        }
        if(theme == "dusk"){
            darkColor = "#706677";
            lightColor = "#CCB7AE";
        }
        if(theme == "marine"){
            darkColor = "#6F73D2";
            lightColor = "#9DACFF";
        }
        if(theme == "wheat"){
            darkColor = "#BBBE64";
            lightColor = "#EAF0CE";
        }
        if(theme == "emerald"){
            darkColor = "#6F8F72";
            lightColor = "#ADBD8F";
        }
        if(theme == "sandcastle"){
            darkColor = "#B88B4A";
            lightColor = "#E3C16F";
        }
        // TODO: add 2 new themes
        if(theme == "newtheme1"){
            darkColor = "#6F8F72";
            lightColor = "#ADBD8F";
        }
        if(theme == "newtheme2"){
            darkColor = "#B88B4A";
            lightColor = "#E3C16F";
        }
        document.cookie = "Theme=%" + lightColor + "&" + darkColor + "%; path=/;"
        UpdateTheme();
        UpdateColorPickers();
    }  
    function ChangeCustomTheme(){
        const lightColor = document.getElementById("light").value;
        const darkColor = document.getElementById("dark").value;
        document.cookie = "Theme=%" + lightColor + "&" + darkColor + "%; path=/;"
        UpdateTheme();
    }
    let colorPickerLight;
    let colorPickerDark;
    function UpdateColorPickers(){
        if(document.cookie.split("%")[1] == undefined || document.cookie.split("%")[1].split("%")[0] == undefined) return;
        var colors = document.cookie.split("%")[1].split("%")[0];
        colorPickerLight = colors.split("&")[0];
        colorPickerDark = colors.split("&")[1];
    }
    UpdateColorPickers();
</script>

<style>
    #thememenu-wrapper{
        position: relative;
        background-color: rgb(100,100,100);
        border: 0.25vmin solid black;
        border-radius:1vmin;
        height: 42.5vmin;
        width: 22.5vmin;
        margin-top: 25vmin;
        margin-right: 1vmin;
        float:right;
        padding: 1vmin;
        text-align: center;
        z-index: 3;
    }
    .theme{
        width: 7vmin;
        height: 7vmin;
        cursor: pointer;
        user-select: none;
    }
    .theme:hover{
        opacity: 50%;
    }
    .text{
        color:white;
        font-size:2vmin;
        font-family: "Roboto";
        margin-top: 1vmin;
        margin-bottom: 1vmin;
    }
    #custom-theme-button{
        padding:1vmin;
        color:black;
    }
</style>

<div id = "thememenu-wrapper">
    <div id = "default-themes">
        <div class = "text">Default themes</div>
        <img class = "theme" alt = "default" src="/assets/themes/themeDefault.png" on:click={PickDefaultTheme("default")}>
        <img class = "theme" alt = "coral" src="/assets/themes/themeCoral.png" on:click={PickDefaultTheme("coral")}>
        <img class = "theme" alt = "dusk" src="/assets/themes/themeDusk.png" on:click={PickDefaultTheme("dusk")}>
        <img class = "theme" alt = "emerald" src="/assets/themes/themeEmerald.png" on:click={PickDefaultTheme("emerald")}>
        <img class = "theme" alt = "marine" src="/assets/themes/themeMarine.png" on:click={PickDefaultTheme("marine")}>
        <img class = "theme" alt = "sandcastle" src="/assets/themes/themeSandcastle.png" on:click={PickDefaultTheme("sandcastle")}>
        <img class = "theme" alt = "wheat" src="/assets/themes/themeWheat.png" on:click={PickDefaultTheme("wheat")}>
        <!-- Add 2 more default themes-->
        <img class = "theme" alt = "wheat" src="/assets/themes/themeWheat.png" on:click={PickDefaultTheme("wheat")}>
        <img class = "theme" alt = "wheat" src="/assets/themes/themeWheat.png" on:click={PickDefaultTheme("wheat")}>
    </div>
    <div id = "custom-theme">
        <div class = "text">Custom theme</div>
        <label class = "text" for = "light">Light color:</label>
        <input id = "light" type = "color" value={colorPickerLight}><br>
        <label class = "text" for = "dark">Dark color:</label>
        <input id = "dark" type = "color" value={colorPickerDark}><br>
        <button class = "text" id = "custom-theme-button" on:click={ChangeCustomTheme}>Change theme</button>
    </div>
</div>