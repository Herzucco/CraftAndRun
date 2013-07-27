define( [ "game/Box2D", "../../libs/vectors"], function( Box2D, Vectors)
{
	var Wind = function(size, position, world, force, timeToChange, direction)
	{
		this.size = size;
		this.position = position;
		this.world = world;
		this.force = force || 100;
		this.timeToChange = timeToChange || 5;
		this.direction = direction;

		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.fixdef.density = 0;
		this.fixdef.friction = 0;
		this.fixdef.restitution = 0.0;
		this.bodydef.type = Box2D.Body.b2_staticBody;

		this.bodydef.position.Set(position[0], position[1]);
		
		this.fixdef.shape = new Box2D.PolygonShape();
		this.fixdef.shape.SetAsBox(size[0],size[1]);
		this.body = world.CreateBody( this.bodydef );
		this.body.CreateFixture( this.fixdef );
		console.log(this.body)
		this.body.SetAwake(false);
		this.body.tag    = "wind";
	}
	Wind.prototype.update = function(deltaTime)
	{
		
	}
	Wind.prototype.constructor = Wind;

	return Wind;
});