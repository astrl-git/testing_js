describe('Test GET method', function () {
    var test_response;
    var request = makeRequest.get('http://api.randomuser.me/0.6?gender=male&results=3');

    beforeAll(function (done) {
        request.send().then(function (responce) {
            test_response = responce;
            done();
        });
    });

    it('should check correct response code', function () {
        expect(test_response).toHaveStatusCode(200);
        expect(test_response).not.toHaveStatusCode(400);
    });

    it('should check correct header property', function () {
        expect(test_response.headers).toHaveProperty('server');
        expect(test_response.headers).not.toHaveProperty('WRONG_PROPERTY');
    });

    it('should check correct header value', function () {
        expect(test_response.headers).toHaveValue('content-type', 'text/plain; charset=utf-8');
        expect(test_response.headers).not.toHaveValue('content-type', 'text/html; charset=utf-8');
    });

    it('should check correct scheme', function () {
        expect(test_response.body).toHavePath('results[0].user.name.first');
        expect(test_response.body).not.toHavePath('results[5].user.name.wrong_value');
    });

    it('should check correct value', function () {
        expect(test_response.body).toHaveValue('results[0].user.gender', 'male');
        expect(test_response.body).not.toHaveValue('results[0].user.gender', 'female');
    });

    it('should check correct reg exp matching', function () {
        expect(test_response.body).valueMatchRegExp('results[0].user.email', /\S+@\S+\.\S+/);
        expect(test_response.body).not.valueMatchRegExp('results[0].user.email', /\S+$\S+\.\S+/);
    });

    it('should check correct items count in response', function () {
        expect(test_response.body).toHasItemsCount('results', 3);
        expect(test_response.body).toHasItemsCount('results', '3');
        expect(test_response.body).not.toHasItemsCount('results', 4);
        expect(test_response.body).not.toHasItemsCount('results', '4');
    });

    it('should check items should be different', function (done) {
        request.send().then(function (response) {
            expect(response.body).not.toHasSameValue('results[0].user.name.first', test_response.body);
            done()
        });
    });
});