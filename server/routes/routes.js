var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Track = require('../../models/Track');
var environment = require('../../environment.json');
router.get('/', function(req, res){
  res.render('index')
});
router.route('/insert')
.post(function(req,res) {
 var track = new Track();
  track.title = req.body.title;
  track.description = req.body.description;
  track.elapsed = req.body.elapsed;
  track.since = req.body.since;
  console.log(track)
track.save(function(err) {
      if (err)
        res.send(err);
      res.send({ codeName: 'Track successfully added!'});
  });
})
router.route('/login')
.post(function(req, res) {
 const doc = {
    username: req.body.username,
    password: req.body.pwd,
 };
 console.log(doc);
 console.log('*******************************');
 console.log('Only available dummy account: ');
 console.log(environment);
 if(doc.username === environment.account.username && doc.password === environment.account.password) {
   res.send({authenticated:true, message: 'Successfully logged in!'});
 } else if(doc.username != '' && doc.password != '') {
   res.send({authenticated:false, message: 'Wrong username or password'});
 } else {
   res.send({authenticated:false, message: 'Please fill out the from'});
 }
});
router.route('/update')
.post(function(req, res) {
 const doc = {
     title: req.body.title,
     description: req.body.description,
     elapsed: req.body.elapsed,
     since: req.body.since
 };
 console.log(doc);
  Track.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('Track successfully updated!');
  });
});
router.get('/delete', function(req, res){
 var id = req.query.id;
 Track.find({_id: id}).remove().exec(function(err, track) {
  if(err)
   res.send(err)
  res.send('Track successfully deleted!');
 })
});
router.get('/getAll',function(req, res) {
 var elapsedRec = req.query.elapsed;
 var sinceRec = req.query.since;
 if(elapsedRec && elapsedRec != 'All'){
  Track.find({$and: [ {elapsed: elapsedRec}, {since: sinceRec}]}, function(err, tracks) {
   if (err)
    res.send(err);
   res.json(tracks);
  });
 } else {
  Track.find({since: sinceRec}, function(err, tracks) {
   if (err)
    res.send(err);
   res.json(tracks);
  });
 }
});
module.exports = router;