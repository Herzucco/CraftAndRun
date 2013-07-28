define( [ "game/Box2D", "game/InputsManager", "game/Collider", "game/Propulsor", "../../libs/vectors"], function( Box2D, InputsManager, Collider, Propulsor, Vectors )
{
	var Collectible = function(world, position) 
	{
		this.vitesse = 0.05;
		this.hp = 1;
		this.world = world;
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		this.bodydef.type = Box2D.Body.b2_staticBody;

		this.bodydef.position.Set(position[0], position[1]);
		this.fixdef.shape = new Box2D.CircleShape(0.5);

		this.body = world.CreateBody( this.bodydef );
		this.body.CreateFixture( this.fixdef );

		this.body.tag = "collectible";
		this.body.collectible = this;

	}

	Collectible.prototype.update = function(deltaTime, ship)
	{
		//destroy when HP fails
		if ( this.hp <= 0 )
		{
			this.world.DestroyBody( this.body );
			this.joint = undefined; //force undefined
		}

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
	};
	
	Collectible.prototype.render = function(context){
		if(this.hp >0)
			context.drawImage(window.Images.collectibles,0,0,466,1278,this.body.GetPosition().x*30-15,this.body.GetPosition().y*30-15,30-15,30);
	}

	Collectible.prototype.constructor = Collectible;

	return Collectible;
});