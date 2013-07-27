define( ["game/InputsManager"],function(InputsManager)
{
	
	var SCALE = 30;
	var Editor = function( canvas, context )
	{
		this.locked = false;
		this.f = 0;
		this.delay = 0.3;
		this.tiles = [];
		this.allTiles = ["void", "collider", "propulsor"]
		this.tileWidth = 80;
		this.tileHeight = 80;
		if(!localStorage.getItem("buildNRun_ship")){
			for(var i = 0; i < 9; i++){
				this.tiles.push("void");
			}
		} else {
			this.tiles = JSON.parse(localStorage.getItem("buildNRun_ship"));
		}
		this.cursor = {position : 4, type : 0};
	}
	
	Editor.prototype.update = function( deltaTime )
	{
		this.f+= deltaTime;
		if(this.f >= this.delay)
		{
			this.f = 0;
			this.locked = false;
		}
		if(!this.locked){

			if(InputsManager.instance[37] && this.cursor.position%3 !== 0){
				this.cursor.position--;
				this.locked = true;
			}
			if(InputsManager.instance[39] && this.cursor.position%3 !== 2){
				this.cursor.position++;
				this.locked = true;
			}
			if(InputsManager.instance[40] && this.cursor.position/3>>0 !== 2){
				this.cursor.position+=3;
				this.locked = true;
			}
			if(InputsManager.instance[38] && this.cursor.position/3>>0 !==0){
				this.cursor.position-=3;
				this.locked = true;
			}
			if(InputsManager.instance[65] && this.cursor.type>0){
				this.cursor.type--;
				this.locked = true;
			}
			if(InputsManager.instance[69] && this.cursor.type < this.allTiles.length-1){
				this.cursor.type++;
				this.locked = true;
			}
		}
		if(InputsManager.instance[90]){
			this.tiles[this.cursor.position] = this.allTiles[this.cursor.type];
		}
		if(InputsManager.instance[13]){
			var empty = true;
			var wrong = false;
			for(var i = 0, j = this.tiles.length; i<j; i++){
				if(this.tiles[i] === "propulsor"){
					empty = false;
				}
				if(this.tiles[i]!= "void" && (this.tiles[i-1]!= undefined && this.tiles[i-1] ==="void")
										  && (this.tiles[i+1]!= undefined && this.tiles[i+1] ==="void")
										  && (this.tiles[i-3]!= undefined && this.tiles[i-3] ==="void")
										  && (this.tiles[i+3]!= undefined && this.tiles[i+3] ==="void")){
					wrong = true;
				}
			}
			InputsManager.instance[13] = false;
			if(empty){alert("veuillez mettre un moteur");}
			else if(wrong){alert("veuillez connecter vos pièces");}
			else{
				var ship_JSON = [];
				for(var i =0, j = this.tiles.length; i < j; i++){
					ship_JSON[i] = this.tiles[i];
				}
				console.log(ship_JSON);
				console.log(JSON.stringify(ship_JSON));
				console.log(JSON.parse(JSON.stringify(ship_JSON)));
				localStorage.setItem("buildNRun_ship", JSON.stringify(ship_JSON))
				window.setTimeout(function(){Game.state = "game";},1000)
			}


		}

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
			} else if(this.tiles[i] === "propulsor"){
				context.fillStyle = "#999966";
				context.fillRect(300+(i%3)*this.tileWidth, 100+(i/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight);
			} else if(this.tiles[i] === "collider"){
				context.fillStyle = "#99FF66";
				context.fillRect(300+(i%3)*this.tileWidth, 100+(i/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight);
			}
		}
		context.strokeStyle = "#FF0000";
		context.lineWidth = 5;
		context.strokeRect(300+(this.cursor.position%3)*this.tileWidth, 100+(this.cursor.position/3>>0)*this.tileHeight, this.tileWidth, this.tileHeight)
		context.lineWidth = 3;
		if(this.allTiles[this.cursor.type] === "void"){
			context.strokeStyle = "#000000";
			context.strokeRect(380, 10, this.tileWidth, this.tileHeight);
		} else if(this.allTiles[this.cursor.type] === "propulsor"){
			context.fillStyle = "#999966";
			context.fillRect(380, 10, this.tileWidth, this.tileHeight);
		} else if(this.allTiles[this.cursor.type] === "collider"){
			context.fillStyle = "#99FF66";
			context.fillRect(380, 10, this.tileWidth, this.tileHeight);
		}		
	}


	Editor.prototype.constructor = Editor;
	
	return Editor;
});
