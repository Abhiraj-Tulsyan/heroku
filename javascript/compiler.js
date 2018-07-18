var myApp=angular.module('myApp' , []);
var compiler={

    scriptValue:"",
    scriptLanguage:""
}

myApp.controller('mainController' , [ '$scope' , '$http', function($scope , $http) 
{
$scope.script='';
$scope.language='';
$scope.output="";
$scope.input=null;
$scope.error="";

compiler.checking=function(x){ return $http.get('http://cloudcompiler.esy.es/api/languages/template/' +x).then(function(data)
{
    console.log(data);
    compiler.scriptValue=data.data.source;
  return compiler.scriptValue;
})


}
compiler.sending=function()
{
   $scope.script=compiler.scriptValue;
   console.log($scope.script);
   $scope.language=compiler.scriptLanguage;
   if($scope.input=='')
   {
       $scope.input=null;
   }
   console.log($scope.input);
    var program = {
        sourceCode : $scope.script,
        langId : $scope.language,
       stdin:$scope.input,
       timeLimit:0
    };
$http.post('/api' , { "program" : program }).then(function(data)
{
    console.log(data);
    console.log(data.data.result);

if(data.data.result==15)
{
$scope.output=data.data.stdout;
$scope.error="";

// here we will check from database whether the output has the same value or not



}
else if(data.data.result==12)
{
    $scope.error="Runtime error\n";
    $scope.output=data.data.stderr;
}
else if(data.data.result==11)
{
    $scope.error="Compilation error\n";
    $scope.output=data.data.stderr + data.data.cmperr;
}
else if(data.data.result==13)
{
    $scope.error="Time limit exceeded\n";
    $scope.output=data.data.stderr + data.data.cmperr;
    
}
else if(data.data.result==17)
{
    $scope.error="Memory limit exceeded\n";
    $scope.output=data.data.stderr + data.data.cmperr;
    
}




}, function(error)
{
console.log(error);
}

)

}
} ]);