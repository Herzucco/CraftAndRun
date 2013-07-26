var RenderPulse = 
{
	components : ["renderPulse", "position2d", "size2d"],
	method : function(renderPulse, position2d, size2d)
	{
		var color         = renderPulse.color;
		var buffer        = renderPulse.buffer;

		var radius = size2d.radius * buffer.duration;

		renderPulse.compteur++;

		if (renderPulse.compteur/60 >= buffer.duration)
		{
			Puppets.Entities.removeEntity(renderPulse.entity);
		}
		
		context.strokeStyle = renderPulse.color;
		context.lineWidth = 3; 
		context.beginPath();
		context.arc(position2d.x,position2d.y,(renderPulse.compteur/buffer.duration)*size2d.radius, 0, 2*Math.PI);
		context.stroke();
	}
}