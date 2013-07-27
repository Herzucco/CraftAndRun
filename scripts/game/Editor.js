define( function()
{
	var SCALE = 30;
	var Editor = function( canvas, context )
	{
		this.tiles = [];
		for(var i = 0; i < 9; i++){
			this.tiles.push("void");
		}
		this.sourceTiles = [];
		this.cursor = {position : 5, type : "void"};
	}
	
	Editor.prototype.update = function( deltaTime )
	{

	}
	
	Editor.prototype.render = function( context, canvas)
	{
		context.fillStyle = "#FFFFFF";
		context.fillRect(0,0,canvas.width, canvas.height);
	}


	Editor.prototype.constructor = Editor;
	
	return Editor;
});
