define( [ "game/Box2D", "game/Level", "game/InputsManager"], function( Box2D, level, InputsManager)
{
	var SCALE = 30;
	var Collider = function(shape, size, position, world, force)
	{
		this.hp = 10;
	
		this.force = force || 0;
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
		this.body = world.CreateBody( this.bodydef );
		this.body.CreateFixture( this.fixdef );
		
		this.joint;
		
		this.body.tag    = "ship";
		this.body.module = this;
	}
	Collider.prototype.update = function(deltaTime, world)
	{
		//destroy Joint when HP fails
		if ( this.hp <= 0 && typeof( this.joint ) !== "undefined" )
		{
			world.DestroyJoint( this.joint );
			this.joint = undefined; //force undefined
		}
	};
	
	Collider.prototype.constructor = Collider;

	return Collider;
});