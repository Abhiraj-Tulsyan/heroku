var express=require('express');
var request = require('request');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res)
{
res.render('index.jade');

})
app.post('/api' , function(req,res) 
{
var program=req.body.program;

request({
    url: 'http://cloudcompiler.esy.es/api/submissions',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
   
var url='http://cloudcompiler.esy.es/api/submissions/' + body.id;
console.log(url);

    request({
        url:  url,
        method: "GET",
        
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
       
   if(body.status==0)
   {
       programstatus=0;
       res.send(body);
   }
   else{
   setTimeout(function()
{
    request({
        url:  url,
        method: "GET",
        
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        res.send(body);
    });

} , 5000 );
    
}
        
    });



});
})
app.post('/check' , function(req,res)
{
    var used=req.body.used;
    request({
        url: 'https://api.jdoodle.com/v1/credit-spent',
        method: "POST",
        json: used
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.send(body)
    });
})

app.listen(3000, function()
{
    console.log('server has started');
})

