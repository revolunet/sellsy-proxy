# Sellsy proxy

Basic Sellsy API proxy for full client side apps.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revolunet/sellsy-proxy&env=CONSUMER_KEY&env=CONSUMER_SECRET&env=USER_TOKEN&env=USER_SECRET)

## Usage

Start the server  with all the API credentials as environment variables

```sh
set CONSUMER_KEY="xxx";
set CONSUMER_SECRET="xxx";
set USER_TOKEN="xxx";
set USER_SECRET="xxx";
npm start
```


## Call Sellsy API from your browser

Using `GET` method, just pass `method` and `params` url query parameters, following Sellsy API docs.

You'll get the raw result from the Sellsy API.

Demo : https://jsbin.com/qerisus

