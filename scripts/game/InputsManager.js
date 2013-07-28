define( [  ], function(  )
{
	var InputsManager = function()
	{
		this.KEY_O = false;
		this.KEY_U = false;
		this.KEY_Y = false;
		this.KEY_A = false;
		
		this.KEY_L1 = false;
		this.KEY_R1 = false;
		this.KEY_L2 = false;
		this.KEY_R2 = false;
		
		this.AXIS_LS_X = 0.0;
		this.AXIS_LS_Y = 0.0;
		this.AXIS_RS_X = 0.0;
		this.AXIS_RS_Y = 0.0;
		this.AXIS_L2   = 0.0;
		this.AXIS_R2   = 0.0;
	
		var catchInput = function(e)
		{
			var code = e.keyCode;
			InputsManager.instance[code] = true;
		}
		var removeInput = function(e)
		{
			var code = e.keyCode;
			InputsManager.instance[code] = false;
		}
		
		window.addEventListener("keydown", catchInput);
		window.addEventListener("keyup", removeInput);
		
		InputsManager.instance = this;
	};
	
	InputsManager.prototype.getAxis = function( lsx, lsy, rsx, rsy, l2, r2 )
	{
		this.AXIS_LS_X = lsx; this.AXIS_LS_Y = lsy; this.AXIS_RS_X = rsx; this.AXIS_RS_Y = rsy;
		this.AXIS_L2 = l2, this.AXIS_R2 = r2;
	}
	
	InputsManager.prototype.update = function( deltaTime )
	{
		if ( window.OCW )
		{
			
			this.KEY_O = window.OCW.getKey( "o" ) == "true"; this.KEY_U = window.OCW.getKey( "u" ) == "true";
			this.KEY_Y = window.OCW.getKey( "y" ) == "true"; this.KEY_A = window.OCW.getKey( "a" ) == "true";
			
			this.KEY_L1 = window.OCW.getKey( "l1" ) == "true"; this.KEY_L2 = window.OCW.getKey( "l2" ) == "true";
			this.KEY_R1 = window.OCW.getKey( "r1" ) == "true"; this.KEY_R2 = window.OCW.getKey( "r2" ) == "true";
			
			this.AXIS_LS_X = parseFloat( window.OCW.getKey( "lsx" ) ); 
			this.AXIS_LS_Y = parseFloat( window.OCW.getKey( "lsy" ) );
			
			this.AXIS_RS_X = parseFloat( window.OCW.getKey( "rsx" ) );
			this.AXIS_RS_Y = parseFloat( window.OCW.getKey( "rsy" ) );
			
			this.AXIS_L2 = parseFloat( window.OCW.getKey( "al2" ) );
			this.AXIS_R2 = parseFloat( window.OCW.getKey( "ar2" ) );
			
		}
	}
	
	InputsManager.prototype.render = function( context )
	{
		context.fillText( "O:" + this.KEY_O, 125, 25 );
		context.fillText( "U:" + this.KEY_U, 170, 25 );
		context.fillText( "Y:" + this.KEY_Y, 225, 25 );
		context.fillText( "A:" + this.KEY_A, 300, 25 );
		
		context.fillText( "L1:" + this.KEY_L1, 125, 50 );
		context.fillText( "L2:" + this.KEY_L2, 170, 50 );
		context.fillText( "R1:" + this.KEY_R1, 225, 50 );
		context.fillText( "R2:" + this.KEY_R2, 300, 50 );
		
		context.fillText( "LS X:" + this.AXIS_LS_X, 125, 75 );
		context.fillText( "LS Y:" + this.AXIS_LS_Y, 170, 75 );
		context.fillText( "RS X:" + this.AXIS_RS_X, 225, 75 );
		context.fillText( "RS Y:" + this.AXIS_RS_Y, 300, 75 );
		context.fillText( "L2:" + this.AXIS_L2, 125, 100 );
		context.fillText( "R2:" + this.AXIS_R2, 170, 100 );
	}
	
	return InputsManager;
});