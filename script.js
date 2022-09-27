//selection for different gamemodes
const gameMode = {
    PvP: document.getElementById("pvp"),
}
let domWinner = document.getElementById("winner");
const domBoard = document.getElementById("dom-board");
//marker pieces
const marks = {
    X: "X",
    O: "O"
}
//player factory function
const makeplayer = function(name, mark){
    return { name, mark };
};
const Gameboard = (() => {
    //GAMEBOARD ARRAY\
    const gameBoard = [];
    //player vs. player mode
    const pvp = function(){
        console.log(`Mode: Player vs. Player`);
        //loads board
        const load = function(){
            while(domBoard.children.length < 9) {
                for(let i = 0; i < 9; i++) 
                {
                    let div = document.createElement("div");
                    div.classList = "gamePiece";
                    div.dataset.index = i;
                    gameBoard.push(div);
                    domBoard.appendChild(div);
                }
            }
        }
        load();
        const playerOne = makeplayer(window.prompt("Player One Name?"), marks.X);
        const playerTwo = makeplayer(window.prompt("Player Two Name?"), marks.O);
        let numTurns = 0;
        let turn = playerOne;
        let gameOver = false;
        //adds marks to board on click
        const addMarks = function(){     
            
            gameBoard.forEach(space => {
                space.addEventListener("click",function(){
                    
                    const checkWinner = function(){
                        const winningAxes = [
                            //axes 1
                            [gameBoard[0].innerHTML,gameBoard[1].innerHTML,gameBoard[2].innerHTML],
                            //axes 2
                            [gameBoard[3].innerHTML,gameBoard[4].innerHTML,gameBoard[5].innerHTML],
                            //axes 3
                            [gameBoard[6].innerHTML,gameBoard[7].innerHTML,gameBoard[8].innerHTML],
                            //axes 4
                            [gameBoard[0].innerHTML,gameBoard[3].innerHTML,gameBoard[6].innerHTML],
                            //axes 5
                            [gameBoard[1].innerHTML,gameBoard[4].innerHTML,gameBoard[7].innerHTML],
                            //axes 6
                            [gameBoard[2].innerHTML,gameBoard[5].innerHTML,gameBoard[8].innerHTML],
                            //axes 7
                            [gameBoard[0].innerHTML,gameBoard[4].innerHTML,gameBoard[8].innerHTML],
                            //axes 8
                            [gameBoard[2].innerHTML,gameBoard[4].innerHTML,gameBoard[6].innerHTML]
                        ]; 
                        for(let i = 0; i < 8; i++) {
                        let arr = winningAxes[i].join('');
                            if(arr === "XXX") {
                                console.log("winner x")
                                domWinner.style.display = 'block';
                                domWinner.textContent = `Winner: ${playerOne.name}`;
                                gameOver = true;
                            }
                            else if(arr === "OOO") {
                                console.log("winner o")
                                domWinner.style.display = 'block';
                                domWinner.textContent = `Winner: ${playerTwo.name}`;
                                gameOver = true;
                            }
                            else {
                                continue;
                            }
                        }
                        return false;
                    }
                    checkWinner();  
                    if(turn === playerOne && space.textContent !== marks.O && numTurns < 10 && gameOver === false) {
                        space.textContent = marks.X;
                        numTurns++;
                        turn = playerTwo;
                    }
                    else if(turn === playerTwo && space.textContent !== marks.X && numTurns < 10 && gameOver === false) {
                        space.textContent = marks.O;
                        numTurns++;
                        turn = playerOne;
                    }
                    else if (numTurns === 9) {
                        domWinner.style.display = 'block';
                        domWinner.textContent = `Tie!`;
                    }
                })
            })
        }
        addMarks(); 
    }
    //returning functions and data
    return { gameBoard, pvp };
})();
gameMode.PvP.addEventListener("click", Gameboard.pvp);
