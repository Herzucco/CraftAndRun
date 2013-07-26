var RenderStroke = 
{
	components : ["renderStroke", "position2d", "size2d"],
	method : function(renderShape, position2d, size2d)
	{
		var shape = renderShape.shape;
		var color = renderShape.color;
		var weight = renderShape.weight;
		color = get_random_color();
		context.lineWidth = weight;
		context.strokeStyle = color;

		switch (shape)
		{
			case "square":
				context.strokeRect(position2d.x, position2d.y, size2d.width, size2d.height);
			break;

			case "circle":
				context.beginPath();	
				context.arc(position2d.x,position2d.y,size2d.radius, 0, 2*Math.PI);
				context.stroke();
			break;	
		}
	}
}
