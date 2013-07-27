define( [ "game/Box2D", "game/Propulsor" ], function( Box2D, Propulsor )
{
	var Ship = function(world, position) 
	{
		this.world = world;
		this.modules = [];
		this.joins = [];
		this.position = position;
		this.modulesSlots = {
			"upper-left" : {x : -1, y : -1},
			"upper-top" : {x : 0, y : -1},
			"upper-right" : {x : 1, y : -1},
			"middle-left" : {x : -1, y : 0},
			"middle-top" : {x : 0, y : 0},
			"middle-right" : {x : 1, y : 0},
			"lower-left" : {x : -1, y : 1},
			"lower-top" : {x : 0, y : 1},
			"lower-right" : {x : 1, y : 1},
		}
		
		//add contact listener
		var listener = new Box2D.ContactListener;
		listener.BeginContact = this.shipCollision;
		
		world.SetContactListener( listener );
	}
	
	Ship.prototype.addModule = function(slot, moduleType)
	{
		var position = this.modulesSlots[slot];
		console.log([position.x+this.position[0], position.y+this.position[1]])
		console.log(position)
		switch(moduleType)
		{
			case "collider" :
				this.modules.push(new Propulsor("square", [0.5,0.5], [position.x+this.position[0], position.y+this.position[1]], this.world));
			break;
			case "propulsor" :
				this.modules.push(new Propulsor("square", [0.5,0.5], [position.x+this.position[0], position.y+this.position[1]], this.world));
			break;
		}
		if(this.modules.length > 1)
		{
			var length = this.modules.length;
			var jointDef = new Box2D.RevoluteJointDef();
				jointDef.Initialize(this.modules[0].body, this.modules[length-1].body, this.modules[length-1].body.GetWorldCenter());
				jointDef.enableLimit = true;			
				this.joins.push(this.world.CreateJoint(jointDef));
		}
	}
	
	Ship.prototype.shipCollision = function( contact )
	{
		var bodies = [ contact.GetFixtureA().GetBody(), contact.GetFixtureB().GetBody() ];
		var shipIndex = ( bodies[0].tag === "ship" ) ? 0 : -1;
		shipIndex = ( bodies[1].tag === "ship" ) ? 1 : shipIndex;
		
		if ( shipIndex === -1 )
			return;
		
		if ( bodies[0].tag === bodies[1].tag )
			return;
			
		//module hit print type
		if ( bodies[shipIndex].module instanceof Propulsor )
			console.log( "Propulsor hit" );
	}
	
	Ship.prototype.constructor = Ship;

	return Ship;
});