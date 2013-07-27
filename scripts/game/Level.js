define( [ "game/Box2D", "game/Wall", "game/Ship"], function( Box2D, Wall, Ship)
{
	var SCALE = 30;
	var Level = function( canvas, context )
	{
		this.walls = [];
		
		this.world     = new Box2D.World(new Box2D.Vec2(0, 10), true);
		this.debugDraw = new Box2D.DebugDraw();
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.ship = new Ship(this.world, [canvas.width / 3 / SCALE, 0]);
		this.ship.addModule("middle-top", "propulsor");
		this.ship.addModule("middle-left", "propulsor");
		this.ship.addModule("upper-top", "propulsor");
		this.ship.addModule("lower-right", "propulsor");
		console.log(this.ship)

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
	
		var body;
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

			body = this.world.CreateBody( this.bodydef );
			body.CreateFixture( this.fixdef );
			
			ax = bx;
			ay = by;
			this.walls.push(new Wall(this, 20, "left"));
			this.walls.push(new Wall(this, 20, "right"));
		}

		/*
		this.bodydef.type = Box2D.Body.b2_dynamicBody;

		this.bodydef.position.Set(canvas.width / 3 / SCALE, 0);

		this.fixdef.shape = new Box2D.CircleShape(0.1);

		body = this.world.CreateBody( this.bodydef );
		body.CreateFixture( this.fixdef );
		*/
	}
	
	Level.prototype.update = function( deltaTime )
	{
		// this.checkWalls();
		this.world.Step(1 / 60, 10, 10);
		this.world.ClearForces();
	}
	
	Level.prototype.render = function( context, camPos )
	{
	/*
		for ( var body = this.world.GetBodyList(); body !== null; body = body.GetNext() )
		{
			var pos = body.GetPosition();
			console.log( pos );
			context.save();
			
			context.translate( pos.x - camPos.x, pos.y - camPos.y );
			context.rotate( body.GetAngle() );
			
			context.fillStyle   = "#00ff00";
			context.strokeStyle = "#000000"; 
			
			var shape = body.GetFixtureList().GetShape();
			if ( shape instanceof Box2D.PolygonShape )
			{
				context.fillRect( -body.sizes.w/2, -body.sizes.h/2, body.sizes.w, body.sizes.h );
				context.strokeRect( -body.sizes.w/2, -body.sizes.h/2, body.sizes.w, body.sizes.h );
			}
			
			context.fillStyle = "#ff0000";
			if ( shape instanceof Box2D.CircleShape )
			{
				context.beginPath();
				
				context.arc( 0, 0, body.sizes.r, 0, 2 * Math.PI );
				context.fill();
				
				context.stroke();
			}
			
			context.restore();
		}
		*/
		
		context.save();
		
		context.translate( -camPos.x, -camPos.y );
			this.world.DrawDebugData();
		
		context.restore();
	}
	
	Level.prototype.checkWalls = function() {
		var create = true;
		for(var i=0, j=this.walls.length; i < j; i++) {
			if(this.walls[i].y <= Ship.y) {
				create = false;
			}
		}
		if(create && false){
			this.walls.push(new Wall(this, Ship.y+20, "left"));
			this.walls.push(new Wall(this, Ship.y+20, "right"));
		}
	}


	Level.prototype.constructor = Level;
	
	return Level;
});
