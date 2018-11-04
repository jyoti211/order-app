const { APIError, parsePageLimit } = require("../helpers");
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const server = 'localhost:8080';


describe('Helper Functions', () => {
	describe('parsePageLimit', () => {
		it('Should return a number , if a valid limit value is passed', (done) => {
			chai.request(server)
            .get('/orders?page=1&limit=2')
            .end(function(err, res) {
              expect(res).to.have.status(200);
              done();
        	});
		});
		it('Should return API error , if zero limit value is passed', (done) => {
			chai.request(server)
            .get('/orders?page=2&limit=0')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Number should be equal or greater than 1.");
              done();
        	});
		});
		it('Should return API error , if negative limit value is passed', (done) => {
			chai.request(server)
            .get('/orders?page=0&limit=-2')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Number should be equal or greater than 1.");
              done();
			});
		});
		it('Should return API error , if non numeric limit number is passed', (done) => {
			chai.request(server)
            .get('/orders?page=0&limit=two')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Invalid limit: 'two', limit needs to be an integer.");
              done();
          });
		});

		it('Should return a number , if a valid page is passed', (done) => {
			chai.request(server)
            .get('/orders?page=1&limit=1')
            .end(function(err, res) {
            	expect(res).to.have.status(200)
              //expect(res).equal(1);
              done();
        	});
		});
		it('Should return API error , if zero page is passed', (done) => {
			chai.request(server)
            .get('/orders?page=0&limit=1')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Number should be equal or greater than 1.");
              done();
        	});
			//expect(validateLimit).to.be.an.instanceof(APIError);
		});
		it('Should return API error , if negative page is passed', (done) => {
			chai.request(server)
            .get('/orders?page=-2&limit=1')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Number should be equal or greater than 1.");
              done();
        	});
		});
		it('Should return API error , if non numeric page is passed', (done) => {
			chai.request(server)
            .get('/orders?page=aaaaa&limit=1')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Invalid page: 'aaaaa', page needs to be an integer.");
              done();
        	});
        });

		it('Should return an API error , if a page value is not passed but limit is passed', (done) => {
			chai.request(server)
            .get('/orders?page=&limit=2')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Either of Page or limit Number is missing.");
              done();
        	});
		});
		it('Should return an API error , if a page value is passed but limit is not passed', (done) => {
			
			chai.request(server)
            .get('/orders?page=1&limit=')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Either of Page or limit Number is missing.");
              done();
        	});
		});
		it('Should return an API error , if a both page value and limit is not passed', (done) => {
			chai.request(server)
            .get('/orders?page=&limit=')
            .end(function(err, res) {
              expect(res).to.have.status(500);
              res.body.error.should.include("Either of Page or limit Number is missing.");
              done();
        	});
		});
		it('Should return an correct count of number of records', () => {
			const orderList = [
				    {
				        "id": "5bdae726aea167063552ceed",
				        "distance": 20,
				        "status": "UNASSIGNED"
				    },
				    {
				        "id": "5bdae726aea167063552ceef",
				        "distance": 20,
				        "status": "UNASSIGNED"
				    }
				];
			const checkNumberOfOrders = parsePageLimit.checkNumberOfOrders(orderList);
			expect(checkNumberOfOrders).equal(2);
		});
	})
});