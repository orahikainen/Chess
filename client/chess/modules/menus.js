import {game} from "../app.js";
import {pieces, Piece} from "./pieces.js";

export function openPromotionMenu(turn,piece){
    const div = document.createElement("div");
    div.style.border = "solid 1px black";
    div.style.backgroundColor = "lightgray";
    div.style.width = "30vmin";
    div.style.height = "7.5vmin";
    div.id = "promotionMenu";
    div.style.position = "absolute";
    var top = window.scrollY + document.getElementById(piece.location).getBoundingClientRect().top;
    var left = window.scrollX + document.getElementById(piece.location).getBoundingClientRect().left;
    div.style.top = ((top / screen.height) * 100) + 2.25 + "%";
    div.style.left = ((left / screen.width) * 100) + 5.25 + "%";
    var pieces = ["knight", "bishop", "rook", "queen"];
    for(let i = 0; i < 4; i++){
        const img = document.createElement("img")
        img.src = `../Pieces/${turn}${pieces[i]}.png`;
        img.style.width = "7.5vmin";
        img.style.height = "7.vmin";
        img.onclick = function(){promotionMenuClicked(pieces[i],piece,turn)};
        div.appendChild(img);
    }
    document.body.append(div);
}
function promotionMenuClicked(type,piece,turn){
    if(type == "knight") pieces.push(new Knight(turn,piece.location,piece.id));
    if(type == "bishop") pieces.push(new Bishop(turn,piece.location,piece.id));
    if(type == "rook") pieces.push(new Rook(turn,piece.location,piece.id));
    if(type == "queen") pieces.push(new Queen(turn,piece.location,piece.id));
    piece.Delete();
    game.gamePaused = false;
    game.tileSelected = true;
    document.getElementById("promotionMenu").remove();
    game.RefreshBoard();
}
export function openGameOverMenu(winner){
    const div = document.createElement("div");
    div.style.border = "solid 1px black";
    div.style.position = "absolute";
    div.style.display = "flex";
    div.style.backgroundColor = "lightgray";
    div.style.width = "40vmin";
    div.style.height = "25vmin";
    div.style.left = "39.85vw";
    div.style.top = "37vh";
    div.id = "gameOverMenu";

    var winnertext = document.createElement("p");
    winnertext.innerHTML = "Winner: " + winner;
    winnertext.style.padding = "0";
    winnertext.style.fontSize = "3vmin";
    winnertext.style.position = "relative";
    winnertext.style.left = "27.5%";
    div.appendChild(winnertext);

    var playAgainButton = document.createElement("button");
    playAgainButton.style.width = "10vmin";
    playAgainButton.style.height = "3vmin";
    playAgainButton.innerHTML = "Play again";
    playAgainButton.style.position = "relative";
    playAgainButton.style.top = "60%";
    playAgainButton.style.left = "-5%";
    playAgainButton.onclick = function(){game.RestartGame()};
    div.appendChild(playAgainButton);

    document.body.append(div);
}