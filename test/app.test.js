/**
 * Created by SCMORETO on 27/04/2017.
 */

'use strict';
let should = require('chai').should();
let expect = require('chai').expect;
let request = require('supertest');
let api = require('../app');


describe('getUuid', function () {

    it('Should return the UUID for user ScottM', function (done) {
        try {
            request(api)
                .get('/uuid?email=scott.moreton@capgemini.com')
                .set('Accept', 'application/json')
                .expect(200, '0123456789876543210', done)

        }
        catch (err) {
            console.log(err);
            done();
        }
    });
});


describe('getScheduledTalks', function () {

    it('Should return the scheduled talks for user DanC', function (done) {
        try {
            request(api)
                .get('/scheduled?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
                .set('Accept', 'application/json')
                .expect(200, {"scheduled": [{"id": "MXR-2678"}]}, done)
        }
        catch (err) {
            console.log(err);
            done();
        }

    });
});


describe('getFavoredTalks', function () {

    it('should return the favored talks for user DanC', function (done) {
        try {
            request(api)
                .get('/favored?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
                .set('Accept', 'application/json')
                .expect(200, {"favored": [{"id": "MXR-2678"}]}, done);
        }
        catch (err) {
            console.log(err);
            done();
        }
    });

});

