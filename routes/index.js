const router = require("express").Router();


router.post("/test", (req, res, next) => {
  var spawn = require('child_process').spawn;
  const process = spawn('python', ['script.py', req.body.svg, req.body.file]);
  process.stdout.on('data', (data) => {
    console.log('stdout', data)
    test = data.toString();
  });
  process.stderr.on('data', (data) => {
    console.log('err results: %j', data.toString('utf8'))
  });
  process.stdout.on('end', function (data) {
      console.log('stdout end', data)
  });
})

module.exports = router;
