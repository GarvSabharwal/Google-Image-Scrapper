var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
for(i=0;i<10;i++)
{
download('http://www.rohitsindher.com/wp-content/uploads/2016/01/garv.jpg', 'google'+i+'.jpg', function(){
  console.log('done');
});
}