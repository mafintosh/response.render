var pejs = require('pejs');

module.exports = function(app, helpers) {
	if (typeof helpers === 'string') helpers = require(helpers);

	app.on('route', function(request, response) {
		response.locals = response.locals || {};
		if (helpers) response.locals.helpers = helpers;
	});

	app.use('response.render', function(name, locals) {
		var response = this;

		if (typeof name === 'object') {
			locals = name;
			name = 'index';
		}

		locals = locals || {};

		Object.keys(response.locals).forEach(function(key) {
			locals[key] = locals[key] || response.locals[key];
		});

		pejs.render(name, locals, function(err, result) {
			if (err) return response.error(err);
			response.send(result);
		});
	});
};