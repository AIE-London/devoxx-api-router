/**
 * Created by SCMORETO on 27/04/2017.
 */

'use strict';
let should = require('chai').should();
let expect = require('chai').expect;
let request = require('supertest');
let api = require('../app');




describe('getUuid', function(){

    it('should return the UUID for user DanC', function(){
        request(api).get('/uuid?email=dan.cotton@capgemini.com')
            .set('Accept', 'text/plain')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.equal("26667c9fdcc603ee93b43fb3e780b07378695a86");
                done();
            });
    })
});

describe('getScheduledTalks', function(){

    it('should return the scheduled talks for user DanC', function(){
        request(api).get('/scheduled?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.equal({
                    "favored": [
                        {
                            "id": "MXR-2678"
                        }
                    ]
                });
                done();
            });
    })
});

describe('getFavoredTalks', function(){

    it('should return the favored talks for user DanC', function(){
        request(api).get('/favored?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.equal({
                    "scheduled": [
                        {
                            "id": "MXR-2678"
                        }
                    ]
                });
                done();
            });
    })
});


