define( [ "game/Box2D", "game/Wall", "game/Ship", "game/Wind"], function( Box2D, Wall, Ship, Wind)
{
	var SCALE = 30;
	var Level = function( canvas, context )
	{
		this.walls = [];
		
		this.world     = new Box2D.World(new Box2D.Vec2(0, 10), true);
		this.debugDraw = new Box2D.DebugDraw();
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
		this.ship = new Ship(this.world, [canvas.width / 3 / SCALE, 12.5]);
		var ship_save = JSON.parse(localStorage.getItem("buildNRun_ship"));
		var AssosArray = ["upper-left", "upper-top", "upper-right", "middle-left", "middle-top", "middle-right", "lower-left", "lower-top", "lower-right"]
		for(var i =0, j = ship_save.length; i<j; i++){
			if(ship_save[i]!== "void"){
				this.ship.addModule(AssosArray[i], ship_save[i]);
			}
		}

		// this.wind = new Wind([5, 2],[canvas.width / 3 / SCALE, 5], this.world, {min : 10, max : 30}, 5, "left");

		this.debugDraw.SetSprite( context );
		this.debugDraw.SetDrawScale(SCALE);
		this.debugDraw.SetFillAlpha(0.3);
		this.debugDraw.SetLineThickness(1.0);
		this.debugDraw.SetFlags( Box2D.DebugDraw.e_shapeBit | Box2D.DebugDraw.e_jointBit );
		
		this.world.SetDebugDraw( this.debugDraw );

		this.fixdef.density = 1.0;
		this.fixdef.friction = 0.5;
		this.fixdef.restitution = 0.0;
		
		this.walls.push(new Wall(this, 20, "left"));
		this.walls.push(new Wall(this, 20, "right"));

		this.bodydef.type = Box2D.Body.b2_staticBody;
		this.bodydef.position.Set(16, 15);
		this.fixdef.shape = new Box2D.PolygonShape();
		this.fixdef.shape.SetAsBox(14,1);
		this.world.CreateBody(this.bodydef).CreateFixture(this.fixdef);
	}

		/*
		this.bodydef.type = Box2D.Body.b2_dynamicBody;

		this.bodydef.position.Set(canvas.width / 3 / SCALE, 0);

		this.fixdef.shape = new Box2D.CircleShape(0.1);

		body = this.world.CreateBody( this.bodydef );
		body.CreateFixture( this.fixdef );
		*/	
	Level.prototype.update = function( deltaTime )
	{
		// this.checkWalls();
		this.ship.update(deltaTime)
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
