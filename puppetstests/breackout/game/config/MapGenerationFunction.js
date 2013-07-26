// génération des zones !! 
var MapGeneration = 
{
	components : ["position2d", "size2d", "childs", "positionId"],
	method : function()
	{	
		var idEntities = Puppets.find("positionId",true);
		var arrayEntities;
		arrayEntities = Puppets.Entities.getComponents(idEntities);
		var init = function()
		{
			for (_number in arrayEntities)
			{
				_entity = arrayEntities[_number];
				createChilds(_entity,_number);	
			}
		};
		var createChilds = function(parent,idParent)
		{
			var _parent = parent;
			console.log(_parent);
			var _positionArea;
			var _size = {w : 90 , h : 90};
			var _color = ["#00FF00","#00BB00","#009900","#006600"]
			var _operateur = { x: 100, y: 100}; 
			var _x = 100;
			
			// génération des entities childs avec leurs parrents 
			for (var _number = 0 ;_number < _parent.childs.number; _number++)
			{
				switch (_parent.positionId.corner)
				{
					case "top-left":
						_positionArea = { x: (_parent.size2d.width-_size.w)-_operateur.x, y:(_parent.size2d.height-_size.h)-_operateur.y };
						_operateur.x +=100 ;
						_operateur.y +=100 ;
					break;
					case "top-right":
						_positionArea = { x: (_parent.position2d.x), y:(_parent.size2d.height-_size.h)-_operateur.y };
						_operateur.y +=100 ;
					break;
					case "bottom-left":
						_positionArea = { x: (_parent.size2d.width-_size.w)-_operateur.x, y:(_parent.position2d.y) };
						_operateur.x +=100 ;
						_operateur.y -=100 ;
					break;
					case "bottom-right":
						_positionArea = { x: (_parent.position2d.x), y:(_parent.position2d.y) };
					break;
				};
				Puppets.Entities.createEntity(
					entitiesModels["rectChild"], 
					{ 
						size2d : 
						{
							"width"  : _size.w+(_x),
							"height" : _size.h+(_x)
						},
						position2d : _positionArea,
						parent : {number : idParent},
						positionId : {corner : _parent.positionId.corner}
					}
				);
				_x+=100;
			};
			
		}
		init();
	}
}
