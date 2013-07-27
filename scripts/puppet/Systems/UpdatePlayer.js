var UpdatePlayer = 
{
	components : [ "physic" ],
	method     : function( physic )
	{
		physic.collider.world.Step(1 / 60, 10, 10);
		physic.collider.world.ClearForces();
	}
}
