define( [ "game/Box2D", "game/Propulsor" ], function( Box2D, Propulsor )
{
	var Ship = function(world, position) 
	{
		this.modules = [];
		this.joins = [];
		this.position = position;
		
		for(var i = 0; i < 3; i++){
			this.modules.push(new Propulsor("square", [0.5,0.5], [10,0+i], world));
			if(i > 0 ) {
				var jointDef = new Box2D.RevoluteJointDef();
				jointDef.Initialize(this.modules[i-1].body, this.modules[i].body, this.modules[i].body.GetWorldCenter());
				jointDef.enableLimit = true;			
				this.joins.push(world.CreateJoint(jointDef));
			}	
		}
		this.x;
		this.y;
	}

	Ship.prototype.constructor = Ship;

	return Ship;
});