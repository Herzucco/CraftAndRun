var MoveInput = 
{
	components : ["moveListener", "velocity2d"],
	method : function(moveListener, velocity2d)
	{
		if(moveListener.entityInputs === null || moveListener.entityInputs === undefined)
			moveListener.entityInputs = Puppets.getComponents(Puppets.find("inputListener", true)[0])[0].inputListener.keys;

		var inputs = moveListener.entityInputs;
		var keys = moveListener.keys;

		for(var i in keys)
		{
			if(inputs[i] !== null && inputs[i] === true)
			{
				var moveVector = Vectors.add(velocity2d, keys[i]);
				velocity2d.x = moveVector.x;
				velocity2d.y = moveVector.y;
			}
		}
	}
}