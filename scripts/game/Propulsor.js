define( [ "game/Box2D", "game/Collider", "../../libs/vectors"], function( Box2D, Collider, Vectors)
{
	var Propulsor = function(shape, size, position, world, force)
	{
		Collider.call(this, shape, size, position, world);
		this.force = force || 100;
	}
	Propulsor.prototype = Object.create(Collider.prototype);
	Propulsor.prototype.update = function(deltaTime, world)
	{
		Collider.prototype.update.call( this, deltaTime, world );
	}
	Propulsor.prototype.constructor = Collider;

	return Propulsor;
});