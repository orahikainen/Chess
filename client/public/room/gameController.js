import { pieces } from "./modules/pieces.js";
import { findByLocation, convertToXY, convertToAN} from "./modules/functions.js";
import { CalculateMoves, MovePiece } from "./modules/moves.js";
import { PlayerMoved, possibleMoves, playerColor, RefreshMoves} from "./serverCommunicator.js";

var turn = "white";
var selectedPiece = null;

const elements = document.querySelector("table").childNodes;
elements.forEach(element => {
    element.childNodes.forEach(child => {
        if(child.id == undefined) return;
        const piece = findByLocation(convertToXY(child.id));
        if(piece != undefined){
            child.style.backgroundImage = `url(/assets/pieces/${piece.color}${piece.type}.png)`;
        }
    });
});

function GetClosestTile(e){
    var closest = undefined;
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
    return closest;
}

document.onmousedown = (e) => {
    if(GetClosestTile(e) == undefined) return;
    selectedPiece = findByLocation(convertToXY(GetClosestTile(e).id));
    ShowMoves(selectedPiece);
}

function ShowMoves(piece){
    if(playerColor != turn) return;
    const elements = document.getElementById("board").childNodes;
    elements.forEach(element => {
        element.childNodes.forEach(child => {
            child.innerHTML = "";
        });
    })
    //Loops through all of the moves and displays a circle on all of the tiles with a possible move
    possibleMoves.forEach(move => {
        if(piece.id == move.id && turn == move.color){
            document.getElementById(convertToAN(move.move)).innerHTML = "circle";
        }
    });
}

document.onmouseup = (e) => {
    var piece = selectedPiece;
    if(playerColor != turn){
        ClearBoard();
        return;
    }
    if(GetClosestTile(e) == undefined) return;
    if(MovePiece(piece, GetClosestTile(e).id, turn, possibleMoves)){
        PlayerMoved();
        Update();
    }
    else{
        ClearBoard();
    }
}

export function Update(){
    turn = turn == "white" ? turn = "black" : turn = "white";
    RefreshMoves();
    ClearBoard();
}

export function ClearBoard(){
    //Clears the board of the circles
    document.getElementById("board").childNodes.forEach(element => {
        element.childNodes.forEach(child => {
            if(child.className != undefined){
                child.innerHTML = "";
            }
        });
    });
    //Refreshes location of pieces
    elements.forEach(element => {
        element.childNodes.forEach(child => {
            if(child.className != undefined){
                child.innerHTML = "";
                child.style.backgroundImage = "";
                const piece = findByLocation(convertToXY(child.id));
                if(piece != undefined){
                    child.style.backgroundImage = `url(/assets/pieces/${piece.color}${piece.type}.png)`;
                }
            }  
        });
    })
    selectedPiece = null;
}