var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bot = require('../bot/bot')

router.use(bodyParser.urlencoded({ extended: false }));

// GET page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST data
router.post('/',function(req,res){
  bot.bot(req.body.first_ticker, req.body.second_ticker, req.body.rate, req.body.percent)
  res.send(`Monitoring price fluctuations for the ticker pair: ${ req.body.first_ticker } : ${ req.body.second_ticker }`);
});

module.exports = router
