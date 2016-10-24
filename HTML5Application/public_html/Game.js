/* 
 * Author: Charlotte Roche
 * 20/10/2016
 */



function Game() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.gameOver = false;


    this.takeTurn = function(currentPlayer, otherPlayer) {
        console.write(currentPlayer.name + "'s turn:\n");
        console.write(otherPlayer.printBoard());

        coord = coord.split(",");
        coord[0] = parseInt(coord[0]);
        coord[1] = parseInt(coord[1]);

        console.write(otherPlayer.takeShotAt(coord));

        console.write(otherPlayer.printBoard());

        /* Is the game over now? */
        if(!otherPlayer.isStillAlive()) {
            console.write(currentPlayer.name + " wins!");
        } else {
            this.takeTurn(otherPlayer, currentPlayer);
        }
    }


    this.init = function() {
        console.write("Welcome to our Game!\n\n");

        this.player1.setup();
        this.player2.setup();

        var currentPlayer = this.player1;
        var otherPlayer   = this.player2;

        this.takeTurn(this.player1, this.player2);
    }

}
