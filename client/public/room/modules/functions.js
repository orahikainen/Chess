import {pieces, Piece, EmptyPieces} from './pieces.js';
import {Vector} from './types.js';
//Converts from [x,y] to algebraic notation ([1,6] to a6)
export function convertToAN(tile){
    var characters = ['a','b','c','d','e','f','g','h'];
    var tileConverted = characters[tile.x - 1] + tile.y;
    return tileConverted;
}
//Does the exact opposite of the last function
export function convertToXY(tile){
    var characters = ['a','b','c','d','e','f','g','h'];
    var tileConverted = new Vector(characters.indexOf(tile.split("")[0]) + 1, parseInt(tile.split("")[1]));
    return tileConverted;
}
export function isTileEmpty(tile){
    if(pieces.find(({location}) => location.x == tile.x && location.y == tile.y) == undefined){
        return true;
    }
    return false;
}
export function findByLocation(tile){
    var result = pieces.find(({location}) => location.x == tile.x && location.y == tile.y);
    return result;
}
export function findById(ID){
    var result = pieces.find(({id}) => id == ID);
    return result;
}
//Checks if a tile is not on the board
export function isOutOfBounds(tile){
    for (let i = 1; i <= 8; i++) {
        for(let j = 1; j <= 8; j++){
            var currentTile = new Vector(i,j);
            if(tile.x == currentTile.x && tile.y == currentTile.y){
                return false;
            }
        }
    }
    return true;
}
export function getFEN(){
    var result = "";
    for (let i = 1; i <= 8; i++) {
        var emptyTiles = 0;
        for(let j = 1; j <= 8; j++){
            var currentTile = new Vector(j,i);
            if(findByLocation(currentTile) != undefined && findByLocation(currentTile).shorttype != "") {
                if(emptyTiles != 0){
                    result += emptyTiles;
                    emptyTiles = 0; 
                }
                result += findByLocation(currentTile).color == "white" ? findByLocation(currentTile).shorttype.toLocaleLowerCase() : findByLocation(currentTile).shorttype.toLocaleUpperCase();
            }
            if(findByLocation(currentTile) != undefined && findByLocation(currentTile).shorttype == "") {
                if(emptyTiles != 0){
                    result += emptyTiles; 
                    emptyTiles = 0; 
                } 
                result += findByLocation(currentTile).color == "white" ? "p" : "P";
            }
            if(findByLocation(currentTile) == undefined){
                emptyTiles++;
            }
            if(j == 8 && emptyTiles == 8) result += 8;
        }
        result += "/";
    }
    result = result.slice(0, -1);
    return result;
}
export function setFEN(FEN){
    EmptyPieces();
    var id = 0;
    var testvar = FEN.split("/");
    for (let i = 1; i <= 8; i++) {
        var testvar3 = 0;
        for(let j = 1; j <= 8; j++){
            var testvar2 = testvar[i-1].split("")[j-1];
            if(testvar2 == undefined){
                continue;
            }
            if(!isNaN(testvar2)){
                testvar3+=parseInt(testvar2-1);
                continue;
            } 
            const typesMap = new Map([
                ["p","pawn"],
                ["r","rook"],
                ["b","bishop"],
                ["n","knight"],
                ["q","queen"],
                ["k","king"],
            ]);
            var type = typesMap.get(testvar2.toLocaleLowerCase());
            var color = testvar2 == testvar2.toLocaleLowerCase() ? "white" : "black";
            var location = new Vector(j+testvar3,i);
            id++;
            pieces.push(new Piece(type,color,location,id));
        }
    }
}