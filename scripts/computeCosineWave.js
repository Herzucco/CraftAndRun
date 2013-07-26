! define(function () {

	var computeCosineWave = function computeCosineWave(length, options) {
		if (options === undefined) options = computeCosineWave.defaults;

		var defaults = computeCosineWave.defaults
			, wavelength = options.wavelength || defaults.wavelength
			, amplitude = options.amplitude || defaults.amplitude
			, randomness = options.randomness || defaults.randomness
			, subdivisions = options.subdivisions || defaults.subdivisions;

		randomness = Math.min(Math.max(randomness, 0), 1);

		var vertices = []
			, waves = Math.ceil(length / wavelength)
			, da = Math.PI / subdivisions
			, from = Math.random() * -amplitude;

		for (var i = 0; i < waves; i += 1) {
			var to = Math.random() * amplitude * randomness + amplitude * (1 - randomness) * (i % 2 - 0.5) * 2
				, dx = wavelength / subdivisions
				, dy = to - from;

			for (var n = 0; n < subdivisions; n += 1) {
				var cos = Math.cos(da * n) * -0.5 + 0.5;
				vertices.push(i * wavelength + dx * n, from + dy * cos);
			}

			from = to;
		}

		return vertices;
	};

	computeCosineWave.defaults = {

			wavelength: 150

		, amplitude: 100

		, randomness: 1

		, subdivisions: 50

	};


	return computeCosineWave;

});