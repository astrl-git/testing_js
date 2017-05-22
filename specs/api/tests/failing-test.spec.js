describe('Test Failing results', function () {
    var test_response;
    var sendData = {
        email: 'some.valid@mail.mail',
        array_of_items: [1, 'a', true, {"a": "b"}, ['a', 'b', 'c']],
        description: "test-message",
        sensorValue: 0.2222,
        alert: true
    };
    var request = makeRequest
        .post('https://dweet.io/dweet/for/api-testing-tool')
        .body(sendData);

    beforeAll(function (done) {
        request.send().then(function (responce) {
            test_response = responce;
            done();
        });
    });

    it('should fail: check response code', function () {
        expect(test_response).not.toHaveStatusCode(200);
        expect(test_response).toHaveStatusCode(400);
    });

    it('should fail: check header property', function () {
        expect(test_response.headers).not.toHaveProperty('content-length');
        expect(test_response.headers).toHaveProperty('WRONG_PROPERTY');
    });

    it('should fail: check header value', function () {
        expect(test_response.headers).not.toHaveValue('content-type', 'application/json');
        expect(test_response.headers).toHaveValue('content-type', 'text/html; charset=utf-8');
    });

    it('should fail: check path', function () {
        expect(test_response.body).not.toHavePath('with.content.description');
        expect(test_response.body).toHavePath('with.content.description.WRONG_PROPERTY');
    });

    it('should fail: check value', function () {
        expect(test_response.body).not.toHaveValue('with.content.description', 'test-message');
        expect(test_response.body).toHaveValue('with.content.description', 'wrong-test-message');
    });

    it('should fail: check reg exp matching', function () {
        expect(test_response.body).not.valueMatchRegExp('with.content.email', /\S+@\S+\.\S+/);
        expect(test_response.body).valueMatchRegExp('with.content.email', /\S+$\S+\.\S+/);
    });

    it('should fail: check items count in response', function () {
        expect(test_response.body).not.toHasItemsCount('with.content.array_of_items', 5);
        expect(test_response.body).not.toHasItemsCount('with.content.array_of_items', '5');
        expect(test_response.body).toHasItemsCount('with.content.array_of_items', 4);
        expect(test_response.body).toHasItemsCount('with.content.array_of_items', '4');
    });
});