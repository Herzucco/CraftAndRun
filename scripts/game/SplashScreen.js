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