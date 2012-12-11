var pejs = require('pejs');

module.exports = function(app, globals) {
	globals = globals || {};

	var mixin = function(locals) {
                Object.keys(response.locals).forEach(function(key) {
                        locals[key] = locals[key] || response.locals[key];
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

		locals = mixin(locals || {});

		pejs.render(name, locals, function(err, result) {
			if (err) return response.error(err);
			response.send(result);
		});
	});
};
