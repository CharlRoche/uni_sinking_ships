/*
 * Created by Charlotte Roche on 20/10/2016.
 * Only holds details about the player now. can expand if needed for the MVP
 */


function Player(name){
	this.name = name;
}

Player.prototype = {
	constructor:Player,
	getName:function(){
		return this.name;
	}
};

