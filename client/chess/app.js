import {pieces} from './modules/pieces.js';
import {CalculateMoves, MovePiece} from './modules/moves.js';
import {convertToAN, convertToXY, findByLocation, findById, isTileEmpty, isOutOfBounds} from './modules/functions.js';

class Game{
    constructor(){
        this.characters = ['a','b','c','d','e','f','g','h'];
        this.hovering = null;
        this.tileSelected = false;
        this.selectedPiece;
        this.turn = "white";
        this.possibleMoves = CalculateMoves(pieces,this.turn);
        this.gamePaused = false;
        this.mousedownID = -1;
        this.mouseX = null;
        this.mouseY = null;
    }
    Initialize(){
        window.onmouseover = function(e){game.Hover(e)};
        window.onmousedown = function(e){game.Click(e);game.mousedown()};
        window.onmouseup = function(){game.mouseup()};
        window.onmousemove = function(e){game.mousemove(e)}
        this.Hover(document.getElementById("board"));
    }
    //Called at the end of every turn
    Update(){
        this.Hover(document.getElementById("board"));
        //Changes turn
        this.turn = this.turn == "white" ? this.turn = "black" : this.turn = "white";
        //Calculates all of the possible moves again
        this.possibleMoves = CalculateMoves(pieces,this.turn);
    }
    Hover(e){
        this.hovering = e.target;
        if(this.tileSelected || this.gamePaused) return;
        var elements = document.getElementsByTagName("div");
        for(let i = 0; i < elements.length; i++){
            if(elements[i].classList[1] == "dark" || elements[i].classList[1] == "light"){
                for(let j = 0; j < pieces.length; j++){
                    if(convertToAN(pieces[j].location) == elements[i].id){
                        elements[i].style.backgroundColor = "rgba(0,0,0,0)";
                        if(elements[i] == this.hovering){
                            if(elements[i].classList[1] == "dark") document.getElementById(pieces[j].id).style.backgroundColor = "rgb(200, 100, 100)";
                            if(elements[i].classList[1] == "light") document.getElementById(pieces[j].id).style.backgroundColor = "rgb(250, 250, 200)";
                            break;
                        }
                        else{
                            if(elements[i].classList[1] == "dark") document.getElementById(pieces[j].id).style.backgroundColor = "rgb(175, 50, 50)";
                            if(elements[i].classList[1] == "light") document.getElementById(pieces[j].id).style.backgroundColor = "rgb(220, 220, 150)";
                            break;
                        }
                    }
                    else{
                        if(elements[i].classList[1] == "dark") elements[i].style.backgroundColor = "rgb(175, 50, 50)";
                        if(elements[i].classList[1] == "light") elements[i].style.backgroundColor = "rgb(220, 220, 150)";
                    }
                }
            }
        }
    }
    Click(e){
        if(this.gamePaused) return;
        //If a tile is not selected allows the player to select it if it has a piece and the its the that pieces turn
        if(!this.tileSelected){
            this.tileSelected = true;
            this.selectedPiece = findByLocation(convertToXY(this.hovering.id))
            if(this.selectedPiece == undefined || this.selectedPiece.color != this.turn){
                this.tileSelected = false;
            }
            else{
                this.ShowMoves();
            }
        }
        //Otherwise deselects the currently selected tile or if you clicked on a tile where the piece can move, moves the piece there
        else{
            this.tileSelected = false;
            //Clears the board from the circles
            var elements = document.getElementsByTagName("div");
            for(let i = 0; i < elements.length; i++){
                if(elements[i].classList[0] == "tile"){
                    elements[i].innerHTML = "";
                }
            }
            MovePiece(this.selectedPiece,this.hovering.id,this.turn,this.possibleMoves);
        }
    }
    ShowMoves(){
        //Loops through all of the moves and displays a circle on all of the tiles with a possible move
        this.possibleMoves.forEach(move => { 
            if(this.selectedPiece.id == move.id){
                document.getElementById(convertToAN(move.move)).innerHTML = "circle";
            }
        });
    }
    RestartGame(){
        //finish later
    }
    mousedown() {
        if(this.mousedownID==-1)  //Prevent multimple loops!
            this.mousedownID = setInterval(game.whilemousedown, 10);
    }
    mouseup() {
        if(this.mousedownID!=-1) {  //Only stop if exists
            clearInterval(this.mousedownID);
            this.mousedownID=-1;
        }
    }
    whilemousedown() {
        var piece = document.getElementById(game.selectedPiece.id);
        piece.style.left = game.mouseX + "px";
        piece.style.top = game.mouseY + "px";
    }
    mousemove(e){
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
}

export var game = new Game();
game.Initialize();