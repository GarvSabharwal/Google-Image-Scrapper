'use strict'
exports.searchKeyword = function (keyword, callback) {


    var Scraper = require('./google_search')
        , google = new Scraper.Google()
        , fs = require('fs'),
        request = require('request'), zlib = require('zlib');
    var key = keyword.keyword;

    var headers = {
        'accept-encoding': 'gzip,deflate'
    };
    // will take ALOT of time if num=undefined
    google.list({
        keyword: key,
        num: 15,
        detail: true,
        nightmare: {
            show: true
        },
        advanced: {
            imgType: 'photo', // options: clipart, face, lineart, news, photo
            resolution: undefined, // options: l(arge), m(edium), i(cons), etc.
            color: undefined // options: color, gray, trans
        }
    })
        .then(function (res) {
            var Arraya = [];
            Arraya = res;

            for (var i = 0; i < 15; i++) {
                download(Arraya[i]["url"].toString(), key + i + '.jpg', function () {



          console.log('done');

                });
            }


        }).catch(function (err) {
            console.log('err', err);
        });





    var download = function (uri, filename, callback) {
        request.head({ uri, headers: { 'accept-encoding': 'gzip,deflate' } }, function (err, res, body) {

            switch (res.headers['content-encoding']) {
                case 'gzip':
                    request({ url: uri, 'headers': headers }).pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./images/' + filename)).on('close', callback);

                    break;
                case 'deflate':
                    request({ url: uri, 'headers': headers }).pipe(zlib.createInflate()).pipe(fs.createWriteStream('./images/' + filename)).on('close', callback);;
                    break;
                default:
                    request({ url: uri, 'headers': headers }).pipe(fs.createWriteStream('./images/' + filename)).on('close', callback);;
                    break;
            }




        });
    };

    callback();
    // listening on events is also possible
    google.on('result', function (item) {
        console.log('result', item);
    });

    
}