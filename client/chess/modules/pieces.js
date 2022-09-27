import {Vector} from "./types.js";
export class Piece{
    constructor(type,color,location,id){
        this.type = type;
        this.color = color;
        if(type == "pawn"){
            this.moves = [new Vector(0,1)];
            this.enpassantable = false;
            this.distance = 1;
            this.shorttype = "";
        }
        if(type == "knight"){
            this.moves = [new Vector(1,2),new Vector(2,1),new Vector(-1,2),new Vector(1,-2),new Vector(-1,2),new Vector(-2,1),new Vector(2,-1),new Vector(-2,-1)];
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
        this.hasmoved = false;
        this.id = id;
        this.cell = document.createElement("div");
        this.cell.className = "tile piece";
        this.cell.style.setProperty("--url","url(./Pieces/" + this.color + this.type + ".png)");
        this.cell.style.setProperty("--x",location.x);
        this.cell.style.setProperty("--y",location.y);
        this.cell.id = this.id;
        document.getElementById("board").appendChild(this.cell);
    }
    Delete(){
        pieces.splice(pieces.indexOf(this),1);
        this.cell.remove();
    }
    Move(tile){
        this.cell.style.setProperty("--x",tile.x);
        this.cell.style.setProperty("--y",tile.y);
        this.location = new Vector(tile.x,tile.y);
    }
}

export let pieces = [
    //White pieces
    new Piece("pawn","white",new Vector(1,2),1),
    new Piece("pawn","white",new Vector(2,2),2),
    new Piece("pawn","white",new Vector(3,2),3),
    new Piece("pawn","white",new Vector(4,2),4),
    new Piece("pawn","white",new Vector(5,2),5),
    new Piece("pawn","white",new Vector(6,2),6),
    new Piece("pawn","white",new Vector(7,2),7),
    new Piece("pawn","white",new Vector(8,2),8),
    new Piece("knight","white",new Vector(2,1),9),
    new Piece("knight","white",new Vector(7,1),10),
    new Piece("rook","white",new Vector(1,1),11),
    new Piece("rook","white",new Vector(8,1),12),
    new Piece("bishop","white",new Vector(3,1),13),
    new Piece("bishop","white",new Vector(6,1),14),
    new Piece("queen","white",new Vector(4,1),15),
    new Piece("king","white",new Vector(5,1),16),
    //Black pieces
    new Piece("pawn","black",new Vector(1,7),17),
    new Piece("pawn","black",new Vector(2,7),18),
    new Piece("pawn","black",new Vector(3,7),19),
    new Piece("pawn","black",new Vector(4,7),20),
    new Piece("pawn","black",new Vector(5,7),21),
    new Piece("pawn","black",new Vector(6,7),22),
    new Piece("pawn","black",new Vector(7,7),23),
    new Piece("pawn","black",new Vector(8,7),24),
    new Piece("knight","black",new Vector(2,8),25),
    new Piece("knight","black",new Vector(7,8),26),
    new Piece("rook","black",new Vector(1,8),27),
    new Piece("rook","black",new Vector(8,8),28),
    new Piece("bishop","black",new Vector(3,8),29),
    new Piece("bishop","black",new Vector(6,8),30),
    new Piece("queen","black",new Vector(4,8),31),
    new Piece("king","black",new Vector(5,8),32),
];