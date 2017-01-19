'use strict';

var fs = require('fs'),
    path= require('path'),
    crypto = require('crypto'),
    ici = require('../');

var pat = path.resolve(__dirname, '../icecompr/test');

describe('icecompr', function () {
    // it('md5', function (done) { done(); });
    fs.readdir(pat, function (err0, files) {
        if (err0) { throw err0; }
        files.forEach(function (file) {
            it(file, function (done) {
                var filePat = path.resolve(pat, file);
                fs.stat(filePat, function (err, stat) {
                    if (err) { throw err; }
                    if (stat.isFile('hex')) {

                        var sum = crypto.createHash('md5');
                        sum.setEncoding('hex');

                        fs.createReadStream(filePat)
                        .pipe(ici.icecompr.compressor())
                        .pipe(sum)
                        // .pipe(process.stdout);
                        .pipe(fs.createWriteStream(path.resolve(pat, 'build', file + '.js.md5')));
                        // console.log(file, stat.isFile());
                    }
                    done();
                });
            });
        });
    });
    it('---', function (done) { done(); });
    // console.log('done?');
});

/* eslint-env mocha */
