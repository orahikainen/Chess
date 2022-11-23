import { pieces } from './pieces.js';
import { convertToAN, convertToXY, findByLocation, isTileEmpty, isOutOfBounds } from './functions.js';
import { Move, Vector } from './types.js';

export const movesList = [];

export function CalculateMoves(piecesList,turn) {
    var possibleMoves = [];
    //var king = pieces.find(({type, color}) => type == "king" && color == turn);
    piecesList.forEach(piece => {
        switch(piece.type) {
            case "pawn":
                possibleMoves = possibleMoves.concat(CalculatePawnMoves(piece));
                break;
            case "knight":
                possibleMoves = possibleMoves.concat(CalculateKnightMoves(piece));
                break;                
            case "bishop":
            case "rook":
            case "queen":
            case "king":
                possibleMoves = possibleMoves.concat(CalculateSlidingMoves(piece));
                break;
            }
    });
    //if(pieces.find(({type, color}) => type == "king" && color == turn) != undefined) {
    //    var kingTile = pieces.find(({type, color}) => type == "king" && color == turn).location;
    //}
    //var attackingPiece; 
    //possibleMoves.forEach(move => {
    //    if(move.move == kingTile){
    //        findByLocation(kingTile).checked = true;
    //        attackingPiece = pieces.find(({id}) => id == move.id)
    //    }
    //});
    //var possibleMoves2 = [];
    //if(pieces.find(({type, color}) => type == "king" && color == turn) != undefined && findByLocation(kingTile).checked){
    //    possibleMoves.forEach(move=>{
    //        if(move.color == turn){
    //        if(move.capture && move.captureTile == attackingPiece.location){
    //            possibleMoves2.push(move);
    //        }
    //        else{
    //        var piece = pieces.find(({id}) => id == move.id)
    //        var oldLocation = piece.location;
    //        piece.location = move.move;
    //        var testvar = true;
    //        CalculateMoves([attackingPiece],null).forEach(attackingMove=>{
    //            var kingTile = pieces.find(({type, color}) => type == "king" && color == turn).location;
    //            if(attackingMove.move == kingTile){
    //                testvar = false;
    //            }
    //        });
    //        if(testvar){
    //            possibleMoves2.push(move);
    //            console.log(move);
    //        }
    //        piece.location = oldLocation;
    //        }
    //    }
    //    });
    //    if(possibleMoves2.length == 0){
    //        openGameOverMenu(attackingPiece.color);
    //    }
    //    return possibleMoves2;
    //}
    return possibleMoves;
}
function CalculatePawnMoves(piece){
    var possibleMoves = [];
    var direction = piece.color == "white" ? 1 : -1;
    for(let i = 1; i <= 2; i++){
        var moveTile = new Vector(piece.location.x, piece.location.y+i*direction);
        if(!isTileEmpty(moveTile)) break;
        possibleMoves.push(new Move(moveTile, piece.type, moveTile, piece.color, piece.id));
    }
    //Check if theres an enemy piece in the top/bottom-left and top/bottom-right tiles
    for(let i = -1; i <= 1; i+=2){
        var moveTile = new Vector(piece.location.x + i, piece.location.y + direction);
        if(!isTileEmpty(moveTile) && findByLocation(moveTile).color != piece.color){
            var moveFull = piece.location.x + "x" + moveTile;
            possibleMoves.push(new Move(moveFull, piece.type, moveTile, piece.color, piece.id));
        }
    }
    //Checks if there is an enemy pawn next to the selected pawn and if you can en passant it
    for(let i = -1; i <= 1; i+=2){
        var checkTile = new Vector(piece.location.x+i,piece.location.y);
        var moveTile = new Vector(piece.location.x+i,piece.location.y+direction);
        if(!isTileEmpty(checkTile) && findByLocation(checkTile).type == "pawn" && findByLocation(checkTile).color != piece.color && findByLocation(checkTile).enpassantable == true){
            var moveFull = piece.location.x+ "x" + convertToAN(new Vector(piece.location.x+i,(piece.location.y + direction))) + " e.p"
            possibleMoves.push(new Move(moveFull, "pawn", moveTile, true, checkTile, true, piece.color, piece.id));
        }
    }
    return possibleMoves;
}
function CalculateKnightMoves(piece){
    var possibleMoves = [];
    for(let i = 0; i < piece.moves.length; i++){
        var moveTile = new Vector(piece.location.x + piece.moves[i].x, piece.location.y + piece.moves[i].y);
        var moveFull = piece.shorttype + convertToAN(moveTile);
        if(!isOutOfBounds(moveTile) && (findByLocation(moveTile) == undefined || findByLocation(moveTile).color != piece.color)){
            possibleMoves.push(new Move(moveFull, piece.type, moveTile, piece.color, piece.id));
        }
    }
    return possibleMoves;
}
function CalculateSlidingMoves(piece){
    var possibleMoves = [];
    piece.moves.forEach(move=> {
        for(let d = 1; d <= piece.distance; d++){
            var moveTile = new Vector(piece.location.x + (move.x * d), piece.location.y + (move.y * d));
            if(isOutOfBounds(moveTile)) break;
            if(!isTileEmpty(moveTile) && findByLocation(moveTile).color == piece.color) break;
            possibleMoves.push(new Move(piece.shorttype + moveTile, piece.type, moveTile, piece.color, piece.id));
            if(!isTileEmpty(moveTile) && findByLocation(moveTile).color != piece.color) break;

            if(piece.type != "king") continue;
            if(((move.x == -1 && move.y == 0) || (move.x == 1 && move.y == 0)) && !piece.hasmoved){
                var distance = 0;
                for(let i = 1; i <= 4; i++){
                    var tile = convertToAN(new Vector(piece.location.x+i*move.x,piece.location.y));
                    if(!isOutOfBounds(tile)){
                        if(!isTileEmpty(tile)){
                            if(findByLocation(tile).type != "rook" || findByLocation(tile).color != piece.color || findByLocation(tile).hasmoved){
                                break;
                            }
                        }
                    }
                    distance += move.x;
                }
                if(distance == 4 && !isTileEmpty(convertToAN(new Vector(piece.location.x + 3, piece.location.y)))){
                    possibleMoves.push(new Move("O-O", piece.type, new Vector(piece.location.x + 2, piece.location.y), piece.color, piece.id));
                }
                if(distance == -4  && !isTileEmpty(convertToAN(new Vector(piece.location.x - 4, piece.location.y)))){
                    possibleMoves.push(new Move("O-O-O", piece.type, new Vector(piece.location.x-2, piece.location.y), piece.color, piece.id));
                }
            }
        }
    });
    return possibleMoves;
}
export function MovePiece(piece,move,turn,possibleMoves){
    if(piece == null || piece.location == move || piece.color != turn) return;
    var moveSound = new Audio("/assets/sounds/moveSound.mp3");
    var succesfulMove = false;
    possibleMoves.forEach(Move => {
        if(piece.id == Move.id && convertToXY(move).x == Move.move.x && convertToXY(move).y == Move.move.y){
            if(piece.type == "pawn" && (Move.move.y == 8 || Move.move.y == 1)){
                piece.Move(Move.move);
                openPromotionMenu(turn,piece);
                //game.gamePaused = true;
            }
            if(piece.type == "king" && Move.special){
                if(Move.full == "O-O"){
                    findByLocation(new Vector(pieceX+3,pieceX)).location = new Vector(pieceX+1,pieceX);
                }
                if(Move.full == "O-O-O"){
                    findByLocation(new Vector(pieceX-4,pieceX)).location = new Vector(pieceX-1,pieceX);
                }
            }
            if(findByLocation(Move.move) != undefined && findByLocation(Move.move).color != piece.color){
                findByLocation(Move.move).Delete();
            }
            if(piece.type == "pawn") piece.enpassantable = false;
            if(piece.type == "pawn" && piece.hasmoved == false && (piece.location.x - Move.move.y == -2 || piece.location.y - Move.move.y == 2)){
                piece.enpassantable = true;
            }
            if(findByLocation(Move.move) != undefined){
                findByLocation(Move.move).Delete();
            }
            piece.Move(Move.move);
            piece.hasmoved = true;
            moveSound.play();
            succesfulMove = true;
        }
    });
    if(succesfulMove){
        //movesList.push(new Move(move, ));
        return true;
    }
    return false;
}