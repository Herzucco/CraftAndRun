define( [ "game/Box2D", "game/Collider"], function( Box2D, Collider)
{
	var Obstacle = function(world, position, size, direction) 
	{
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
	Obstacle.prototype.constructor = Obstacle;

	return Obstacle;
});