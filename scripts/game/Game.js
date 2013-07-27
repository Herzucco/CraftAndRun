define( [ "game/Box2D", "game/Level", "game/InputsManager", "game/Camera", "stats" ], function( Box2D, Level, InputsManager, Camera )
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
		new Box2D();
		new InputsManager();
		
		this.camera = new Camera({x : 0, y : 0}, {x : 0, y : 0}, 1);
		
		this.canvas  = document.getElementById( canvasID );
		this.context = this.canvas.getContext( "2d" );
		
		this.level = new Level( this.canvas, this.context );

		Game.instance = this;

		this.loop( this.gameLoop );
	}
	
	Game.prototype.update = function( deltaTime )
	{
		this.camera.update( deltaTime, this.level.world );
		this.level.update( deltaTime );
	}
	
	Game.prototype.render = function( context )
	{
		context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
		
		this.level.render( context, this.camera.position );
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
	
		Game.instance.update( Game.instance.deltaTime );
		Game.instance.render( Game.instance.context );
	
		Game.instance.deltaTime = Date.now();
		
		stats.end();
	}
	
	Game.prototype.constructor = Game;
	
	new Game( "screen" );
	
	return Game.instance;
})