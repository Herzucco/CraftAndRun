define( [ "Input", "Box2D" ], function( Input )
{
	//box2D shortcuts
	var b2Vec2             = Box2D.Common.Math.b2Vec2;
	var b2World            = Box2D.Dynamics.b2World;
	var b2FixtureDef       = Box2D.Dynamics.b2FixtureDef;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2BodyDef          = Box2D.Dynamics.b2BodyDef;
	var b2Body             = Box2D.Dynamics.b2Body;
	var b2PolygonShape     = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape      = Box2D.Collision.Shapes.b2CircleShape;
	var b2DebugDraw        = Box2D.Dynamics.b2DebugDraw;
	var b2ContactListener  = Box2D.Dynamics.b2ContactListener;
	
	var maxHp = 6, worldScale = 200, scoreDPS = 15,
	    wait = 10, counter; //in seconds 
		
	var input = new Input();
	
	var instance; 
	function Level( context, backImage, tutoImage )
	{
		this.isTuto;
		
		this.score;
		this.topScore;
		
		this.world;
		this.shapes;
		
		this.changeMenuIndex = -1;
		
		this.context = context;
		
		this.tutoImage = tutoImage;
		this.backImage = backImage;
		
		this.init();
		
		this.shapes = new Array();
		
		this.setupWorld();
		this.setupDebug( this.context );
	}
	
	Level.prototype.init = function()
	{
		instance = this;
		
		this.isContact = false;
		this.isOver    = false;
		this.isStarted = false;
		this.isTuto    = false;
		
		this.score    = 0;
		this.topScore = 0;
		
		counter    = 0;
	}
	
	Level.prototype.setupWorld = function()
	{
		var gravity = new b2Vec2( 0, 1 );
		this.world  = new b2World( gravity, true );
		
		//addContactListener
		var listener = new b2ContactListener;
		listener.BeginContact = this.damageBodies;
		
		this.world.SetContactListener( listener );
	}
	
	Level.prototype.setupDebug = function( context )
	{
		var debugDraw = new b2DebugDraw();
    
		debugDraw.SetSprite( context );
		debugDraw.SetDrawScale( worldScale );
   
		debugDraw.SetFillAlpha( 0.5 );
		debugDraw.SetLineThickness( 1.0 );
		debugDraw.SetFlags( b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit );
    
		this.world.SetDebugDraw( debugDraw );
	}
	
	Level.prototype.createBox = function( sizes, stats, isFixed, color, hp )
	{
		var fixDef         = new b2FixtureDef;
		fixDef.density     = stats.density;
		fixDef.friction    = stats.friction;
		fixDef.restitution = stats.restitution;

		var bodyDef  = new b2BodyDef;
		bodyDef.type = ( !isFixed ) ? b2Body.b2_dynamicBody : b2Body.b2_staticBody;

		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox( sizes.w / 2.0 / worldScale, sizes.h / 2.0 / worldScale );
		
		bodyDef.position.Set( sizes.x / worldScale, sizes.y / worldScale);
 
		var body = this.world.CreateBody( bodyDef );
		body.CreateFixture( fixDef );

		body.color = color;
		body.sizes = sizes;
		body.hp    = hp || maxHp;
		body.maxHp = body.hp;
		
		this.shapes.push( body );
	}
	
	Level.prototype.createBall = function( sizes, stats, isFixed, color, hp )
	{
		var fixDef         = new b2FixtureDef;
		fixDef.density     = stats.density;
		fixDef.friction    = stats.friction;
		fixDef.restitution = stats.restitution;

		var bodyDef  = new b2BodyDef;
		bodyDef.type = ( !isFixed ) ? b2Body.b2_dynamicBody : b2Body.b2_staticBody;

		fixDef.shape = new b2CircleShape( sizes.r / worldScale );
		
		bodyDef.position.Set( sizes.x / worldScale, sizes.y / worldScale );
    
		var body = this.world.CreateBody( bodyDef );
		body.CreateFixture( fixDef );

		body.color = color;
		body.sizes = sizes;
		body.hp    = hp || maxHp;
		body.maxHp = body.hp;
		
		this.shapes.push( body );
	}
	
	Level.prototype.createPlayer = function( sizes, stats, color, hp, tag, attack )
	{
		this.createBox( { x : sizes.x, y : 25, w : 50, h : 50 }, stats, true, color, hp );
		var bodyA = this.shapes[ this.shapes.length - 1 ];
		
		this.createBall( sizes, stats, false, color, hp );
		var bodyB = this.shapes[ this.shapes.length - 1 ];
		
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(bodyA, bodyB, bodyA.GetWorldCenter());
		
		//enable limits
		jointDef.enableLimit = true;
		jointDef.lowerAngle  = -45 * Math.PI / 180;
		jointDef.upperAngle  =  45 * Math.PI / 180;
		
		//set torque speed
		jointDef.enableMotor = true;
		jointDef.maxMotorTorque = 0.5 * Math.PI / 180;
		jointDef.motorSpeed = 40 * Math.PI / 180;
		
		this.world.CreateJoint( jointDef );
	
		var body = this.shapes[ this.shapes.length - 1 ];
		
		body.tag    = tag;
		body.attack = attack;
	}
	
	Level.prototype.createGround = function( width, height )
	{
		var sizes = { x : width/2, y : height - 15, w : width, h : 40 };
		var stats = { density : 1.0, friction : 0.5, restitution : 0.8 };
		this.createBox( sizes, stats, true, "8b3e2f" );
		
		var body = this.shapes[ this.shapes.length - 1 ];
		body.tag = "immune";
	}
	
	//apply a given force to the shape at index
	Level.prototype.applyForce = function( index, force )
	{
		index %= this.shapes.length;
		
		var shape = this.shapes[ index ];
		shape.ApplyForce( new b2Vec2( force.x, force.y ), shape.GetPosition() );
	}
	
	Level.prototype.damageBodies = function( contact )
	{
		var bodies = [ contact.GetFixtureA().GetBody(), contact.GetFixtureB().GetBody() ];	
		var playerIndex = ( bodies[0].tag === "player" ) ? 0 : -1;
		playerIndex     = ( bodies[1].tag === "player" ) ? 1 : playerIndex;
		
		if ( this.isOver )
			return;  //stop collision if game is over
		
		//if player didn't hit don't solve collision
		if ( playerIndex === -1 )
			if ( !this.isContact )
				return;
			else
			{
				//contact has been made enable inter body collisions
				for ( var i = 0; i < bodies.length; i++ )
				{
					var body = bodies[i];
					if ( typeof( body.hp ) !== "undefined" && body.tag !== "immune" )
					{
						body.hp = Math.max( 0, body.hp - 1 );
						instance.updateScore( scoreDPS );
					}
				}
				
				return;
			}
			
		this.isContact = true;
		
		//body got hit by player decrease hp
		var hitBody = bodies[ 1 - playerIndex ];
		if ( typeof( hitBody.hp ) !== "undefined" && hitBody.tag !== "immune" ) // must not be immune to collisions 
		{	
			var attack = bodies[ playerIndex ].attack;
			hitBody.hp = Math.max( 0, hitBody.hp - attack );
			instance.updateScore( attack * scoreDPS );
		}
	}
	
	Level.prototype.setToSleep = function( isSleep )
	{
		for ( var b = this.world.GetBodyList(); b !== null && b.tag !== "player"; b = b.GetNext())
			b.SetAwake( !isSleep );
	}

	Level.prototype.isAsleep = function()
	{
		var asleep = true;
		for ( var b = this.world.GetBodyList(); b && asleep; b = b.GetNext() )
			asleep = asleep && (!b.IsAwake() || b.GetType() == b2Body.b2_staticBody);
		return asleep;
	}
	
	Level.prototype.updateScore = function( points )
	{
		this.score += points;
	}
	
	Level.prototype.updateBack = function()
	{
		var mousePos = input.mousePos;
		var pos = { x : 0.01 * this.context.canvas.width, y : 0.01 * this.context.canvas.height };
		if ( mousePos.x > pos.x && mousePos.x < pos.x + this.backImage.width &&
			 mousePos.y > pos.y && mousePos.y < pos.y + this.backImage.height && input.isClicked )
		{
		
			this.changeMenuIndex = 1;
			input.isClicked = false; //reset input
		}			 
	}
	
	Level.prototype.renderBodies = function()
	{
		this.world.DrawDebugData();
		
		for ( var body = this.world.GetBodyList(); body !== null; body = body.GetNext() ) 
		{		
			if ( typeof( body.color ) !== "undefined" ) 
			{
				var pos = body.GetPosition(); // center position
				
				this.context.save();
				
				this.context.translate( pos.x * worldScale, pos.y * worldScale );
				this.context.rotate( body.GetAngle() );
		
				this.context.fillStyle   = body.color;
				this.context.strokeStyle = "000000";
				
				var shape = body.GetFixtureList().GetShape();
				if ( shape instanceof b2PolygonShape )
				{
					this.context.fillRect( -body.sizes.w/2, -body.sizes.h/2, body.sizes.w, body.sizes.h );
					
					if ( body.tag !== "player" && typeof( body.hp ) !== "undefined" )
					{
						this.context.globalAlpha = 1 - body.hp / body.maxHp;
						
						//draw HP Mask over
						this.context.fillStyle = "ff0000";
						this.context.fillRect( -body.sizes.w/2, -body.sizes.h/2, body.sizes.w, body.sizes.h );
						
						this.context.globalAlpha = 1;
					}
					
					this.context.strokeRect( -body.sizes.w/2, -body.sizes.h/2, body.sizes.w, body.sizes.h );
				}
				
				if ( shape instanceof b2CircleShape )
				{
					this.context.beginPath();
					
					this.context.arc( 0, 0, body.sizes.r, 0, 2 * Math.PI );
					this.context.fill();
					
					if ( body.tag !== "player" && typeof( body.hp ) !== "undefined" )
					{
						this.context.globalAlpha = 1 - body.hp / body.maxHp;
					
						//draw HP Mask over
						this.context.fillStyle = "ff0000";
						this.context.arc( 0, 0, body.sizes.r, 0, 2 * Math.PI );
						this.context.fill();
						
						this.context.globalAlpha = 1;
					}
					
					this.context.stroke();
				}
				
				this.context.restore();
			}
		}
	}
	
	Level.prototype.renderScore = function()
	{
		this.context.fillStyle   = "00ff00";
		this.context.strokeStyle = "ffffff";
		this.context.font = 40 + 'px Arial';
		
		this.context.lineWidth = 1;
		
		this.context.fillText( "Score : " + this.score, 0.6 * this.context.canvas.width, 0.1 * this.context.canvas.height );
		this.context.strokeText( "Score : " + this.score, 0.6 * this.context.canvas.width, 0.1 * this.context.canvas.height );
	}
	
	Level.prototype.renderTuto = function()
	{
		this.context.drawImage( this.tutoImage, 0.3 * this.context.canvas.width, 0.05 * this.context.canvas.height );
	}
	
	Level.prototype.renderBackButton = function()
	{
		this.context.drawImage( this.backImage, 0.01 * this.context.canvas.width, 0.01 * this.context.canvas.height );
	}
	
	Level.prototype.update = function( deltaTime )
	{
		this.world.Step( 1/60, 10, 10 );
		this.world.ClearForces();
		
		//change color to blue if pressed 	
		for ( var body = this.world.GetBodyList(); body !== null; body = body.GetNext() ) 
		{
			if ( !this.isStarted && typeof( body.color ) !== "undefined" && body.tag === "player" )
				if ( input.isClicked )
				{
					body.color = "00ff12";
				
					body.SetType( b2Body.b2_dynamicBody );
						
					var radius = body.sizes.r/2;
			//		this.applyForce( this.shapes.indexOf( body ), { x : 2 * radius/8, y : -2 * radius/20 } )
						
					this.isStarted = true;
						
					//destroy joint 
					var joint = this.world.GetJointList();
					if ( joint !== null )
					{
						var angle = body.GetAngle();
						var speed = -joint.GetMotorSpeed();
						body.ApplyForce( new b2Vec2( speed * Math.cos( angle ), speed * Math.sin( angle ) ), body.GetPosition() );
						this.world.DestroyJoint( joint );
					}
					
					//awake world
					this.setToSleep( false );
					
					input.isClicked = false; //reset click
				}
				else
					body.color = "00aaff";
					
			//if body has no more hp destroy it from the world
			if ( body.tag !== "player" && typeof( body.hp ) !== "undefined" && body.hp === 0 )
			{
				//augment score because body was destroyed
				var shape = body.GetFixtureList().GetShape();
				if ( shape instanceof b2PolygonShape )
					this.updateScore( 100 );
					
				if ( shape instanceof b2CircleShape )
					this.updateScore( 1000 );
							
				this.world.DestroyBody( body );
			}
		}
		
		//change joint speed if motor is  is at limit 
		for ( var joint = this.world.GetJointList(); joint !== null; joint = joint.GetNext() )
			if ( joint.GetJointAngle() <= joint.GetLowerLimit() || joint.GetJointAngle() >= joint.GetUpperLimit() )
				joint.SetMotorSpeed( -1 * joint.GetMotorSpeed() );
		
		//if time is up set world to sleep
		if ( this.isStarted && ( ( counter | 0 ) > wait || this.isAsleep() ) && !this.isOver )
		{
	//		this.setToSleep( true );
			this.isOver = true;
			console.log( "gameOver" );
		}
			
		//increase time
		if ( this.isStarted )
			counter += deltaTime;
			
		//update back
		this.updateBack();
	}
	
	Level.prototype.render = function()
	{
		this.renderBodies();
		this.renderScore();
		
		if ( this.isTuto )
			this.renderTuto();
			
		this.renderBackButton();
	}
	
	Level.prototype.constructor = Level;
	
	return Level;
});