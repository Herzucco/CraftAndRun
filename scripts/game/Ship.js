define( [ "game/Box2D", "game/InputsManager", "../../libs/vectors", "game/Collider", "game/Propulsor" ], function( Box2D, InputsManager, Vectors, Collider, Propulsor )
{
	var Ship = function(world, position) 
	{
		this.world = world;
		this.joins = [];
		this.position = position;
		this.nbModules = 0;
		this.firstModule = null;
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
		switch(moduleType)
		{
			case "collider" :
				this.modulesSlots[slot] = new Collider("square", [0.5,0.5], [position.x+this.position[0], position.y+this.position[1]], this.world);
			break;
			case "propulsor" :
				this.modulesSlots[slot] = new Propulsor("square", [0.5,0.5], [position.x+this.position[0], position.y+this.position[1]], this.world);
			break;
		}
		if(this.nbModules > 0)
		{
			var jointDef = new Box2D.RevoluteJointDef();
				jointDef.Initialize(this.firstModule.body, this.modulesSlots[slot].body, this.modulesSlots[slot].body.GetWorldCenter());
				jointDef.enableLimit = true;			
				this.joins.push(this.world.CreateJoint(jointDef));
		}
		else
			this.firstModule = this.modulesSlots[slot];

		this.nbModules++;
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
	
	Ship.prototype.update = function(deltaTime)
	{
		if(InputsManager.instance["88"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "left" && this.modulesSlots[i].body !== null && this.modulesSlots[i].body !== undefined )
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);

					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
		if(InputsManager.instance["78"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "right" && this.modulesSlots[i].body !== null && this.modulesSlots[i].body !== undefined)
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);
					
					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
		if(InputsManager.instance["86"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "top" && this.modulesSlots[i].body !== null && this.modulesSlots[i].body !== undefined)
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);
					
					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
		for(var i in this.modulesSlots)
			if(this.modulesSlots[i].update !== undefined && this.modulesSlots[i].update !== null)
				this.modulesSlots[i].update(deltaTime);
	}
	Ship.prototype.constructor = Ship;

	return Ship;
});