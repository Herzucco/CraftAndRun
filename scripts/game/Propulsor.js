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

	Propulsor.prototype.render = function(context){
		var position = this.body.GetPosition()
		context.save();
		context.translate(position.x*30,position.y*30);
		context.rotate(this.body.GetAngle());
		context.drawImage(window.Images.carot,0,0,729,1248, -15, -15, 30,30);
		context.restore();
	}

	Propulsor.prototype.constructor = Collider;

	return Propulsor;
});