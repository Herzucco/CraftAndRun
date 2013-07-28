define( [ "game/Box2D", "game/Wall", "game/Ship", "game/Wind", "game/Collectible", "game/Obstacle"], function( Box2D, Wall, Ship, Wind, Collectible, Obstacle)
{
	var SCALE = 30;
	var Level = function( canvas, context )
	{
		this.canvas = canvas;
		this.walls = [];
		this.collecticles = [];
		this.obstacles = [];
		this.collectibles_timer = Math.random()*30;
		this.obstacles_timer = 0+Math.random()*20;
		this.winds_timer = 20+(Math.random()*40);
		this.winds = [];
		this.world     = new Box2D.World(new Box2D.Vec2(0, 10), true);
		this.debugDraw = new Box2D.DebugDraw();
		this.fixdef    = new Box2D.FixtureDef();
		this.bodydef   = new Box2D.BodyDef();
<<<<<<< Updated upstream
		this.ship = new Ship(this.world, [canvas.width / 3 / SCALE, 14]);
		var ship_save = JSON.parse(localStorage.getItem("buildNRun_ship"));
		var AssosArray = ["upper-left", "upper-top", "upper-right", "middle-left", "middle-top", "middle-right", "lower-left", "lower-top", "lower-right"]
		for(var i =0, j = ship_save.length; i<j; i++){
			if(ship_save[i]!== "void"){
				this.ship.addModule(AssosArray[i], ship_save[i]);
=======
		this.ship = new Ship(this.world, [canvas.width / 2 / SCALE, 14]);
		if(!localStorage.getItem("buildNRun_ship")){
			this.ship.addModule("upper-top", "collider");
			this.ship.addModule("middle-top", "collider");
			this.ship.addModule("middle-left", "collider");
			this.ship.addModule("middle-right", "collider");
			this.ship.addModule("bottom-left", "propulsor");
			this.ship.addModule("bottom-right", "propulsor");
		} else{

			var ship_save = JSON.parse(localStorage.getItem("buildNRun_ship"));
			var AssosArray = ["upper-left", "upper-top", "upper-right", "middle-left", "middle-top", "middle-right", "lower-left", "lower-top", "lower-right"]
			for(var i =0, j = ship_save.length; i<j; i++){
				if(ship_save[i]!== "void"){
					this.ship.addModule(AssosArray[i], ship_save[i]);
				}
>>>>>>> Stashed changes
			}
		}

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
		this.bodydef.position.Set(16, 18);
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
		if(this.collectibles_timer > 0){
			this.collectibles_timer -= deltaTime;
			if(this.collectibles_timer <= 1){
				this.addCollectibles();
			}
		}
		if(this.winds_timer > 0){
			this.winds_timer -= deltaTime;
			if(this.winds_timer <= 1){
				this.addWinds();
			}
		}
		if(this.obstacles_timer > 0){
			this.obstacles_timer -= deltaTime;
			if(this.obstacles_timer <= 1){
				this.addObstacles();
			}
		}
		for(i in this.collectibles){
			collecticles[i].update(deltaTime);
		}
		this.ship.update(deltaTime);
		for(var i = 0; i < this.winds.length; i++)
			this.winds[i].update(deltaTime);
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

	Level.prototype.addCollectibles = function() {
		var nbr = Math.random()*5>>0;
		var x = Math.random()*20;
		this.collectibles_timer += Math.random()*500;
		
		for(var i = 0; i < nbr; i++){
			this.collecticles.push(new Collectible(this.world, [x, -5+2*i]));
		}
	}
	Level.prototype.addWinds = function() {
		var size = [20,1+(Math.random()*2)>>0];
		var change = (2+Math.random()*6)>>0;
		var direction = Math.random()>0.5? "left" : "right";
		this.winds_timer += 20+(Math.random()*40);
		this.winds.push(new Wind(size,[12,-5], this.world, {x : {min : -5, max : -10}, y : {min : 0, max : 0}}, direction, change));
	}
	Level.prototype.addObstacles = function() {
		var size = [4+Math.random()*3>>0,1.5];
		var direction = Math.random()>0.5? "left" : "right";
		var position = direction === "right"? [30-size[0], -5] : [7,-5]
		this.obstacles_timer += 20+(Math.random()*40);
		this.obstacles.push(new Obstacle(this.world, position, size, direction));
	}


	Level.prototype.constructor = Level;
	
	return Level;
});
