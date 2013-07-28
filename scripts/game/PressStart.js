define( ["game/InputsManager"],function(InputsManager)
{
    var logoWidth = 814/3;
    var logoHeight = 734/3;

	var PressStart = function( canvas, context )
	{
		this.angle = 0;
		this.direction = 1;
		this.speed = 0.001;
		this.limit = 0.05;
		this.font_size = 25;
		this.fontdirection = 0;

	}
	
	PressStart.prototype.update = function( deltaTime )
	{
		if(this.font_direction){
			this.font_size += 0.5
		} else {
			this.font_size -= 0.5
		}

		if(this.font_size > 35 || this.font_size < 20)
			this.font_direction = !this.font_direction;

		if(this.direction){
			this.angle += this.speed;
		} else {
			this.angle -= this.speed;
		}
		if(Math.abs(this.angle) > this.limit){
			this.direction = !this.direction;
		}

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
		context.save();
		context.translate(canvas.width/2,canvas.height/2);
		context.rotate(this.angle);
        context.drawImage(window.Images.bg,-canvas.width/2,-canvas.height/2-20,canvas.width,canvas.height);
        context.restore();
        context.drawImage(window.Images.logo, canvas.width/2-logoWidth/2, 100, logoWidth, logoHeight);
	    context.font = "Bold "+this.font_size+"px MenuFont";
	    var startText = "Press   Start";
	    var dim = context.measureText(startText);
	    context.fillText(startText, canvas.width / 2 - dim.width / 2, 900 / 2 - 25);
	}


	PressStart.prototype.constructor = PressStart;
	
	return PressStart;
});
