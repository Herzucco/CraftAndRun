function playerGeneration(numbOfPlayer)
{
	var color = ["hsla(248, 100%, 41%, 1)","hsla(200, 100%, 55%, 1)","hsla(212, 100%, 45%, 1)","hsla(223, 100%, 47%, 1)"];
	var colorAttacks = [get_random_color(),get_random_color(),get_random_color()];
	var attackType = ["attackOne","attackTwo","attackThree"];
	window.addEventListener("keydown", keyDown, true);
	window.addEventListener("keyup", keyUp, true);
	var position2d = [{"x" : 0,"y" : 0},
					{"x" : canvas.width/2,"y" : 0},
					{"x" : canvas.width/2,"y" : canvas.height/2},
					{"x" : 0,"y" : canvas.height/2}];
	
	var positionId = ["top-left","top-right","bottom-right","bottom-left"];
	
	var numbOfPlayer = numbOfPlayer;
	
	if(numbOfPlayer == 2 )
	PlayersBool = [true,true,false,false];
	else if (numbOfPlayer == 3)
		PlayersBool = [true,true,true,false];
	else if (numbOfPlayer == 4 )
		PlayersBool = [true,true,true,true];
	
	for (var count = 0; count<numbOfPlayer ; count++)
	{
		
		var rectangleId = Puppets.Entities.createEntity(
		entitiesModels["rectParent"], 
		{ 
			renderShape : {"color" : color[count]},
			size2d :{"width"  : canvas.width/2,"height" : canvas.height/2},
			position2d : position2d[count],
			childs : {number : 0},
			positionId : { corner : positionId[count] }
		}
		);
		var positionAttractor = [{"x" : 256, "y" : 192},{"x" : 768, "y" : 192},{"x" : 768, "y" : 576},{"x" : 256, "y" : 576}];
		var attractorId = Puppets.Entities.createEntity(
		entitiesModels["attractor"], 
		{ 
			catchForces : {"force" : 0},
			fromPlayer : {"player" : count},
			position2d : positionAttractor[count],
			size2d : {"radius" : 30},
			renderShape : {"color" : "white"}
		}
		);
		for(var i = 0; i < 3; i++)
		{
			Puppets.Entities.createEntity(
			entitiesModels["attack"], 
			{ 
				attackChooser : {"name" : attackType[i]},
				attracted : {"attractor" : attractorId, "player" : count,"name" : attackType[i]},
				position2d : {'x' : Math.random()*700, 'y' : Math.random()*500},
				size2d : {"radius" : 15},
				renderShape : {"color" : colorAttacks[i]},
				velocity2d : {"x" : 50, "y" : 50}
			}
			);	
		}
		// creation de l'entité player
		Puppets.Entities.createEntity(
		entitiesModels["player"],
		{
			attractorId : {"number" :attractorId },
			life : {'number' : "100"},
			rectParentId: {'number' : rectangleId },
			id : {'number' : count},
			idListLife : {'number' : count}
		}
		);
	}
}