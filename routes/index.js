var express = require('express');
var router = express.Router();
var passport = require('../passport');
var users = require('../users');


router.get('/', function(req, res, next) {
  if (req.isAuthenticated()){
    res.redirect('/dashboard');
    return;
  }
  res.render('index', {title: 'My Dashboard App'});
});

router.post('/register', function(req,res,next){
  var success = users.add(req.body.username, req.body.password);
  if (!success){
    next(new Error('User could not be created.'));
    return;
  }
  res.redirect('/');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  })
);

router.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/dashboard', function(req,res,next){
  if (!req.isAuthenticated()){
    res.redirect('/');
    return;
  }
  res.render('dashboard', {user:req.user})
});


module.exports = router;
