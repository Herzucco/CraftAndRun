define( [ "game/Level" ], function( Level )
{
	var entitiesModels =
	{
		rect :{"components" : [{"renderShape" : {"shape" : "square"}}, "position2d", "size2d"]},
		level : { "components" : [ { "level" : { "level" : "" } } ] }
	}
	
	entitiesModels.init = function( canvas, context )
	{
		this.level.components[0].level.level = new Level( canvas, context );
	}
	
	return entitiesModels;
	
});