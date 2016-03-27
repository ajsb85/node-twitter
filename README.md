# Magento for Node.js

An asynchronous client library for the Magento [REST](http://devdocs.magento.com/guides/v2.0/get-started/rest_front.html) API.

[![wercker status](https://app.wercker.com/status/xxx/s/master "wercker status")](https://app.wercker.com/project/bykey/xxx) [![NPM](https://nodei.co/npm/magento-rest.png?mini=true)](https://nodei.co/npm/magento-rest/)

```javascript
var Magento = require('magento-rest');

var client = new Magento({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, products, response){
  if (!error) {
    console.log(products);
  }
});
```

## Installation

`npm install Magento`

## Quick Start

You will need valid Magento developer credentials in the form of a set of consumer and access tokens/keys.  You can get these [here](https://apps.magento.com/).  Do not forgot to adjust your permissions - most POST request require write permissions.

```javascript
var Magento = require('magento-rest');
```

## For User based authetication:

```javascript
var client = new Magento({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
```

Add your credentials accordingly.  I would use environment variables to keep your private info safe.  So something like:

```javascript
var client = new Magento({
  consumer_key: process.env.MAGENTO_CONSUMER_KEY,
  consumer_secret: process.env.MAGENTO_CONSUMER_SECRET,
  access_token_key: process.env.MAGENTO_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.MAGENTO_ACCESS_TOKEN_SECRET,
});
```
## For Application Only based authetication:

You will need to fetch a bearer token from Magento as documented [Here](https://dev.magento.com/oauth/application-only), once you have it you can use it as follows.

```javascript
var client = new Magento({
  consumer_key: '',
  consumer_secret: '',
  bearer_token: ''
});
```

Add your credentials accordingly.  I would use environment variables to keep your private info safe.  So something like:

```javascript
var client = new Magento({
  consumer_key: process.env.MAGENTO_CONSUMER_KEY,
  consumer_secret: process.env.MAGENTO_CONSUMER_SECRET,
  bearer_token: process.env.MAGENTO_BEARER_TOKEN,
});
```

NB - You will not have access to all endpoints whilst using Application Only authentication, but you will have access to higher API limits.

## Requests

You now have the ability to make GET and POST requests against the API via the convenience methods.

```javascript
client.get(path, params, callback);
client.post(path, params, callback);
client.stream(path, params, callback);
```

## REST API

You simply need to pass the endpoint and parameters to one of convenience methods.  Take a look at the [documentation site](https://dev.magento.com/rest/public) to reference available endpoints.

Example, lets get a [list of favorites](https://dev.magento.com/rest/reference/get/favorites/list):

```javascript
client.get('favorites/list', function(error, products, response){
  if(error) throw error;
  console.log(products);  // The favorites.
  console.log(response);  // Raw response object.
});
```

How about an example that passes parameters?  Let's  [tweet something](https://dev.magento.com/rest/reference/post/statuses/update):

```javascript
client.post('statuses/update', {status: 'I Love Magento'},  function(error, tweet, response){
  if(error) throw error;
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
```

## Streaming API

Using the `stream` convenience method, you to open and manipulate data via a stream piped directly from one of the streaming API's. Let's see who is talking about javascript:

```javascript
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
```

## Examples

* [Tweet](https://github.com/ajsb85/node-magento-rest/tree/master/examples#tweet)
* [Search](https://github.com/ajsb85/node-magento-rest/tree/master/examples#search)
* [Streams](https://github.com/ajsb85/node-magento-rest/tree/master/examples#streams)
* [Proxy](https://github.com/ajsb85/node-magento-rest/tree/master/examples#proxy)
* [Media](https://github.com/ajsb85/node-magento-rest/tree/master/examples#media)

## Contributors

Maintained by  [@ajsb85](http://github.com/ajsb85)

Based on Twitter, authored by  [@technoweenie](http://github.com/technoweenie)
 and maintained by [@jdub](http://github.com/jdub)

Twitter is currently maintained by [@desmondmorris](http://github.com/desmondmorris)

[And we cannot forget the community](https://github.com/ajsb85/node-magento-rest/graphs/contributors)


## LICENSE

magento-rest: Copyright (c) 2016 Alexander J. Salas B.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
