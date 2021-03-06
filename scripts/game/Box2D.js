define( function( require )
{
	var Box2D = function()
	{
		Box2D.World = require("b2/World");
		Box2D.Vec2 = require("b2/Vec2");
		Box2D.DebugDraw = require("b2/DebugDraw");
		Box2D.Body = require("b2/Body");
		Box2D.BodyDef = require("b2/BodyDef");
		Box2D.FixtureDef = require("b2/FixtureDef");
		Box2D.PolygonShape = require("b2/PolygonShape");
		Box2D.CircleShape = require("b2/CircleShape");
		Box2D.CosineWave = require("computeCosineWave");
	};

	return Box2D;	
});