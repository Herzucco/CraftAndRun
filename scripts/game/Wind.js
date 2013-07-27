define( [ "game/Box2D", "../../libs/vectors"], function( Box2D, Vectors)
{
	var Wind = function(size, position, world, force, direction, timeToChange)
	{
		this.size = size;
		this.position = position;
		this.world = world;
		this.force = force || {minX : {min : 100, max : 100}, minY : {min : 0, max : 0}};
		this.currentForce = this.setForce();
		this.timeToChange = timeToChange || 5;
		this.timer = 0;
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

		this.body.SetAwake(false);
		this.body.tag    = "wind";
		this.body.parent = this;
	}
	Wind.prototype.update = function(deltaTime)
	{
		if(this.timer/60 >= this.timeToChange)
			this.setForce();

		this.timer++;
	}
	Wind.prototype.blow = function(module)
	{
		module.body.ApplyForce(this.currentForce, module.body.GetPosition());
	}
	Wind.prototype.setForce = function()
	{
		var newForce =
		{
			x : Math.floor(Math.random() * (this.force.x.max - this.force.y.min + 1)) + this.force.x.min,
			y : Math.floor(Math.random() * (this.force.x.max - this.force.y.min + 1)) + this.force.y.min
		}
		return newForce
	}
	Wind.prototype.constructor = Wind;

	return Wind;
});