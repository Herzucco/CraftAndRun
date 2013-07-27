define( [  ], function(  )
{
	var InputsManager = function()
	{

		window.addEventListener("keydown", catchInput);
		window.addEventListener("keyup", removeInput);
		InputsManager.instance = this;
	};

	return InputsManager;
});