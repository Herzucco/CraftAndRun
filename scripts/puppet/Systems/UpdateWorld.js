var UpdateWorld = 
{
	components : [ "level" ],
	method     : function( level )
	{
		level.level.world.Step(1 / 60, 10, 10);
		level.level.world.ClearForces();
	}
}
