const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(express.static('client/public'));

class Room{
  constructor(id,FEN,player1,player2){
    this.id = id,
    this.FEN = FEN,
    this.player1 = player1,
    this.player2 = player2
  }
}

class Client{
  constructor(sessionid,username){
    this.sessionid = sessionid,
    this.username = username
  }
}

let clients = [];
const ongoingGames = [];

io.on('connection', (socket) => {
  const username = socket.handshake.headers.cookie.split("Username=")[1].split(";")[0];
  clients.push(new Client(socket.id, username));

  socket.on('sendRequest', (request) => {
    const receiver = clients.find(({username}) => username == request.receiver);
    if(receiver != undefined){
      io.to(receiver.sessionid).emit('request', request)
    }
  });
  socket.on('createRoom',(request) => {
    const players = {
      player1:clients.find(({username}) => username == request.player1),
      player2:clients.find(({username}) => username == request.player2),
    };

    var validID = false;
    var roomID = Math.floor(Math.random() * 99999) + 1;
    while(!validID){
      if((ongoingGames.find(({id}) => id == roomID)) == undefined){
        validID = true;
      }      
      else{
        roomID = Math.floor(Math.random() * 99999) + 1;
      }
    }

    ongoingGames.push(new Room(roomID,"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",players.player1,players.player2));
    const room = ongoingGames.find(({id}) => id == roomID);
    if(players.player1 != undefined && players.player2 != undefined){
      io.to(players.player1.sessionid).emit('joinRoom', room);
      io.to(players.player2.sessionid).emit('joinRoom', room);
    }
  });
  socket.on('move', data => {
    const room = ongoingGames.find(({id}) => id == data.ID);
    room.FEN = data.FEN;
    socket.to(data.ID).emit('move',data.FEN);
  });
  socket.on('joinGame', Username => {
    const user = clients.find(({username}) => username == Username);
    const roomid = socket.handshake.headers.referer.split("http://localhost:3000/room/")[1];
    const room = ongoingGames.find(({id}) => id == roomid);
    io.to(user.sessionid).emit('getInfo',room);
    socket.join(room.id);
  });
  socket.on('disconnect', reason => {
    //removes disconnected client from clients array
    clients = clients.filter(client => client.sessionid != socket.id);
  });
});

app.post('/getAllUsers', (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllUsers();

  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
});

app.post('/registerUser', (request, response) => {
  const username = request.body.username; 
  const email = request.body.email; 
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.registerUser(username,email,password)
  
  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
});

app.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.verifyLogin(email,password)
  
  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
});

app.post('/getUsername', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.getUsername(email,password)
  
  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
});

app.get('/profile/:username', (request, response) => {
  response.sendFile(path.join(__dirname ,'..' ,'client', 'public', 'profile', 'index.html'));
  response.cookie('viewingProfile', request.params.username)
});

app.get('/room/:roomid', (request, response) => {
  response.sendFile(path.join(__dirname ,'..' ,'client', 'public', 'room', 'index.html'));
});

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('App listening on port ' + port);
});