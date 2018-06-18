const assert = require('chai').assert;
//const config = require('../config/database');
const config = require('../config/database');

const Project = require('../models/Project');
const Projects = require('../controller');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http'); 
chai.use(chaiHttp);

let should = chai.should();
let expect = chai.expect;


//add projects
    it('post for add projects' , function(done){
      chai.request('http://localhost:8001/api')
      .post('/register')
      .send({
          "tags":["reactjs","mongodb"],
          "coloborators":[],
          "projectName":"AAF",
          "postdescription":"create a project management web site",
          "privacy":true,
          "user":"5b27a05f0cbe4f23acd1eb1d"
        })
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
       // expect(res.body.success).to.equal(true);
       done();
      });
    });


    //update project
    it('put method for project' , function(done){
      chai.request('http://localhost:8001/api')
      .put('/updateProjects')
      .send({"_id":"5b27a1e00cbe4f23acd1eb1f","tags":["html"],"coloborators":[],"projectName":"ITP","postdescription":"web site",
      "privacy":false,"user":"5b27a05f0cbe4f23acd1eb1d"
    },)
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        //expect(res.body).to.equal(true);

        done();
      });
    });


     //delete project
     it('delete method for project' , function(done){
      chai.request('http://localhost:8001/api')
      .delete('/delproject?id=5b27bb9691e15c339cd92811')
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
      //  expect(res.body).to.equal(err);

        done();
      });
    });

//get projects
it('get method for project', (done) => {
  chai.request('http://localhost:8001/api')
   .get('/showPublicPost')
   .end((err, res) => {
         expect(res.statusCode).to.equal(200);
       //  expect(res.body.success).to.equal(true);
                 
            done();
       });
  });
  

  //Get only user belong Projects
  it('get method for user project', (done) => {
    chai.request('http://localhost:8001/api')
     .get('/showMyProjects?id=5b27a05f0cbe4f23acd1eb1d')
     .end((err, res) => {
           expect(res.statusCode).to.equal(200);
         //  expect(res.body.success).to.equal(true);
                   
              done();
         });
    });

    //get user update
    it('put method for project' , function(done){
      chai.request('http://localhost:8001/api')
      .put('/updateuser')
      .send({"_id":"5b27a2ae0cbe4f23acd1eb21","username":"shaku","email":"shakuni@gmail.com","firstname":"shakuni","lastname":"dharme",
      "password":"$2b$12$kEsfNZOAKT2y1f6lMsJwgOcR1U/iULHZslFMiB4wGfckXyJ2de1Kq",},)
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        //expect(res.body).to.equal(true);

        done();
      });
    });


    //login user

    it('post for login user' , function(done){
      chai.request('http://localhost:8001/api')
      .post('/login')
      .send({"email":"muvindu@gmail.com","password":"$2b$12$lgYM6HIAc5aF26Lzdlvu8O41vzMH7yAMNQgzaiRO.XHkYLNKWkcVi",})
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
       // expect(res.body.success).to.equal(true);
       done();
      });
    });

    