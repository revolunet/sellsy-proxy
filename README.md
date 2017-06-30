# Sellsy proxy

Basic Sellsy API proxy for full client side apps.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revolunet/sellsy-proxy&env=SELLSY_CREDS)

## Usage

Start the server with the environment variable `SELLSY_CREDS` with all the API credentials

```sh
set SELLSY_CREDS='{"consumerKey":"xxx","consumerSecret":"yyy","userToken":"zzz","userSecret":"www"}' npm start
```

This is a stringified JSON of

```json
{
  "consumerKey": "xxx",
  "consumerSecret": "yyy",
  "userToken": "zzz",
  "userSecret": "www",
}
```

## Call Sellsy API from your browser

Using `GET` method, just pass `method` and `params` url query parameters, following Sellsy API docs.

You'll get the raw result from the Sellsy API.

Demo : https://jsbin.com/qerisus

