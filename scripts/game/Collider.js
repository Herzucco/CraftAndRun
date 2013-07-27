define( [ "game/Box2D", "game/Level"], function( Box2D, level)
{
	var SCALE = 30;
	var Collider = function(shape, size, position, world)
	{

		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		this.bodydef.type = Box2D.Body.b2_dynamicBody;

		this.bodydef.position.Set(position[0], position[1]);
		
		if(shape == "circle") {
			this.fixdef.shape = new Box2D.CircleShape(size);
		} else if(shape == "square") {
			this.fixdef.shape = new Box2D.PolygonShape();
			this.fixdef.shape.SetAsBox(size[0],size[1]);
		}
		this.body = world.CreateBody( this.bodydef ).CreateFixture( this.fixdef );
	}
	Collider.prototype.constructor = Collider;

	return Collider;
});