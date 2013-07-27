define( [ "game/Box2D" ], function( Box2D )
{
	var SCALE = 30;
	var Level = function( canvas, context )
	{
		this.world     = new Box2D.World(new Box2D.Vec2(0, 10), true);
		this.debugDraw = new Box2D.DebugDraw();
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();

		this.debugDraw.SetSprite( context );
		this.debugDraw.SetDrawScale(SCALE);
		this.debugDraw.SetFillAlpha(0.3);
		this.debugDraw.SetLineThickness(1.0);
		this.debugDraw.SetFlags( Box2D.DebugDraw.e_shapeBit | Box2D.DebugDraw.e_jointBit );
		
		this.world.SetDebugDraw( this.debugDraw );

		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		
		var curve = Box2D.CosineWave( canvas.width )
			, y = canvas.height * (3 / 4) / SCALE

			, ax = curve[0] / SCALE
			, ay = curve[1] / SCALE;

		for (var i = 2; i < curve.length; i += 2) 
		{
			var bx = curve[i] / SCALE
				, by = curve[i + 1] / SCALE
				, x = ax + (bx - ax) / 2
				, height = canvas.height / SCALE - Math.min(ay, by);

			this.bodydef.type = Box2D.Body.b2_staticBody;

			this.bodydef.position.Set(x, y);

			this.fixdef.shape = new Box2D.PolygonShape();
			this.fixdef.shape.SetAsArray([
					new Box2D.Vec2(ax - x, ay)
					, new Box2D.Vec2(bx - x, by)
					, new Box2D.Vec2(bx - x, by + height)
					, new Box2D.Vec2(ax - x, ay + height)
					], 4);

			this.world.CreateBody( this.bodydef ).CreateFixture( this.fixdef );

			ax = bx;
			ay = by;
		}

		this.bodydef.type = Box2D.Body.b2_dynamicBody;

		this.bodydef.position.Set(canvas.width / 3 / SCALE, 0);

		this.fixdef.shape = new Box2D.CircleShape(0.1);

		this.world.CreateBody( this.bodydef ).CreateFixture( this.fixdef );
	}
	
	Level.prototype.update = function( deltaTime )
	{
		this.world.Step(1 / 60, 10, 10);
		this.world.ClearForces();
	}
	
	Level.prototype.render = function( context )
	{
		this.world.DrawDebugData();
	}
	
	Level.prototype.constructor = Level;
	
	return Level;
});
