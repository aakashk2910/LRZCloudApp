var express = require('express');
var router = express.Router();

(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

var cp = require("child_process");

var cms = {
    list : "dir",
    folder : "mkdir",
    clear : "cls",
    noOfUsers : "net user"
}
var output = "";
var child = cp.exec(cms.noOfUsers);
child.stdout.on("data", (data)=>{
    output = "\n"+data;
    console.log(`data:\n ${data}`)
});

child.stderr.on("data", (err)=>{
  console.log(`error: ${err}`)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function(req, res, next) {
    res.render('api', { title: output });
});

module.exports = router;
