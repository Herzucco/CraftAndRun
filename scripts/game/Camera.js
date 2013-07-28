define( [ "game/InputsManager", "../../libs/vectors"], function( InputsManager, Vector)
{
	var Camera = function(position, velocity, speed, limit)
	{
		this.position = position;
		this.velocity = velocity;
		this.speed = speed;
		this.limit = limit || 1;

	};

	Camera.prototype.update = function(deltaTime, world)
	{
		testInputs(this, deltaTime);
		kinematic(this);
		//setWorldPosition(this, world);
	}
	var testInputs = function(that, deltaTime)
	{
		for(var i in InputsManager.instance)
		{
			switch(i)
			{
				case "37" :
					if(InputsManager.instance[i] == true)
						that.velocity.x -= that.speed * deltaTime;
				break;
				case "38" :
					if(InputsManager.instance[i] == true)
					that.velocity.y -= that.speed * deltaTime;
				break;
				case "39" : 
					if(InputsManager.instance[i] == true)
					that.velocity.x += that.speed * deltaTime;
				break;
				case "40" :
					if(InputsManager.instance[i] == true)
					that.velocity.y += that.speed * deltaTime;
				break;
			}
		}
	}
	var kinematic = function(that)
	{
		that.velocity = Vector.limit(that.velocity, that.limit);
		that.position = Vector.add(that.velocity, that.position);
	}
	return Camera;
});