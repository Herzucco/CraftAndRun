require.config({
		urlArgs: "bust=" +  Date.now()

	, paths: {
			"box2d": "../libs/box2d.min"
		}

	, shim: {
			"box2d": {exports: "Box2D"}
		}
});


require(["main"]);