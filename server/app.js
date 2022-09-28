const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


//const dbService = require('./dbService');

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
  const result = db.getEmailAndPassword(email,password)
  
  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
})

app.post('/getUsername', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  
  const db = dbService.getDbServiceInstance();
  const result = db.getUsername(email,password)
  
  result
  .then(data => response.json({ data: data}))
  .catch(err => console.log(err));
})

app.post('/getLoggedInUsers',(request, response) => {
  response.json("test");
}) 

server.listen(3000, () => {
  console.log('App listening on port 3000');
});