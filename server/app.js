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
app.use(express.static('client'));

app.get('/',(request, response) => {
  response.sendFile(path.join(__dirname ,'..' ,'client', 'account', 'login', 'index.html'));
})

io.on('connection', (socket) => {
  socket.on('click', e => {
    io.emit('click');
  });
});

app.post('/registerUser', (request, response) => {
  const tiedot = request.body;
  const db = dbService.getDbServiceInstance();
  
  const result = db.registerUser(tiedot)

  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
})

app.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.verifyLogin(email,password)
  
  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
})

app.post('/getUsername', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.getUsername(email,password)
  
  result
  .then(data => response.send(data))
  .catch(err => console.log(err));
})

app.post('/getLoggedInUsers',(request, response) => {

}) 

var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('App listening on port ' + port);
});