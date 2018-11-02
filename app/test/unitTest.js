const { APIError, parsePageLimit } = require("../helpers");
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;



describe('Helper Functions', () => {
	describe('parsePageLimit', () => {
		it('Should return a number , if a valid page value is passed', () => {
			const limit = '2';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).equal(2);
		});
		it('Should return API error , if zero page value is passed', () => {
			const limit = '0';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});
		it('Should return API error , if negative page value is passed', () => {
			const limit = '-2';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});
		it('Should return API error , if non numeric page number is passed', () => {
			const limit = 'two';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});

		it('Should return a number , if a valid limit is passed', () => {
			const limit = '2';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).equal(2);
		});
		it('Should return API error , if zero limit is passed', () => {
			const limit = '0';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});
		it('Should return API error , if negative limit is passed', () => {
			const limit = '-2';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});
		it('Should return API error , if non numeric limit is passed', () => {
			const limit = 'two';
			const validateLimit = parsePageLimit.parsePageLimitValue(limit);
			expect(validateLimit).to.be.an.instanceof(APIError);
		});

		it('Should return an API error , if a page value is passed but limit is not passed', () => {
			const limit = '';
			const page = '2';
			const validatePageAndLimit = parsePageLimit.checkPageAndLimitValue(page, limit);
			expect(validatePageAndLimit).to.be.an.instanceof(APIError);
		});
		it('Should return an API error , if a page value is not passed but limit is passed', () => {
			const limit = '2';
			const page = '';
			const validatePageAndLimit = parsePageLimit.checkPageAndLimitValue(page, limit);
			expect(validatePageAndLimit).to.be.an.instanceof(APIError);
		});
		it('Should return an API error , if a both page value and limit is not passed', () => {
			const limit = '';
			const page = '';
			const validatePageAndLimit = parsePageLimit.checkPageAndLimitValue(page, limit);
			expect(validatePageAndLimit).to.be.an.instanceof(APIError);
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