# Sellsy proxy

Basic Sellsy API proxy; add CORS for full client side apps.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revolunet/sellsy-proxy&env=CONSUMER_KEY&env=CONSUMER_SECRET)

Server is deployed with `consumer` oauth keys and client must give its sellsy oauth token in each request.

## Usage

Start the server with all the consumer API keys as environment variables

```sh
set CONSUMER_KEY="xxx";
set CONSUMER_SECRET="xxx";
npm start
```

## Call Sellsy API from your browser

There are two ways to query the sellsy API :

### Default : "transparent" proxy

Replace the default sellsy API endpoint with your proxy URL and it will relay all calls.

Also works with [node-sellsy](https://github.com/revolunet/node-sellsy) `endPoint` parameter.

### via /GET

Using `GET` method, pass `method` and `params` url query parameters, following Sellsy API docs.

`params` must be URL encoded.

Also add oauth headers for the proxy :

```js
// call to the API
const makeProxyRequest = ({ endPoint, method, params }) => {
  // create the proxy URL
  var urlParams = encodeURIComponent(params);
  // build url for the proxy
  var url = `${endPoint}?method=${method}&params=${urlParams}`;
  // use native fetch API and convert to JSON
  var request = new Request(url, {
    headers: new Headers({
      'X-USER-TOKEN': 'aaa',
      'X-USER-SECRET': 'bbb',
    }),
    mode: 'cors'
  });
  return fetch(request).then(r => r.json()).catch(e => {
    console.log('e', e);
    throw e;
  });
};

makeProxyRequest({
  endPoint: 'http://127.0.0.1:8282',
  method: 'Document.getList',
  params: JSON.stringify({
    doctype: 'invoice',
    search: {
      contains: 'test',
    },
  }),
}).then(data => {
  console.log(data);
});
```

You'll get the raw result from the Sellsy API.

Demo : https://jsbin.com/qerisus


## See also

 - [node-sellsy](http://github.com/revolunet/node-sellsy)