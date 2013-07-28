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
			this.KEY_O = window.OCW.KEY_O; this.KEY_U = window.OCW.KEY_U;
			this.KEY_Y = window.OCW.KEY_Y; this.KEY_A = window.OCW.KEY_A;
			
			this.KEY_L1 = window.OCW.KEY_L1; this.KEY_L2 = window.OCW.KEY_L2;
			this.KEY_R1 = window.OCW.KEY_R1; this.KEY_R2 = window.OCW.KEY_R2;
			
			this.AXIS_LS_X = window.OCW.AXIS_LS_X; this.AXIS_LS_Y = window.OCW.AXIS_LS_Y;
			this.AXIS_RS_X = window.OCW.AXIS_RS_X; this.AXIS_RS_Y = window.OCW.AXIS_RS_Y;
			this.AXIS_L2   = window.OCW.AXIS_L2;   this.AXIS_R2   = window.OCW.AXIS_R2;
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