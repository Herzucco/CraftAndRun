define( ["game/InputsManager"],function(InputsManager)
{
	var imagesLoaded = 0;
	var Splash_screen = function( canvas, context )
	{
		this.context = context;
		window.Images = {};

		window.Images.bg = new Image();
		window.Images.bg.src = "assets/menu/background.jpg";
		window.Images.bg.onload = function(){imagesLoaded++};

		window.Images.logo = new Image();
		window.Images.logo.src = "assets/menu/logo.png";
		window.Images.logo.onload = function(){imagesLoaded++};

		window.Images.editor_bg = new Image();
		window.Images.editor_bg.src = "assets/menu/background_custom.jpg";
		window.Images.editor_bg.onload = function(){imagesLoaded++};

		window.Images.crate = new Image();
		window.Images.crate.src = "assets/props/crate.jpg";
		window.Images.crate.onload = function(){imagesLoaded++};

		window.Images.void = new Image();
		window.Images.void.src = "assets/props/void.png";
		window.Images.void.onload = function(){imagesLoaded++};

		window.Images.game_bg = new Image();
		window.Images.game_bg.src = "assets/decor/backgrounnuunddd.jpg";
		window.Images.game_bg.onload = function(){imagesLoaded++};

		window.Images.right_wall = new Image();
		window.Images.right_wall.src = "assets/decor/mur_droit.png";
		window.Images.right_wall.onload = function(){imagesLoaded++};

		window.Images.left_wall = new Image();
		window.Images.left_wall.src = "assets/decor/mur.png";
		window.Images.left_wall.onload = function(){imagesLoaded++};

		window.Images.ground = new Image();
		window.Images.ground.src = "assets/decor/sol.png";
		window.Images.ground.onload = function(){imagesLoaded++};

		window.Images.carot = new Image();
		window.Images.carot.src = "assets/props/carrote.png";
		window.Images.carot.onload = function(){imagesLoaded++};
	}

	Splash_screen.prototype.waitLoaded = function(){
		if(imagesLoaded === Object.keys(window.Images).length){
			Game.closeSplashScreen();
		} else {
		}
	}

	Splash_screen.prototype.constructor = Splash_screen;
	
	return Splash_screen;
});