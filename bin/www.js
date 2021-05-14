const request = require('request');
const readline = require('readline');
const database  = require('../database')

var first_ticker;
var second_ticker;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const inputFirstTicker = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the ticker for 1st currency:\n', (answer) => {
      resolve(answer);
    })
  })
}

const inputSecondTicker = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the ticker for 2nd currency:\n', (answer) => {
      resolve(answer);
    })
  })
}

const inputInterval = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the time interval for GET:\n', (answer) => {
      resolve(answer);
    })
  })
}

const inputPercentage = () => {
  return new Promise((resolve, reject) => {
    rl.question('Enter the oscillation percent:\n', (answer) => {
      resolve(answer);
    })
  })
}

const createInDB = async (ask) => {
  let c = await database.Oscillation.create({
    first_ticker: first_ticker,
    second_ticker: second_ticker,
    rate: fetch_interval,
    percent: price_oscillation_percent,
    alerted_ask_price: ask
  });
  return c
}

var upper_limit;
var lower_limit;
var fetch_interval;
var price_oscillation_percent;

const getTickers = async () => {
  first_ticker = await inputFirstTicker();
  second_ticker = await inputSecondTicker();
  fetch_interval = await inputInterval();
  price_oscillation_percent = await inputPercentage()

  request(`https://api.uphold.com/v0/ticker/${ first_ticker }-${ second_ticker }`, function (error, response, body) {
    if (error)
      console.error('error:', error);
    const first_obj = JSON.parse(body);
    const percent = parseFloat(first_obj.ask) * price_oscillation_percent/100;
    upper_limit = parseFloat(first_obj.ask) + percent;
    lower_limit = parseFloat(first_obj.ask) - percent;
  });

  const getTicker = async function getTicker() {
    let ask;

    // Get data from public ticker
    request(`https://api.uphold.com/v0/ticker/${ first_ticker }-${ second_ticker }`, function (error, response, body) {
      if (error)
        console.error('error:', error);
      let obj = JSON.parse(body);
      ask = parseFloat(obj.ask);

      //Check if limit is exceeded and persist to db
      if (ask > upper_limit || ask < lower_limit ) {
        console.log(`WARNING: Ask price = ${ ask } is more than ${ price_oscillation_percent }
                percent changed from initial values of ${ lower_limit } , ${ upper_limit }`);

        // createInDB(ask).catch(e => {
        //   console.log('There has been a problem with your fetch operation: ' + e.message);
        // });
      }
    });
  }

  setInterval(getTicker, parseFloat(fetch_interval));
}
getTickers()


