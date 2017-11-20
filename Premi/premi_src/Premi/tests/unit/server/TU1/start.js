/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 21/05/2015
 */

var path = require('path'),
    should = require('should'),
    app = require(path.resolve('./server')),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    http = require('http'),
    server= '',
    port= 3333,
    driver= require(path.resolve('./tests/utility/headerStub'));

describe('TU1 - start() - avvio corretto', function () {

    before(function (done) {
        server = app.listen(port, function (err, result) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });

    it('Verificare che esista l\'istanza del server', function (done) {
        should.exist(app);
        done();
    });

    it('Verficare che l\'istanza del server sia in ascolto su localhost:3333', function (done) {
            var headers = driver.defaultGetOptions(port);
            http.get(headers, function (res) {
                res.statusCode.should.eql(401);
                done();
            });
        });

    after(function (done) {
        server.close();
        done();
    });
});
