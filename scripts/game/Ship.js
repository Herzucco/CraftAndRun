define( [ "game/Box2D", "game/InputsManager", "../../libs/vectors", "game/Wind", "game/Collider", "game/Propulsor" ], function( Box2D, InputsManager, Vectors, Wind, Collider, Propulsor )
{
	var Ship = function(world, position) 
	{
		this.dead = false;
		this.score = 0;
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
		
		this.instance = this;
		
		//add contact listener
		var listener = new Box2D.ContactListener;
		listener.BeginContact = this.shipCollision;
		listener.PreSolve     = this.shipObstacleCollision;
		
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
				
				var joint = this.world.CreateJoint(jointDef);
				this.modulesSlots[slot].joint = joint;
				this.joins.push( joint );
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
		
		var module = bodies[shipIndex].module;
		if(bodies[1 - shipIndex] === null || bodies[1 - shipIndex] === undefined)
			var obstacle = bodies[shipIndex + 1];
		else
			var obstacle = bodies[1 - shipIndex];

		//module hit print type
		if ( module instanceof Collider && obstacle.tag !== "wind" && obstacle.tag !== "collectible")
		{
			module.hp = Math.max( 0, module.hp - 0.5 );
		}
	}
	
	Ship.prototype.shipObstacleCollision = function( contact, oldManifold )
	{
		var bodies = [contact.GetFixtureA().GetBody(), contact.GetFixtureB().GetBody()];
		var shipIndex = ( bodies[0].tag === "ship" ) ? 0 : -1;
		shipIndex = ( bodies[1].tag === "ship" ) ? 1 : shipIndex;

		if ( shipIndex === -1 )
			return;
		
		if ( bodies[0].tag === bodies[1].tag )
			return;
		
		if(bodies[1-shipIndex].tag=== "collectible"){
			this.score += 100;
			bodies[1-shipIndex].collectible.hp = 0;
			contact.SetEnabled( false );
		}else{
			var wind = bodies[1 - shipIndex].parent;
			if(wind instanceof Wind)
			{
				var module = bodies[shipIndex].module;

				if( module instanceof Collider)
					wind.blow(module);
				contact.SetEnabled( false );
			}
		}
	}
	
	Ship.prototype.update = function(deltaTime)
	{
		if(!this.dead)
		{
			this.checkInputs();
			for(var i in this.modulesSlots)
			{
				var oneAlive = false;
				if( this.modulesSlots[i] instanceof Collider )
				{
					this.modulesSlots[i].update(deltaTime, this.world );
					if(this.modulesSlots[i].body.GetPosition().y < 20)
						oneAlive = true;
					if(this.modulesSlots[i].hp <= 0)
					{
						this.modulesSlots[i] = {};
					}
				}
			}

			if(!oneAlive)
				this.die();
		}
	}
	Ship.prototype.die = function()
	{
		this.dead = true;
		for(var i in this.modulesSlots)
			delete this.modulesSlots[i];

		this.joins.length = 0;
	}
	Ship.prototype.render = function(context)
	{
		context.strokeStyle = "#FFFFFF";
		context.fillStyle = "#000000";
		context.font = "Bold 47px MenuFont";
	    context.fillText(""+this.score+"", 800, 50);
	    context.strokeText(""+this.score+"", 800, 50);

	    for(var key in this.modulesSlots){
	    	if(this.modulesSlots[key] instanceof Collider){
	    		this.modulesSlots[key].render(context);
	    	}
	    }
	}
	Ship.prototype.checkInputs = function()
	{
		if(InputsManager.instance["39"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "left" && this.modulesSlots[i] instanceof Collider )
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);
					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
		if(InputsManager.instance["37"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "right" && this.modulesSlots[i] instanceof Collider)
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);
					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
		if(InputsManager.instance["38"] == true)
		{
			for(var i in this.modulesSlots)
			{
				if(i.split("-")[1] == "top" && this.modulesSlots[i] instanceof Collider)
				{
					var module = this.modulesSlots[i];
					var direction = module.body.GetLocalVector(new Box2D.Vec2(0,-1));
					direction.x *= -1;
					var force = Vectors.mult(direction, module.force);
					module.body.ApplyForce(force, module.body.GetPosition());
				}
			}
		}
	}
	Ship.prototype.constructor = Ship;

	return Ship;
});