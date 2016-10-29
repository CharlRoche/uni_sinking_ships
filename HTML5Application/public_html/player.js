/*
 * Created by Charlotte Roche on 20/10/2016.
 *  *Contribution Log: Name/Date/Description
 *  Peter Henderson/27/10/2016/Added grid, build move list and buildmovelist function
 */


function player(name, xSize, ySize) {
    this.name = name;
    this.moveList = this.buildMoveList(xSize, ySize);
    this.grid = new Grid(xSize, ySize);



}

player.prototype = {
    constructor: player,
    getName: function () {
        return this.name;
    },
    makePlayerMove: function (){
        
    },
    buildMoveList: function (xSize, ySize) {
        var moveList = [];
        for (i = 0; i < ySize; i++) {
            for (j = 0; j < xSize; j++) {
                moveList.push(i + ',' + j);
            }
        }
        return moveList;
    },
    drawGrid: function () { //draw the players grid containing their ships
        var squareSize = 50;
        var gameBoardContainer = document.getElementById("gameboard");
        // this has been hard coded for the hack, taken form gridCreation
        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
		
		// create a new div HTML element for each grid square and make it the right size
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

                // give each div element a unique id based on its row and column, like "s00"
		//square.id = Number(String(i) + String(j)) ;	
                // The p signifys that it is the id for the players board
                square.id = "p" + String(i) + String(j) ;	
            
		// set each grid square's coordinates: multiples of the current row or column number
		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;			
		
		// use CSS absolute positioning to place each grid square on the page
		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';						
	}
}

        //this.grid; //this contains locations of all of the players ships (and if they have been hit)
       //AI.movelist; //This contains everymove the AI is yet to make.
       
       // Abby to do:
       // loop through AI.movelist and for i and j change colour
       // once this has been done similar code can be used at MVP for adding ship
       
       //just realised my OO is crappy and have put in get functions, dont think js specifically needs them however
       
       
    }
};

