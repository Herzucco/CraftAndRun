define( function()
{
	var SCALE = 30;
	var Editor = function( canvas, context )
	{
		this.tiles = [];
		this.tileWidth = 80;
		this.tileHeight = 80;
		for(var i = 0; i < 9; i++){
			this.tiles.push("void");
		}
		this.cursor = {position : 4, type : "void"};
	}
	
	Editor.prototype.update = function( deltaTime )
	{

	}
	
	Editor.prototype.render = function( context, canvas)
	{
		context.lineWidth = 2;
		context.fillStyle = "#FFFFFF";
		context.fillRect(0,0,canvas.width, canvas.height);
		for(var i = 0, j = this.tiles.length; i < j; i++){
			if(this.tiles[i] === "void"){
				context.strokeStyle = "#000000";
				context.strokeRect(300+(i%3)*this.tileWidth, 100+(i/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight);
			} else if(this.tiles[i] === "motor"){
				context.fillStyle = "#999966";
				context.filRect(300+(i%3)*this.tileWidth, 100+(i/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight);
			}
		}
		context.strokeStyle = "#FF0000";
		context.lineWidth = 5;
		context.strokeRect(300+(this.cursor.position%3)*this.tileWidth, 100+(this.cursor.position/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight)
	}


	Editor.prototype.constructor = Editor;
	
	return Editor;
});
