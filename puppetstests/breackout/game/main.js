var game = function()
{
	var init = function()
	{
		new Puppets(puppetsConfig);// instanciate our Puppets context, with the order list of our systems
		Puppets.createEntity(entitiesModels["entityInput"], {})
		Puppets.createEntity(entitiesModels["player"],{ renderShape : {"color" : "blue"}, size2d : {"width" : 100,"height" : 50}, position2d : {"x" : 400,"y" : 300}, velocity2d : {limit : 10}});
		Puppets.createEntity(entitiesModels["brick"], { renderShape : {"color" : "black"}, size2d : {"width" : 800,"height" : 600}}, "background");// add a black background to render to the "background" collection
		contextInitialization();
	    update(context);
	}

	var contextInitialization = function()
	{
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		canvas.height = "600";
		canvas.width = "800";
	}

	var update = function()
	{
	    Puppets.run();
	    requestAnimFrame(update);
	}
	var catchInput = function(e)
	{
		var code = e.keyCode;
		Puppets.getComponents(inputsListener)[0].inputListener.keys[code] = true;
	}
	var removeInput = function(e)
	{
		var code = e.keyCode;
		Puppets.getComponents(inputsListener)[0].inputListener.keys[code] = false;
	}
	window.addEventListener("keydown", catchInput);
	window.addEventListener("keyup", removeInput);

	init();

	var inputsListener = Puppets.find("inputListener", true)[0];
}();
