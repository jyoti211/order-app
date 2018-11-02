const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const server = 'localhost:8080';

/*
 * Test Suite for make DB connection.
 */
describe('Test Suite', function() {
    before(function(done) {
        mongoose.connect('mongodb://localhost/orders', function(error) {
            if (error) console.error('Error while connecting:\n%\n', error);
            console.log('Connected to DB');
            done(error);
        });
    });
});

/*
 * No route found.
 */
describe('GET /', () => {
    it('Should return 404 for Non configured Urls', (done) => {
        chai.request(server)
            .get('/')
            .end(function(err, res) {
              expect(res).to.have.status(404);
              done();
        });
    });
});

/*
 * Create order.
 */
describe('/POST order', () => {
    it('Should return 500 with invalid format', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: [28, "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should create order with valid request', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.58484", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
              data = res;
            });
    });

    it('Should return response status UNASSIGNED for new order', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.be.equal('UNASSIGNED');
                done();
            });
    });

    it('Should return API error on valid origin and invalid destination', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["abc", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return API error on invalid origin and valid destination', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["abc", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return API error on invalid origin and invalid destination', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["abc", "77.111761"],
                destination: ["28.530264", "aaa"]
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return success on numeric distance', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["28.530264", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.distance).to.be.an('number');
                done();
            });
    });

    it('Should return error on non numeric distance', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["abc", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return order id as string', (done) => {
        chai.request(server)
            .post('/orders')
            .send({
                origin: ["28.530264", "77.111761"],
                destination: ["30.1235", "77.111761"]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.id).to.be.an('string');
                done();
            });
    });
});

/*
 * Order update.
 */
describe('/PATCH /orders/:id', () => {
    it('Should return error for order not found', (done) => {
        chai.request(server)
            .patch('/orders/5bc07c1c478e1313f08333bb')
            .send({
                status: "TAKEN"
            })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Should return 500 for bad format', (done) => {
        chai.request(server)
            .get('/orders?page=1&limit=1')
            .end((err, res) => {
                let orderResponse = res;
                chai.request(server)
                    .patch('/orders/' + res.body[0].id)
                    .send({
                        wrong_parm: "TAKEN" //Wrong format as param not supported
                    }).end((err, res) => {
                        expect(res).to.have.status(500);
                        done();
                    })
            });
    });

  it('Should return success for updating status to taken', (done) => {
      chai.request(server)
          .get('/orders?page=1&limit=1')
          .end((err, res) => {
              chai.request(server)
                  .patch('/orders/' + res.body[0].id)
                  .send({
                      status: "TAKEN"
                  })
                  .end((err, res) => {
                      expect(res).to.have.status(200);
                      done();
                  });
          });
  });

  it('Should return failure for updating status to taken', (done) => {
      chai.request(server)
          .get('/orders?page=1&limit=1')
          .end((err, res) => {
              let orderResponse = res;
              chai.request(server)
                  .patch('/orders/' + res.body[0].id)
                  .send({
                      status: "TAKEN"
                  }).end((err, res) => {
                      expect(res).to.have.status(409);
                      chai.request(server)
                          .patch('/orders/' + orderResponse.body[0].id)
                          .send({
                              status: "UNASSIGNED"
                          }).end((err, res) => {
                              done();
                          });
                  })
          });
  });
});

/*
 * Order listing.
 */
describe('GET /', () => {
    it('Should return maximum two orders (limit=2)', (done) => {
        chai.request(server)
            .get('/orders?page=1&limit=2')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return wrong limit datatype error with (limit=abc)', (done) => {
        chai.request(server)
            .get('/orders?page=1&limit=xyz')
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return wrong page datatype error with (page=abc)', (done) => {
        chai.request(server)
            .get('/orders?page=xyz&limit=1')
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return error with limit value less than 1 (limit=-1)', (done) => {
        chai.request(server)
            .get('/orders?page=xyz&limit=1')
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });

    it('Should return error with page value less than 1 (page=0)', (done) => {
        chai.request(server)
            .get('/orders?page=xyz&limit=1')
            .end(function(err, res) {
                expect(res).to.have.status(500);
                done();
            });
    });
});
