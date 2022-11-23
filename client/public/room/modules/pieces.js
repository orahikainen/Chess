import {Vector} from "./types.js";
export class Piece{
    constructor(type,color,location,id){
        this.type = type;
        this.color = color;
        if(type == "pawn"){
            this.moves = [new Vector(0,1)];
            this.distance = 1;
            this.shorttype = "";
        }
        if(type == "knight"){
            this.moves = [new Vector(1,2),new Vector(2,1),new Vector(-1,2),new Vector(1,-2),new Vector(-2,1),new Vector(2,-1),new Vector(-2,-1),new Vector(-1,-2)];
            this.shorttype = "N";
            this.distance = 2;
        } 
        if(type == "bishop"){
            this.moves = [new Vector(1,1),new Vector(1,-1),new Vector(-1,1),new Vector(-1,-1)];
            this.shorttype = "B";
            this.distance = 8;
        }
        if(type == "rook"){ 
            this.moves = [new Vector(0,1),new Vector(0,-1),new Vector(1,0),new Vector(-1,0)]    
            this.shorttype = "R";
            this.distance = 8;
        }
        if(type == "queen"){
            this.moves = [new Vector(1,1),new Vector(1,-1),new Vector(-1,1),new Vector(-1,-1), new Vector(0,1),new Vector(0,-1),new Vector(1,0),new Vector(-1,0)];
            this.shorttype = "Q";
            this.distance = 8;
        } 
        if(type == "king"){
            this.moves = [new Vector(1,1),new Vector(1,-1),new Vector(-1,1),new Vector(-1,-1), new Vector(0,1),new Vector(0,-1),new Vector(1,0),new Vector(-1,0)];
            this.shorttype = "K";
            this.distance = 1;
        }
        this.location = location;
        this.id = id;
    }
    Delete(){
        pieces.splice(pieces.indexOf(this),1);
    }
    Move(tile){
        this.location = new Vector(tile.x,tile.y);
    }
}

export let pieces = [];

export function EmptyPieces(){
    pieces = [];
}