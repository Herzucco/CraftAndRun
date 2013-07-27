define( [ "game/Box2D", "game/Collider"], function( Box2D, Collider)
{
	var Propulsor = function(shape, size, position, world)
	{
		Collider.call(this, shape, size, position, world);

	}
	Propulsor.prototype.update = function(deltaTime)
	{
		
	}
	Propulsor.prototype = Object.create(Collider.prototype);
	Propulsor.prototype.constructor = Collider;

	return Propulsor;
});