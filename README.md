# KoinX Backend Assessment

Here is the submission for KoinX backend assessment.


# Tasks

## Task-1

There is a cronjob running in background which fetches the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database. This job runs once every 2 hours.



## Task-2

There is an endpoint /stats where you can fetch the latest data about the requested cryptocurrency.

Query params looks like:

```javascript

{
	coin: `bitcoin` // Could be one of these 3 (bitcoin, matic-network or ethereum)
}

```

Sample response:

```javascript

{
	price: 40000,
	marketCap: 800000000,
	"24hChange": 3.4
}

``` 

Sample request URL will be : https://koinx-assessment-shivamgupta.onrender.com/stats?coin=bitcoin


## Task-3

There is an endpoint /deviation where you can fetch the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

Query params looks like:

```javascript

{
	coin: `bitcoin` // Could be one of these 3 (bitcoin, matic-network or ethereum)
}

```

Sample response:

```javascript

{
	deviation: 4082.48
}

``` 

Sample request URL will be : https://koinx-assessment-shivamgupta.onrender.com/deviation?coin=bitcoin
