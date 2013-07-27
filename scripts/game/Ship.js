define( [ "game/Box2D", "game/Collider" ], function( Box2D, Collider )
{
	var Ship = function(Level) 
	{
		var modules = [];
		for(var i = 0; i < 3; i++){
			modules[i] = new Collider("square", [1,1], [10,0+2*i], Level.world);
			if(i > 0 ) {
				var jointDef = new Box2D.RevoluteJointDef();
				jointDef.Initialize(modules[i-1].body.GetBody(), modules[i].body.GetBody(), modules[i].body.GetBody().GetWorldCenter());
				console.log(jointDef);
				jointDef.enableLimit = true;			
				Level.world.CreateJoint(jointDef);
			}	
		}
		this.x;
		this.y;
	}

	Ship.prototype.constructor = Ship;
	
	return Ship;
});