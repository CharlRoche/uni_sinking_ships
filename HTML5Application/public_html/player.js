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
       this.grid; //this contains locations of all of the players ships (and if they have been hit)
       AI.movelist; //This contains everymove the AI is yet to make.
       
       
       //just realised my OO is crappy and have put in get functions, dont think js specifically needs them however
       
       
    }
};

