/************************************************************************************
 * JS File with all the global variables
 ***********************************************************************************/
var RADIUSBALL = 50;
var PlayersBool ;
function createPlayer()
{

	Puppets.Entities.createEntity(
	entitiesModels["attractor"], 
	{ 
		catchForces : {"force" : 0},
		fromPlayer : {"player" : 1},
		position2d : {"x" : canvas.width/4 + canvas.width/2, "y" : canvas.height/4},
		size2d : {"radius" : 20},
		renderShape : {"color" : "white"}
	}
	);

	Puppets.Entities.createEntity(
	entitiesModels["attractor"], 
	{ 
		catchForces : {"force" : 0},
		fromPlayer : {"player" : 2},
		position2d : {"x" : canvas.width/4, "y" : canvas.height/4},
		size2d : {"radius" : 20},
		renderShape : {"color" : "white"}
	}
	);

	Puppets.Entities.createEntity(
	entitiesModels["attractor"], 
	{ 
		catchForces : {"force" : 0},
		fromPlayer : {"player" : 3},
		position2d : {"x" : canvas.width/4, "y" : canvas.height/4 + canvas.height/2},
		size2d : {"radius" : 20},
		renderShape : {"color" : "white"}
	}
	);

	Puppets.Entities.createEntity(
	entitiesModels["attractor"], 
	{ 
		catchForces : {"force" : 0},
		fromPlayer : {"player" : 4},
		position2d : {"x" : canvas.width/4 + canvas.width/2, "y" : canvas.height/4 + canvas.height/2},
		size2d : {"radius" : 20},
		renderShape : {"color" : "white"}
	}
	);
}

function attack(player, attack)
{
	players = Puppets.Entities.getComponents(Puppets.find("fromPlayer player=="+(player-1), true))[0];
	var ballToLaunch = null;
	switch (attack)
	{
		case 1: 
			attack = players.attackOne;
			ballToLaunch = Puppets.find("attracted name=='attackOne'&&object.player=="+(player-1), true)
		break;
		case 2: 
			attack = players.attackTwo;
			ballToLaunch = Puppets.find("attracted name=='attackTwo'&&object.player=="+(player-1), true)
		break;
		case 3: 
			attack = players.attackThree;
			ballToLaunch = Puppets.find("attracted name=='attackThree'&&object.player=="+(player-1), true)
		break;
	}
	if(attack.count/60 >= attack.coolDown)
	{
		console.log(ballToLaunch)
		switch (attack.force)
		{
			case 1: 
				launchPulse(audioBufferList[0],player);
			break;
			case 2: 
				launchPulse(audioBufferList[1],player);
			break;
			case 3: 
				launchPulse(audioBufferList[2],player);
			break;
		}
		Puppets.Entities.getComponents(ballToLaunch)[0].attracted.attractor = Puppets.find("ballCenter", true)[0];
		players.catchForces.force -= attack.force;
		attack.count = 0;
	}
}

function rand(min, max) {
    return parseInt(Math.random() * (max-min+1), 10) + min;
}

function get_random_color() {
    var h = rand(1, 360);
    var s = rand(0, 100);
    var l = rand(0, 100);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}