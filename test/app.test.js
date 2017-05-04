/**
 * Created by SCMORETO on 27/04/2017.
 */

'use strict';
let should = require('chai').should();
let expect = require('chai').expect;
let request = require('supertest');
let api = require('../app');


describe('getUuid', function () {

    it('should return the UUID for user DanC', function () {
        request(api).get('/uuid?email=dan.cotton@capgemini.com')
            .set('Accept', 'text/plain')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal("26667c9fdcc603ee93b43fb3e780b07378695a86");
                done();
            });
    })
});

describe('getScheduledTalks', function () {

    it('should return the scheduled talks for user DanC', function () {
        request(api).get('/scheduled?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
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

describe('getFavoredTalks', function () {

    it('should return the favored talks for user DanC', function () {
        request(api).get('/favored?uuid=26667c9fdcc603ee93b43fb3e780b07378695a86')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
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

describe('getSpeakerDetails', function () {
    it('should return the speaker data for a talk', function () {
        request(api).get('/speakers?speakerId=695b40d928dd0a905b7ab1b900b5a5752870a7d8')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal({
                    "uuid": "695b40d928dd0a905b7ab1b900b5a5752870a7d8",
                    "bioAsHtml": "<p>Helen has 20 years’ experience working in the technology industry with a focus on the Software Development Lifecycle for a wealth of cross industry clients in the UK and abroad. Helen is passionate about DevOps and is the creator of the Ranger4 DevOps LiftOff Workshop and the Ranger4 DevOps Maturity Assessment - winner of the IBM Beacon Award 2015 for Outstanding DevOps Solution. She also started Ranger4’s #DevOpsFriday5 initiative and is on the Board of Regents at the DevOps Institute (Ranger4 are also a Registered Education Provider for the DOI’s DevOps training courses). Helen is also a novelist and ecologist. She once saw a flamingo lay an egg.</p>\n",
                    "acceptedTalks": [
                        {
                            "talkType": "Conference",
                            "track": "Methodology &amp; Culture",
                            "links": [
                                {
                                    "href": "http://cfp.devoxx.co.uk/api/conferences/DV17/talks/IBN-5679",
                                    "rel": "http://cfp.devoxx.co.uk/api/profile/talk",
                                    "title": "More details about this talk"
                                },
                                {
                                    "href": "http://cfp.devoxx.co.uk/api/conferences/DV17/speakers/695b40d928dd0a905b7ab1b900b5a5752870a7d8",
                                    "rel": "http://cfp.devoxx.co.uk/api/profile/speaker",
                                    "title": "Helen Beal"
                                }
                            ],
                            "id": "IBN-5679",
                            "title": "The DevOps Superpattern"
                        }
                    ],
                    "company": "Ranger4",
                    "bio": "Helen has 20 years’ experience working in the technology industry with a focus on the Software Development Lifecycle for a wealth of cross industry clients in the UK and abroad. Helen is passionate about DevOps and is the creator of the Ranger4 DevOps LiftOff Workshop and the Ranger4 DevOps Maturity Assessment - winner of the IBM Beacon Award 2015 for Outstanding DevOps Solution. She also started Ranger4’s #DevOpsFriday5 initiative and is on the Board of Regents at the DevOps Institute (Ranger4 are also a Registered Education Provider for the DOI’s DevOps training courses). Helen is also a novelist and ecologist. She once saw a flamingo lay an egg.",
                    "lastName": "Beal",
                    "firstName": "Helen",
                    "blog": "www.ranger4.com",
                    "avatarURL": "https://media.licdn.com/media/p/2/000/10f/320/3b9da1f.jpg",
                    "twitter": "@helenranger4",
                    "lang": "en"
                });
                done()
            });
    });
});

describe('getTalkDetails', function () {
    it('should return the talk data', function () {
        request(api).get('/talks?talkId=IBN-5679')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal({
                    "id": "IBN-5679",
                    "title": "The DevOps Superpattern",
                    "talkType": "Conference",
                    "track": "Agile, DevOps",
                    "lang": "en",
                    "summary": "Talk summary",
                    "summaryAsHtml": "<p>Talk summary as html</p>",
                    "speakers": [
                        {
                            "link": {
                                "href": "http://cfp.devoxx.co.uk/api/conferences/DV17/speakers/695b40d928dd0a905b7ab1b900b5a5752870a7d8",
                                "rel": "http://cfp.devoxx.co.uk/api/profile/speaker",
                                "title": "Helen Beal"
                            },
                            "name": "Helen Beal"
                        }
                    ]
                });
                done()
            });
    });
});