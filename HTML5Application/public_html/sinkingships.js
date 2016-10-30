/**
 * Created by Charlotte Roche on 25/10/2016.
 * Contribution Log: Name/Date/Description
 * Peter Henderson/29/10/2016/Added game structure, start game function - updated to add content from original main.js file.
 * Peter Henderson/30/10/2016/Completely reworked gameflow to allow for waiting for user click for their move.
 */

//MAIN MENU GOES HERE 

//GAME SETUP GOES HERE - (POST HACK)
//DECIDE WHO GOES FIRST


startGame(10,10);


//GAMEPLAY GOES HERE 
function startPlayerMove(target) {



    player.makePlayerMove(target);
    AI.drawGrid();
    console.log("here");
    var userScore = playerShipsAlive();

    if (gameWon === true) {
        endGame();
    } else
    {
        makeAIMove();
    }
}



function makeAIMove() {
    
    AI.makeComputerMoveEasy();
    player.drawGrid();
    aiShipsAlive();
    playerTurn = true;
    var aiScore = aiShipsAlive();

    if (gameWon === true) {
        endGame();
    }
};


function startGame(xLength, yLength) {//configures and starts the game

    player = new player('Pete', xLength, yLength);
    AI = new AI(xLength, yLength);
    player.definePlayerFleetHack();
    AI.defineCompFleetHack();
    player.drawInitialGrid();
    AI.drawInitialGrid();
    playerTurn = true; //player goes first - can give choice for MVP

    if (playerTurn === false) {
        makeAIMove  //when player turn, function is started onclick
    }

}
;

function endGame() {
    alert("Games Over");//should probs do something a little more interesting here
}
;

function aiShipsAlive() {
    var deadAIShipCount = 5;
    if (AIShip1.checkIsAlive()) {
        deadAIShipCount--;
    }
    if (AIShip2.checkIsAlive()) {
        deadAIShipCount--;
    }
    if (AIShip3.checkIsAlive()) {
        deadAIShipCount--;
    }
    if (AIShip4.checkIsAlive()) {
        deadAIShipCount--;
    }
    if (AIShip5.checkIsAlive()) {
        deadAIShipCount--;
    }
    if (deadAIShipCount === 5) {
        gameWon = "True";
    }
    return deadAIShipCount;
}

function playerShipsAlive() {
    var deadPlayerShipCount = 5;
    if (PlayerShip1.checkIsAlive()) {
        deadPlayerShipCount--;
    }
    if (PlayerShip2.checkIsAlive()) {
        deadPlayerShipCount--;
    }
    if (PlayerShip3.checkIsAlive()) {
        deadPlayerShipCount--;
    }
    if (PlayerShip4.checkIsAlive()) {
        deadPlayerShipCount--;
    }
    if (PlayerShip5.checkIsAlive()) {
        deadPlayerShipCount--;
    }
    if (deadPlayerShipCount === 5) {
        gameWon = "True";
    }
    return deadPlayerShipCount;
}

var aiScore = aiShipsAlive();
var userScore = playerShipsAlive();

/*
 g1 = new Grid(10,10);
 console.log(g1.getGrid());
 g2 = new Grid(10,10);
 player.drawGrid();
 AI.drawGrid();
 
 //Needs a ship creation for each of the ships styles with the positioning set below. They will all be horizontally positioned at this point
 s1 = new Ship('destroyer', 1);
 s2 = new Ship('Battleship', 1);
 
 //first index = x pos, second index = y pos, third index = if the position has been shot
 s1.setLocations([[8,8,0], [7,8,0]]);
 s2.setLocations([[3,0,0], [3,1,0], [3,2,0], [3, 3, 0], [3,4,0]]);
 
 
 g1.addShip(s1);
 g1.addShip(s2);
 
 // These will need adding into the addShip function later
 // also have functionality to add ship on click
 //place s1 on grid
 document.getElementById("p88").style.background="black";
 document.getElementById("p78").style.background="black";
 
 //place s2 on grid
 document.getElementById("p30").style.background="black";
 document.getElementById("p31").style.background="black";
 document.getElementById("p32").style.background="black";
 document.getElementById("p33").style.background="black";
 document.getElementById("p34").style.background="black";
 
 
 // example of what it looks like when user hit AI ship
 document.getElementById("ai14").style.background="red";
 document.getElementById("ai59").style.background="red";
 
 // example of what it looks like when user has taken a go but missed
 document.getElementById("ai15").style.background="grey";
 document.getElementById("ai24").style.background="grey";
 document.getElementById("ai88").style.background="grey";
 document.getElementById("ai57").style.background="grey";
 document.getElementById("ai11").style.background="grey";
 
 console.log(g1);
 console.dir(g1);
 //to fire at a ship use g1.fireAtLocation
 //g1.getGrid will get grid array, which you can visual aspects from
 
 
 //to have ai you will just need two grids. the human players interactions go through manual fireAtLocation,
 //the ais choice of location will be randomly generated
 
 
 //scoring needs to be added, can either be done by counting the number of hits or checking locations
 
 
 //example of code working, uncomment if needed
 
 /*
 g1.fireAtLocation(1,1);
 s1.checkIsAlive();
 g1.fireAtLocation(1,2);
 s1.checkIsAlive();
 
 */
