<script>
    import Listuser from "./Listuser.svelte";

    let listOfAllUsers = [];
    let listOfUsers = [];
    
    fetch('/getAllUsers', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
    })
    .then(data => data.text())
    .then(data => JSON.parse(data))
    .then(data => {
        data = formatData(data);
        listOfAllUsers = listOfAllUsers.concat(data);
    });

    //delete after adding profile pictures to db
    function formatData(data){
        const newData = [];
        data.forEach(element => {
            newData.push({username:element.username,profilepicture:"picture.png"});
        })
        return newData;
    }

    function RefreshList(){
        const matchingNames = [];
        const search = document.getElementById("userinput").value;
        listOfAllUsers.forEach(user => {
            if(user.username.includes(search)) matchingNames.push(user)
        });
        listOfUsers = matchingNames;
    }
</script>

<style>
    #userinput-wrapper{
        position: absolute;
        height: 35vh;
        width: 15vw;
        background-color: rgb(100,100,100);
        border: 0.25vmin solid black;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    #userinput{
        margin-left: 10%;
        margin-top: 5%;
    }
    #userslist{
        background-color: rgb(200,200,200);
        padding-top: 2.5%;
        padding-bottom: 5%;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div id = "userinput-wrapper">
    <input on:input={RefreshList} id="userinput">
    <div id = "userslist">
        {#each listOfUsers as user}
            <Listuser username={user.username} profilepicture={user.profilepicture}></Listuser>
        {/each}
    </div>
</div>