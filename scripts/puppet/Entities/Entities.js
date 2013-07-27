define( [ "game/Level", "game/Collider" ], function( Level , Collider )
{
	var entitiesModels =
	{
		spaceship_part :{"components": [{"physic" : {"collider" : ""}}]},
		rect :{"components" : [{"renderShape" : {"shape" : "square"}}, "position2d", "size2d"]},
		level : { "components" : [ { "level" : { "level" : "" } } ] }
	}
	
	entitiesModels.init = function( canvas, context )
	{
		this.level.components[0].level.level = new Level( canvas, context );
		this.spaceship_part.components[0].physic.collider = new Collider( "square",[1,1],[10,0], this.level.components[0].level.level.world);
	}
	
	return entitiesModels;
	
});