define( ["game/InputsManager"],function(InputsManager)
{
    var logoWidth = 814/3;
    var logoHeight = 734/3;
	var PressStart = function( canvas, context )
	{

	}
	
	PressStart.prototype.update = function( deltaTime )
	{
		if(InputsManager.instance[13] == true)
		{
			InputsManager.instance[13] = false;
			Game.initEditor();
			Game.closePressStart();
		}
	}
	
	PressStart.prototype.render = function( context, canvas)
	{
		context.fillStyle = "#000000";
		context.fillRect(0,0,canvas.width, canvas.height);
        context.drawImage(window.Images.bg,0,0,canvas.width,canvas.height);
        context.drawImage(window.Images.logo, canvas.width/2-logoWidth/2, 100, logoWidth, logoHeight);
	    context.font = "Bold 47px MenuFont";
	    var startText = "Press   Start";
	    var dim = context.measureText(startText);
	    context.fillText(startText, canvas.width / 2 - dim.width / 2, 900 / 2 - 25);
	}


	PressStart.prototype.constructor = PressStart;
	
	return PressStart;
});
