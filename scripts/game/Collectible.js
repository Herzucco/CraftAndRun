define( [ "game/Box2D", "game/InputsManager", "game/Collider", "game/Propulsor", "../../libs/vectors"], function( Box2D, InputsManager, Collider, Propulsor, Vectors )
{
	var Collectible = function(world, position) 
	{
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

	Collectible.prototype.update = function(deltaTime, world)
	{
		//destroy when HP fails
		if ( this.hp <= 0 )
		{
			this.world.DestroyBody( this.body );
			this.joint = undefined; //force undefined
		}
	};
	
	Collectible.prototype.constructor = Collectible;

	return Collectible;
});