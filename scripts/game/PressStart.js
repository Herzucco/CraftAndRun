define( ["game/InputsManager"],function(InputsManager)
{
	var background = new Image ();
    background.src = 'assets/menu/background.jpg';
    var logo = new Image ();
    logo.src = 'assets/menu/logo.png'
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
		context.fillStyle = "#FFAAFF";
		context.fillRect(0,0,canvas.width, canvas.height);
        context.drawImage(background,0,0,canvas.width,canvas.height);
        context.drawImage(logo, canvas.width/2-logoWidth/2, 100, logoWidth, logoHeight);
	}


	PressStart.prototype.constructor = PressStart;
	
	return PressStart;
});
