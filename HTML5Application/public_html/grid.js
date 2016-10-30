/**
 * Created by Charlotte Roche on 20/10/2016.
 * Updated it (including the title to incorporate all code)
 */


function createArray(length) {
	var arr = new Array(length || 0),
			i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

//undefined = not hit or picked
//ship with location index 2 == 0 is unhit
//ship with location index 2 == 1 is hit



function Grid(xSize, ySize){
	this.xSize = xSize;
	this.ySize = ySize;
	this.grd = createArray(xSize, ySize);
}

Grid.prototype = {
	constructor:Grid,
	getGrid: function () {
		return this.grd;
	},
	clearGridValue: function (x,y) {
		this.grd[x][y] = undefined;
	},
	addShip:function(ship) {
		for (var i = 0; i < ship.getLocations().length; i++){
			currentloc = ship.getLocations()[i];
			this.grd[currentloc[0]][currentloc[1]] = ship;
		}
	},
	fireAtLocation: function (x,y) {
		if (typeof this.getGrid()[x][y] != 'undefined')	{
			currentShip = this.getGrid()[x][y];
			//console.log('Ship hit at [' + x + '], [' + y+']');
                        window.alert('You hit a ship at [' + x + ', ' + y+']');
			currentShip.shootShip(x,y);
		}else{
			//console.log('No ship found');
                        window.alert('You missed!')
		}
	}
};

