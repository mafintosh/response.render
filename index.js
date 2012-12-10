var pejs = require('pejs');

module.exports = function(app) {
	app.use('response.render', function(name, locals) {
		var response = this;

		if (typeof name === 'object') {
			locals = name;
			name = 'index';
		}

		pejs.render(name, locals || {}, function(err, result) {
			if (err) return response.error(err);
			response.send(result);
		});
	});
};