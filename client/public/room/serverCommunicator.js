import { convertToXY, findById, setFEN, getFEN } from './modules/functions.js';
import { ClearBoard, Update} from './gameController.js';
import { CalculateMoves } from './modules/moves.js';
import { pieces } from './modules/pieces.js';

export let playerColor;
export let possibleMoves;

var socket = io();

const username = document.cookie.split("Username=")[1].split(";")[0];
socket.emit('joinGame',username);

var roomdata;

socket.on('getInfo', roomData => {
    setFEN(roomData.FEN);
    ClearBoard();
    roomdata = roomData;
    possibleMoves = CalculateMoves(pieces,"white");
    playerColor = username == roomData.player1.username ? "white" : "black";
    document.cookie = "color="+playerColor+"; SameSite=None; Secure; path=/;";
});

export function PlayerMoved(){
    socket.emit('move',{FEN:getFEN(),ID:roomdata.id});
}

socket.on('move', FEN => {
    setFEN(FEN);
    Update();
});

export function RefreshMoves(){
    possibleMoves = CalculateMoves(pieces,playerColor);
}