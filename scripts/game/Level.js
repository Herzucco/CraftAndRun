define( [ "game/Box2D", "game/Wall", "game/Ship", "game/Wind", "game/Collectible", "game/Obstacle", "game/Collider"], function( Box2D, Wall, Ship, Wind, Collectible, Obstacle, Collider)
{
	var SCALE = 30;
	var Level = function( canvas, context )
	{
		this.start = false;
		this.canvas = canvas;
		this.walls = [];
		this.collectibles = [];
		this.obstacles = [];
		this.collectibles_timer = Math.random()*30;
		this.obstacles_timer = 10+Math.random()*20;
		this.winds_timer = 2+(Math.random()*1);
		this.winds = [];
		this.world     = new Box2D.World(new Box2D.Vec2(0, 10), true);
		this.debugDraw = new Box2D.DebugDraw();
		this.fixdef    = new Box2D.FixtureDef();	
		this.bodydef   = new Box2D.BodyDef();
		this.ship = new Ship(this.world, [canvas.width / 2 / SCALE, 14]);
		if(!localStorage.getItem("buildNRun_ship")){
			this.ship_save = window.myShip;
		} else{
			var ship_save = JSON.parse(localStorage.getItem("buildNRun_ship"));
		}
		var AssosArray = ["upper-left", "upper-top", "upper-right", "middle-left", "middle-top", "middle-right", "lower-left", "lower-top", "lower-right"]
		for(var i =0, j = ship_save.length; i<j; i++){
			if(ship_save[i]!== "void"){
				this.ship.addModule(AssosArray[i], ship_save[i]);
			}
		}

		//this.winds.push(new Wind([15, 2],[16, 10], this.world, {x : {min : -5, max : -10}, y : {min : 0, max : 0}}, 5));

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
		this.bottom = this.world.CreateBody(this.bodydef).CreateFixture(this.fixdef);
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

		if(!this.start)
		{
			for(var key in this.ship.modulesSlots) 
			{
				if(this.ship.modulesSlots[key] instanceof Collider)
				{
					var module = this.ship.modulesSlots[key];
					if(module.body.GetPosition().y <= 12)
						this.start = true;
					break;
				}
			}
		}
		else
		{
			this.checkTimers(deltaTime)
			this.moveBackground(deltaTime);
			if(!!this.bottom){
			this.bottom.GetBody().SetPosition({"x":this.bottom.GetBody().GetPosition().x,"y":this.bottom.GetBody().GetPosition().y+0.01});
			if(this.bottom.GetBody().GetPosition().y > 30){
				this.world.DestroyBody(this.bottom);
				this.bottom = undefined;
				}
			}
		}
		this.ship.update(deltaTime);
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
		var nbr = 1+(Math.random()*5)>>0;
		var x = (10+Math.random()*18)>>0;
		this.collectibles_timer += Math.random()*30;
		for(var i = 0; i < nbr; i++){
			this.collectibles.push(new Collectible(this.world, [x, -5+2*i]));
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
	Level.prototype.checkTimers = function(deltaTime)
	{
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
	}
	Level.prototype.moveBackground = function(deltaTime)
	{
		for(var i = 0, j = this.collectibles.length; i<j; i++){
				if(!!this.collectibles[i]){
					this.collectibles[i].update(deltaTime, this.ship);
					if(this.collectibles[i].body.GetPosition().y > 30)
					{
						this.collectibles.splice(i,1);
						i--;
					}
				}
			}
		for(var i = 0, j = this.obstacles.length; i<j; i++){
			if(!!this.obstacles[i]){	
				this.obstacles[i].update(deltaTime, this.ship);
				if(this.obstacles[i].body.GetPosition().y > 30)
				{
					this.obstacles.splice(i,1);
					i--;
				}
			}
		}
		for(var i = 0, j = this.winds.length; i<j; i++){
			if(!!this.winds[i]){	
				this.winds[i].update(deltaTime, this.world, this.ship);
				if(this.winds[i].body.GetPosition().y > 30)
				{
					this.winds.splice(i,1);
					i--;
				}
			}
		}
	}

	Level.prototype.constructor = Level;
	
	return Level;
});
