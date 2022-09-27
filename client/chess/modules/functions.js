import {pieces} from './pieces.js';
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
//Faster and easier way to check if a tile is empty
export function isTileEmpty(tile){
    if(pieces.find(({location}) => location.x == tile.x && location.y == tile.y) == undefined){
        return true;
    }
    return false;
}
//Faster and easier to write way to use array.find
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