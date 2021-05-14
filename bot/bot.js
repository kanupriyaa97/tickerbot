const request = require('request');
const readline = require('readline');
const database  = require('../database')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const createInDB = async (first_ticker, second_ticker, ask, price_oscillation_percent, fetch_interval) => {
  let c = await database.Oscillation.create({
    first_ticker: first_ticker,
    second_ticker: second_ticker,
    rate: fetch_interval,
    percent: price_oscillation_percent,
    alerted_ask_price: ask
  });
  return c
}

var ask;
var initial_ask;
var upper_limit;
var lower_limit;

const getTickers = async (first_ticker, second_ticker, fetch_interval, price_oscillation_percent) => {
  request(`https://api.uphold.com/v0/ticker/${ first_ticker }-${ second_ticker }`, function (error, response, body) {
    if (error)
      console.error('error:', error);
    const first_obj = JSON.parse(body);
    const percent = parseFloat(first_obj.ask) * price_oscillation_percent/100;
    initial_ask = first_obj.ask;
    upper_limit = parseFloat(first_obj.ask) + percent;
    lower_limit = parseFloat(first_obj.ask) - percent;
  });

  const getTicker = async function getTicker() {
    // Get data from public ticker
    request(`https://api.uphold.com/v0/ticker/${ first_ticker }-${ second_ticker }`, function (error, response, body) {
      if (error)
        console.error('error:', error);
      let obj = JSON.parse(body);
      ask = parseFloat(obj.ask);

      // Check if limit is exceeded and persist to db
      if (ask > upper_limit || ask < lower_limit ) {
        let message = `WARNING: Ask price 1 ${ first_ticker } = ${ ask } ${ second_ticker } \n is more than ${ price_oscillation_percent } percent difference from initial ask price of\n 1 ${ first_ticker } = ${ initial_ask } ${ second_ticker }.`
        console.log(message);
        createInDB(first_ticker, second_ticker, ask, price_oscillation_percent, fetch_interval).catch(e => {
          console.log('There has been a problem with your fetch operation: ' + e.message);
        });
      }
    });
  }

  setInterval(getTicker, parseFloat(fetch_interval));
}

module.exports.bot = getTickers





