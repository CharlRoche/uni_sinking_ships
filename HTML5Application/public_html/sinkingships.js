
/**
 * Created by Charlotte Roche on 25/10/2016.
 * Contribution Log: Name/Date/Description
 * Peter Henderson/29/10/2016/Added game structure, start game function - updated to add content from original main.js file.
 * Peter Henderson/30/10/2016/Completely reworked gameflow to allow for waiting for user click for their move.
 * Peter Henderson/17/11/2016/Rewrote aiShipsAlive to work with a dynamic number of ships
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}

var playerSettings = getCookie('playerSettings');
var playerSettings = JSON.parse(playerSettings);




var xLength = playerSettings.xLength;
var yLength = playerSettings.yLength;
var difficulty = playerSettings.difficulty;
var playerTurn = playerSettings.playerTurn;
var AIthoughts = 0;
var debug = true; //turn AI thinking on or off / true or false
//default settings

setHalfVolume();

startGame(xLength, yLength, difficulty, playerTurn);
var aiScore = aiShipsAlive();
var userScore = playerShipsAlive();

function startGame(xLength, yLength, difficulty, playerTurn) {//configures and starts the game

    player = new player('Pete', xLength, yLength);
    AI = new AI(xLength, yLength, difficulty);
    player.definePlayerFleetMVP();
    player.drawInitialGrid(xLength, yLength);
    AI.drawInitialGrid(xLength, yLength);
    //debug console.log(player.grid);
    //debug console.log(AI.grid);
    refreshTime();
    if (playerTurn === 'false') {
        setTimeout(function () {
            AI.think();
        }, 2000);
        setTimeout(function () {
            makeAIMove();
        }, 4300);  //when player turn, function is started onclick
    } else {
        $("#turn").text("Player Go");
        $("#turn").css({'color': 'blue'});
    }

}
;


function startPlayerMove(target) {
    $('#aigameboard').children().off('click');

    player.makePlayerMove(target);
    console.log(player.extraShot);
    //var userScore = playerShipsAlive();    
    if (gameWon === true) {
        endGame();
    }

    if (!debug && !AI.missNextGo && player.extraShot === 0)
    {
        setTimeout(function () {
            AI.think();
        }, 2000);
        setTimeout(function () {
            makeAIMove();
        }, 4300);
    } else if (!AI.missNextGo && player.extraShot === 0) {
        makeAIMove();
    } else if (player.extraShot === 0)
    {
        AI.missNextGo = false;

    } else
    {
        player.extraShot = player.extraShot - 1;
        restoreOnClick();
    }
    ;
    document.getElementById("pscore").innerHTML = "Your Score: " + aiShipsAlive();
}
;
function makeAIMove() {

    if (difficulty == "easy") {
        AI.makeComputerMoveEasy();
    } else {
        AI.makeComputerMoveHard();
    }
    aiShipsAlive();
    playerTurn = true;
    var aiScore = aiShipsAlive();

    if (gameWon === true) {
        endGame();
    }


    if (AI.extraShot > 0) {
        AI.extraShot = AI.extraShot - 1;
        if (!debug && !AI.missNextGo)
        {
            setTimeout(function () {
                AI.think();
            }, 2000);
            setTimeout(function () {
                makeAIMove();
            }, 4300);
        } else if (!AI.missNextGo) {
            makeAIMove();
        } else {
            AI.missNextGo = false;
        }
    } else if (player.missNextGo === true) {
        player.missNextGo = false;
        if (!debug && !AI.missNextGo)
        {
            setTimeout(function () {
                AI.think();
            }, 2000);
            setTimeout(function () {
                makeAIMove();
            }, 4300);
        } else if (!AI.missNextGo) {
            makeAIMove();
        } else {
            AI.missNextGo = false;
        }
    } else if (debug) {
        restoreOnClick();
    } else {
        setTimeout(function () {
            restoreOnClick();
        }, 3000);
    }
    document.getElementById("cscore").innerHTML = "Computer's Score: " + playerShipsAlive()
}
;
function restoreOnClick() {


    for (var i = 0; i < player.moveList.length; i++) {
        locat = 'ai' + player.moveList[i];
        $($(jq(locat))).on('click', function () {
            startPlayerMove(this.id);
        });
    }
    $("#turn").text("Player Go");
    $("#turn").css({'color': 'blue'});
}
;

function endGame() {
    var winner;
    if (playerShipsAlive() === 0) {
        winner = 'You';

    } else {
        winner = 'Computer';
    }
    alert("Games Over\n\
    The Winner is: " + winner);//should probs do something a little more interesting here
}
;
function aiShipsAlive() {

    var deadAIShipCount = AI.ship.length;
    for (var i = 0; i < AI.ship.length; i++) {
        if (AI.ship[i].checkIsAlive()) {
            deadAIShipCount--;
        }
    }
    if (deadAIShipCount === AI.ship.length) {
        endGame();
    }
    return deadAIShipCount;
}
;

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
    if (deadPlayerShipCount === 0) {
        endGame();
    }
    return deadPlayerShipCount;
}


;
