/**
 * Created by Charlotte Roche on 25/10/2016.
 */



g1 = new Grid(10,10);
s1 = new Ship('distroyer', 1);
s2 = new Ship('Battleship', 1);

//first index = x pos, second index = y pos, third index = if the position has been shot
s1.setLocations([[1,1,0], [1,2,0]]);
s2.setLocations([[3,0,0], [3,1,0], [3,2,0], [3, 3, 0], [3,4,0]]);

g1.addShip(s1);
g1.addShip(s2);

console.log(g1);

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
