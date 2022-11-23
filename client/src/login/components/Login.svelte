<script>
    function AttemptLogin(){
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;
      document.getElementById("email-input").value = "";
      document.getElementById("password-input").value = "";
      //if(email.length < 8) return;
      //if(password.length < 8) return;
      fetch('/login', {
          headers: {
              'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
              email: email,
              password: password,
          }),
      })
      .then(response => response.json())
      .then(res => {
        if(res == ""){
          return;
        }
        Login(res.username);
      });
    }
    function Login(username){
      document.cookie = "Username=" + username + "; SameSite=None; Secure; path=/;";
      location.href = "/main";
    }
    function Register(){
        location.href = "/main";
    }
  </script>
  
  <style>
    #login-wrapper{
      position: absolute;
      color:white;
      font-family: Roboto;
      font-size: 2vmin;
      border:0.25vmin solid black;
      border-radius: 1vmin;
      background-color: rgb(50,50,50);
      width: 40vmin;
      height: 50vmin;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    #email-wrapper{
      position: relative;
      margin-top:10%;
      margin-left: 22.5%;
    }
    #password-wrapper{
      position: relative;
      margin-top:10%;
      margin-left: 22.5%;
    }
    #register{
      position: relative;
      margin-top:12.5%;
      margin-left: 34%;
      user-select: none;
    }
    #login-button{
      position: relative;
      margin-top:12.5%;
      margin-left: 35%;
      width: 10vmin;
      height: 4vmin;
      font-size: 2vmin;
      font-weight: bold;
    }
    input{
        width: 20vmin;
        height: 3vmin;
        font-size: 2vmin;
    }
  </style>
  
  <div id = "login-wrapper">
    <div id = "email-wrapper">
      <label for = "email-input">Email</label><br>
      <input id = "email-input">
    </div>
    <div id = "password-wrapper">
      <label for = "password-input">Password</label><br>
      <input id = "password-input" type = "password" autocomplete="off" max = "256"><br>
    </div>
    <div id = "register" on:click={Register}>No account?</div>
    <button id = "login-button" on:click={AttemptLogin}>Log in</button>
  </div>