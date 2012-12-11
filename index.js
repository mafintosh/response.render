var pejs = require('pejs');

module.exports = function(app) {
	app.on('route', function(request, response) {
		response.locals = response.locals || {};
	});

	app.use('response.render', function(name, locals) {
		var response = this;

		if (typeof name === 'object') {
			locals = name;
			name = 'index';
		}

		locals = locals || {};
		locals.__proto__ response.locals; // TODO: test performance on this __proto__ link

		pejs.render(name, locals, function(err, result) {
			if (err) return response.error(err);
			response.send(result);
		});
	});
};