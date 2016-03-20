var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var apiRouter = express.Router();
var indexRouter = express.Router();

var port = process.env.PORT || 3001; 

app.use(logger('dev'));

app.use('/app', express.static(path.join(__dirname,'client', 'app')));
app.use('/lib', express.static(path.join(__dirname,'client', 'lib')));

indexRouter.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'client', 'index.html'));
});

apiRouter.get('/', function(req, res) {
	var testObj = { data: 'Test' };
	console.log('returning - ' + JSON.stringify(testObj));
    res.send(testObj);
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use('*', indexRouter);

var listener = app.listen(port, function() {
    console.log('Backend listening on port ' + listener.address().port);
});
