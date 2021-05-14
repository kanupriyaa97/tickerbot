# Tickerbot

The requirements of this project were as listed:

Phase 2 (mandatory)
● The bot must connect to Uphold public ticker and retrieve the BTC-USD rate every 5 seconds. Each time the bot retrieves a new rate, the bot must compare it with the first one and decide if it should alert of an oscillation. For the purpose of this exercise the bot alerts if the price changes 0.01 percent in either direction (price goes up or down).

Phase 2 (optional)
● Handle multiple currency pairs at the same time.
● Accept all the parameters (currency pairs, fetch interval, price oscillation percentage,
etc.) as arguments.
● Create a test suite for your code (e.g. jest or mocha).

Phase 3 (bonus)
● Dockerize your application.
● Create a database to store all the alerts generated (e.g. Postgres).
○ Persist all the information that you consider relevant (e.g. timestamps, rate, bot
configuration at the time of the alert, etc.)

# Instructions for running with Docker
Clone the repo onto your local machine.
```
git clone https://github.com/kanupriyaa97/tickerbot.git
```

Navigate to the root directory with the package.json file and install npm.
```
cd tickerbot
npm install
```

Run the bot Docker image with Postgres:
```
docker build -t tickerbot .
docker compose up
```

Run the jest tests:
```
docker-compose run tickerbot npm test 
```

Once the containers are running - open [http://localhost:3000/](http://localhost:3000/) and enter the corresponding arguments needed. Once you have submitted the parameters the bot will begin monitoring the ticker pair. If there are any price warnings they will be shown in stdout.

You can refresh [http://localhost:3000/](http://localhost:3000/) as many times as you would like and enter as many ticker pairs you would like. Warnings for all ticker pairs will show on stdout. 

All warnings will be persisted to the Postgres database. You can look at the data in the table by following the instructions in this link: [https://dev.to/shree_j/how-to-install-and-run-psql-using-docker-41j2](https://dev.to/shree_j/how-to-install-and-run-psql-using-docker-41j2)

# Instructions for running each ticker pair on new terminal
Uncomment lines 58-61 in bot/bot.js which will allow the params to be inputted from stdin. Modify code accordingly to use the data coming in from stdin. Each new terminal can use a new ticker pair. Please only do this if you are familiar with Node JS.


