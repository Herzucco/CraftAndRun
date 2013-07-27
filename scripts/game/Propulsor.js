define( [ "game/Box2D", "game/Collider", "game/InputsManager", "../../libs/vectors"], function( Box2D, Collider, InputsManager, Vectors)
{
	var Propulsor = function(shape, size, position, world, force)
	{
		Collider.call(this, shape, size, position, world);
		this.force = force || 100;
	}
	Propulsor.prototype = Object.create(Collider.prototype);
	Propulsor.prototype.update = function(deltaTime)
	{
		if(InputsManager.instance["32"] == true)
		{
			var direction = this.body.GetLocalVector(new Box2D.Vec2(0,-1));
			direction.x *= -1;
			var force = Vectors.mult(direction, this.force);
			
			this.body.ApplyForce(force, this.body.GetPosition());
		}
	}
	Propulsor.prototype.constructor = Collider;

	return Propulsor;
});