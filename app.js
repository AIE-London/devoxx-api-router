
let express = require('express'), http = require('http'), path = require('path'), fs = require('fs');

let app = express();

let Promise = require('promise');
let logger = require('morgan');
let errorHandler = require('errorhandler');
let bodyParser = require('body-parser');
let req = require('then-request');
let basicAuth = require('basic-auth-connect');

let devoxxEndpoint = "http://cfp.devoxx.co.uk/uuid?email=";
let username = "capgemini@devoxx.com";
let password = "XGj8iV5PbHQdaBe";

/**
 * Setup for all environment variables
 */
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basicAuth(username, password));

if ('development' === app.get('env')) {
    app.use(errorHandler());
} else {
    app.use((req, res, next) => {
        let allowedOrigins = ['https://localhost:3000', 'http://localhost:3000', 'http://mydevoxx-uuid.eu-gb.mybluemix.net', 'https://mydevoxx-uuid.eu-gb.mybluemix.net'];
        let origin = req.headers.origin;
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Authorization', basicAuth);

        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        return next();
    });
}

/**
 * GET - uuid for user
 *
 * Receives GET from devoxx dashboard containing user email ->
 * GET devoxx API to receive UUID for email sent ->
 * Forwards received UUID to devoxx dashboard to get user specific data
 */
app.get('/uuid?email=', (request, response) => {
    let userEmail = request.query.email;
    let url = devoxxEndpoint + userEmail;

    req('GET', url).then((res) => {
        response.setHeader('Content-Type','text/plain');
        response.status = res.statusCode;
        response.write(res.body);
        response.end();
    }, (err) => {
        response.setHeader('Content-Type','text/plain');
        response.status = 404;
        response.write("UUID not returned for email address given");
        response.end();
    })
});