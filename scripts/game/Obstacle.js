define( [ "game/Box2D", "game/Collider"], function( Box2D, Collider)
{
	var Obstacle = function(world, position, size, direction) 
	{
		this.size = size;
		this.vitesse = 0.1;
		this.direction;
		this.world = world;
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		this.bodydef.type = Box2D.Body.b2_staticBody;

		this.bodydef.position.Set(position[0], position[1]);
		this.fixdef.shape = new Box2D.PolygonShape();
		this.fixdef.shape.SetAsBox(size[0],size[1]);

		this.body = world.CreateBody( this.bodydef );
		this.body.CreateFixture( this.fixdef );

		this.body.tag = "obstacle";
		this.body.collectible = this;

	}

	Obstacle.prototype.update = function(deltaTime, ship)
	{
		for(var key in ship.modulesSlots) 
		{
			if(ship.modulesSlots[key] instanceof Collider)
			{
				var module = ship.modulesSlots[key];
				var speed = module.body.GetLinearVelocity().y/-25;
				if(speed < 0)
					speed = 0;
			
				this.body.SetPosition({"x":this.body.GetPosition().x,"y":this.body.GetPosition().y+speed+this.vitesse});
						break;
			}
		}
	}
	Obstacle.prototype.render = function(context)
	{
		if(!this.body)
			console.log('toto');
			context.drawImage(window.Images.obstacle,0,0,1025,1569,this.body.GetPosition().x*30-15,this.body.GetPosition().y*30-15,this.size[0]*30,this.size[1]*30);
	
	}

	Obstacle.prototype.constructor = Obstacle;

	return Obstacle;
});