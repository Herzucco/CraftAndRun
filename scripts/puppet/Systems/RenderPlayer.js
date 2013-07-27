var RenderWorld =
{
	components : [ "level" ],
	method     : function( level )
	{
		level.level.world.DrawDebugData();
	}
}