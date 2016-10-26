/* 
 * This file will act as the main code. 
 * This should be the only place where code (besides variable declaration) happens outside of a function
 * Author: Peter Henderson
 * Date: 18/10/2016
 * Contribution Log: Name/Date/Description
 *
 */

//MAIN MENU GOES HERE 

//GAME SETUP GOES HERE - (POST HACK)
//DECIDE WHO GOES FIRST

//SHIP POSITIONING GOES HERE 
defineCompFleetHack();
//definePlayerFleetHAck();
//GAMEPLAY GOES HERE 
do {
    switch (playerTurn) {
        case (true):
            //Make Player move
            playerTurn = false;
            // NEED TO REDRAW GRID HERE
            //need to chekc if game won here
            break;

        case (false):
            //makeComp Move
            makeComputerMove(computerGrid);
            playerTurn = true;
            // NEED TO REDRAW GRID HERE
            //need to chekc if game won here
    }

} while (gameWon = false);


//POST GAME GOES HERE







