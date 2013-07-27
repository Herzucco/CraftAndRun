! define( [ "Game" ], function ( Game ) 
{
	window.Game = Game;
/*
	var computeCosineWave = require("computeCosineWave")

		, World = require("b2/World")
		, Vec2 = require("b2/Vec2")
		, DebugDraw = require("b2/DebugDraw")
		, Body = require("b2/Body")
		, BodyDef = require("b2/BodyDef")
		, FixtureDef = require("b2/FixtureDef")
		, PolygonShape = require("b2/PolygonShape")
		, CircleShape = require("b2/CircleShape");


	var SCALE = 30;


	var canvas = document.getElementById("screen")
		, world = new World(new Vec2(0, 10), true)
		, debugDraw = new DebugDraw()
		, fixdef = new FixtureDef()
		, bodydef = new BodyDef();

	debugDraw.SetSprite(canvas.getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(DebugDraw.e_shapeBit | DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	fixdef.density = 1.0;
	fixdef.friction = 0.5;
	fixdef.restitution = 0.0;


	var curve = computeCosineWave(canvas.width)

		, y = canvas.height * (3 / 4) / SCALE

		, ax = curve[0] / SCALE
		, ay = curve[1] / SCALE;

	for (var i = 2; i < curve.length; i += 2) {
		var bx = curve[i] / SCALE
			, by = curve[i + 1] / SCALE

			, x = ax + (bx - ax) / 2
			, height = canvas.height / SCALE - Math.min(ay, by);

		bodydef.type = Body.b2_staticBody;

		bodydef.position.Set(x, y);

		fixdef.shape = new PolygonShape();
		fixdef.shape.SetAsArray([
				new Vec2(ax - x, ay)
			, new Vec2(bx - x, by)
			, new Vec2(bx - x, by + height)
			, new Vec2(ax - x, ay + height)
		], 4);

		world.CreateBody(bodydef).CreateFixture(fixdef);

		ax = bx;
		ay = by;
	}


	bodydef.type = Body.b2_dynamicBody;

	bodydef.position.Set(canvas.width / 3 / SCALE, 0);

	fixdef.shape = new CircleShape(0.1);

	world.CreateBody(bodydef).CreateFixture(fixdef);


	requestAnimationFrame(function loop() {
		requestAnimationFrame(loop);

		world.Step(1 / 60, 10, 10);
		world.ClearForces();

		world.DrawDebugData();
	});
*/
});