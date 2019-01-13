// const main = require("../game-server");
// const gamesRoutes = require("../routes/games");
const mongo = require('mongodb').MongoClient;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const chai = require("chai");
const assert = chai.assert;

let chaiHttp = require('chai-http');
let should = chai.should();
const port = process.env.PORT || 3000;

let server = require('../app');


let origin = 'http://localhost:3000';
// const allowedOrigins = ['http://localhost:3000', 'https://coachgo.herokuapp.com'];
// if (port === 3000){origin = allowedOrigins[0]} else {origin = allowedOrigins[1]}

chai.use(chaiHttp);

// not gonna use images I guess
// describe("Check image file", () => {
//     it("Should be able tu run test to see if It exist", () => {
//         const checkFile = main.checkFile();
//         assert.equal(checkFile, "image file exist");
//     });
// });



const dbPath = 'mongodb://vidas:vidas123@coachgo-shard-00-01-dqxa6.mongodb.net:27017/coachgo?ssl=true&authSource=admin';

describe("In mongodb", function () {
   beforeEach(function (done) {
      mongo.connect(dbPath)
            .then(function (currentDb) {
                console.log('connection succesful');
               done()
            })
            .catch(function (e) {
                console.log('Connection problem');
               done(e)
            });
   });

   it('Empty test', function aaa() {
      return 'this test is just empy' ;
   });
});


// clearing database not now 
// describe('Clear database', () => {
//     beforeEach((done) => { 
//         Users.remove({}, (err) => { 
//            done();           
//         });        
//     });



  describe('/POST user', () => {
    it('it should not allow to login with wrong credentials', (done) => {
        let user = {
            email: "a@a",
            password: "a123",
        }
      chai.request(origin)
          .post('/api/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eql(false);
            done();
          });
    });


    it('it should allow to login with correct credentials', (done) => {
        let user = {
            email: "a@a",
            password: "a",
        }
      chai.request(origin)
          .post('/api/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eql(true);
            done();
          });
    });

});


describe('/Register user', () => {
    it('it should create a new user on our database', (done) => {
        var userData = {
            email: 'kkkk@kkkk',
            firstName: 'kkkk@kkkk',
            lastName: 'kkkk@kkkk',
            password: 'kkkk@kkkk',
            type: 'coach'
          }
      chai.request('http://localhost:3000')
          .post('/api/register')
          .send(userData)
          .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.not.have.property('errors');
                res.body.should.have.property('status');
                res.body.should.have.property('status').eql(true);
            done();
          });
    });

 });