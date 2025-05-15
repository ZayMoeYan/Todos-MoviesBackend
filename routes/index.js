var express = require('express');
const {application} = require("express");
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function (req, res, next) {
  console.log('First Hello')
  //res.send('Hello From First hello');
  next();
}, (req, res, next) => {
  console.log('Second Hello ')
  next();
})

router.get('/hello', function (req, res, next) {
  console.log('last Hello')
  res.send(`Hello From Last Hello ${req.reqTime}`);
})
// :id - path variable
// router.get('/api/:id', (req, res, next) => {
//   console.log('Params ', req.params);
//   res.json({
//     id : req.params.id
//   })
// })

router.post('/api', (req, res, next) => {
  res.json({
    userId : 1,
    id : 1,
    title : 'doing laundry',
    completed : 'false'
  })
})

router.get('/secret', (req, res, next) => {
  res.redirect('/login');
})

router.get('/login', (req, res, next) => {
  res.json({
    data : 'This is Login Form'
  })
})

router.get('/unknown', (req, res, next) => {
  let error = {
    message : 'Unknown Page'
  }
  res.status(400)
      .type('application/json')
      .send(JSON.stringify(error));
})

router.get('/download', (req, res, next) => {
  res.download('./public/hello.txt')
})


router.get('/catch/:name', (req, res, next) => {
  res.send(`<h1>${req.params.name}</h1>`)
})


module.exports = router;
