var pejs = require('pejs');

module.exports = function(app, globals) {
	globals = globals || {};

	var mixin = function(locals, defaults) {
		Object.keys(defaults).forEach(function(key) {
			locals[key] = locals[key] || defaults[key];
		});
		Object.keys(globals).forEach(function(key) {
			locals[key] = locals[key] || globals[key];
		});

		return locals;
	};

	app.on('route', function(request, response) {
		response.locals = response.locals || {};
	});

	app.use('response.render', function(name, locals) {
		var response = this;

		if (typeof name === 'object') {
			locals = name;
			name = 'index';
		}

		locals = mixin(locals || {}, response.locals);

		pejs.render(name, locals, function(err, result) {
			if (err) return response.error(err);
			response.send(result);
		});
	});
};
