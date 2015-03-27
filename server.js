var _ = require('underscore');
var events = require('events');
var express = require('express');
var cons = require('consolidate');
var request = require('request');
var app = express();
var Util = require('./classes/util.js');

app.engine('html', cons.underscore);
app.set('view engine', 'underscore');

app.use(express['static'](__dirname + '/public'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res, next){
    res.render('index.html', {});
});

app.post('/content', function(req, res, next) {
    var url = req.param('url');

    if (url.indexOf('http://') === -1)
        url = 'http://' + url;

    request(url, function (error, response, body) {
        if (error) {
            res.send(error);
        }

        if (response.statusCode == 200) {
            var tagMap = Util.parseTags(body);
            res.send({
                tagMap: tagMap,
                source: body
            });
        }
    });
});

app.listen(process.env.PORT || 8040);
