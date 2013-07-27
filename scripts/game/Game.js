define( [ "game/Ship", "game/Box2D", "puppet/Entities/Entities", "puppets", "puppet/puppetsConfig", "stats" ], function( Ship, Box2D, entitiesModels )
{
	var requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
    	|| window.mozRequestAnimationFrame
    	|| window.oRequestAnimationFrame
    	|| window.msRequestAnimationFrame
    	|| function(callback) {
    	    window.setTimeout(callback, 1000 / 60);
    	};
	
	var stats = new Stats();
	stats.setMode(0);
	
	//align right 
	stats.domElement.className = "fps";
	
	document.body.appendChild( stats.domElement );
	
	var Game = function( canvasID )
	{
		new Puppets( puppetsConfig );
		new Box2D();
		
		this.canvas  = document.getElementById( canvasID );
		this.context = this.canvas.getContext( "2d" );
		
		window.context = this.context;
		
		Game.instance = this;
		
		this.initPuppets();
		
		this.loop( this.gameLoop );
	}
	
	Game.prototype.initPuppets = function()
	{
		//add entity machants
		entitiesModels.init( this.canvas, this.context );
		Puppets.createEntity( entitiesModels[ "level" ], { level : {} } );
	}

	Game.prototype.loop = function( gameLoop ) 
	{
        var _cb = function() 
		{ 
			gameLoop(); 
			requestAnimationFrame( _cb ); 
		};
		
        _cb();
    };
	
	Game.prototype.gameLoop = function()
	{		
		stats.begin();
		
		//right now we are in window scope not game, because AnimFrame! 
		Game.instance.deltaTime = ( Date.now() - Game.instance.deltaTime ) * 0.001;
	
		Puppets.run();
		
		Game.instance.deltaTime = Date.now();
		
		stats.end();
	}
	
	Game.prototype.constructor = Game;
	
	new Game( "screen" );
	
	return Game.instance;
})