define( [ "game/Box2D"], function( Box2D )
{
	var SCALE = 30;
	var Wall = function(Level, y, side) 
	{
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		this.bodydef.type = Box2D.Body.b2_staticBody;

		var x = side === "right"? 31 : 1;
		this.bodydef.position.Set(x, y);
		
		this.fixdef.shape = new Box2D.PolygonShape();
		this.fixdef.shape.SetAsBox(2,20);
		
		this.body = Level.world.CreateBody( this.bodydef ).CreateFixture( this.fixdef );
	}
	Wall.prototype.constructor = Wall;

	return Wall;
});