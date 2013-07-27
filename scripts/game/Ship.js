define( [ "game/Box2D", "game/Collider" ], function( Box2D, Collider )
{
	var Ship = function(world) 
	{
		this.modules = [];
		this.joins = [];
		for(var i = 0; i < 3; i++){
			this.modules.push(new Collider("square", [0.5,0.5], [10,0+i], world));
			if(i > 0 ) {
				var jointDef = new Box2D.RevoluteJointDef();
				jointDef.Initialize(this.modules[i-1].body.GetBody(), this.modules[i].body.GetBody(), this.modules[i].body.GetBody().GetWorldCenter());
				jointDef.enableLimit = true;			
				this.joins.push(world.CreateJoint(jointDef));
			}	
		}
		this.x;
		this.y;
		
		//add contact listener
		var listener = new Box2D.ContactListener;
		listener.BeginContact = this.shipCollision;
		
		world.SetContactListener( listener );
	}

	Ship.prototype.shipCollision = function( contact )
	{
		var bodies = [ contact.GetFixtureA().GetBody(), contact.GetFixtureB().GetBody() ];
		console.log( "Collision" );
	}
	
	Ship.prototype.constructor = Ship;

	return Ship;
});