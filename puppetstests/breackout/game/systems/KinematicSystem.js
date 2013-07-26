var Kinematic = 
{
	components : ["position2d", "velocity2d"],
	method : function(position2d, velocity2d)
	{
		if(velocity2d.limit !== null && velocity2d.limit !== undefined)
		{
			var newVelocity = Vectors.limit(velocity2d, velocity2d.limit);
			velocity2d.x = newVelocity.x;
			velocity2d.y = newVelocity.y;
		}

		if(position2d.limit !== null && position2d.limit !== undefined)
			var newPosition = Vectors.limit(Vectors.add(position2d, velocity2d), position2d.limit);
		else
			var newPosition = Vectors.add(position2d, velocity2d);
		
		position2d.x = newPosition.x;
		position2d.y = newPosition.y;

	}
}