# response.render

response.render is a small plugin for [root](https://github.com/mafintosh/root) that adds a `render` function to the response

	npm install response.render

response.render will render a [PEJS](https://github.com/gett/pejs) template and write it to the response while adding the appropriate headers.

``` js
var root = require('root');

var app = root();

app.use(require('response.render'), {
	helpers: require('./my-template-helpers')      // set global locals (like some helpers)
});

app.all(function(request, response, next) {
	response.locals.user = {username:'test-user'}; // set default locals
	next();
})

app.get(function(request, response) {
	response.render('./my-test-template', {my:'locals'});
});

app.listen(8080);
```
