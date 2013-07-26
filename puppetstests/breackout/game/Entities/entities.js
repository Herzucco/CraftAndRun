var entitiesModels =
{
	brick :{"components" : [{"renderShape" : {"shape" : "square"}}, "position2d", "size2d"]},
	player : {"components" : [{"renderShape" : {"shape" : "square"}}, "position2d", "size2d", "moveListener", "velocity2d"]},
	entityInput : {"components" : ["inputListener"]},
	ball :{"components" : [{"renderShape" : {"shape" : "circle"}}, "position2d", "size2d", "velocity2d", "ballCenter", "colliderCage"]},
	rectChild :{"components" : [ "position2d", "size2d","parent"]},
	attractor :{"components" : [{"renderShape" : {"shape" : "circle"}}, "catchForces", "fromPlayer", "position2d", "size2d", "attackOne", "attackTwo", "attackThree"]},
	attack :{"components" : [{"renderShape" : {"shape" : "circle"}}, "position2d", "size2d", "attracted", "velocity2d", "attackChooser"]},
	cage :{"components" : ["cageArea", "position2d", "renderStroke", "size2d"]},
	pulse :{"components" : ["renderPulse", "position2d", "size2d"]},
}