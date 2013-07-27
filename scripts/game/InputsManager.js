define( [  ], function(  )
{
	var InputsManager = function()
	{
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

	return InputsManager;
});