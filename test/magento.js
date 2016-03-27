'use strict';

var assert = require('assert');
var nock = require('nock');
var Magento = require('../lib/magento');
var VERSION = require('../package.json').version;

describe('Magento', function() {

  describe('Constructor', function() {

    describe('new Magento();', function() {

      var defaults = {};

      before(function(){
        defaults = {
          consumer_key: null,
          consumer_secret: null,
          access_token_key: null,
          access_token_secret: null,
          bearer_token: null,
          rest_base: 'https://api.magento.com/1.1',
          stream_base: 'https://stream.magento.com/1.1',
          user_stream_base: 'https://userstream.magento.com/1.1',
          site_stream_base: 'https://sitestream.magento.com/1.1',
          media_base: 'https://upload.magento.com/1.1',
          request_options: {
            headers: {
              'Accept': '*/*',
              'Connection': 'close',
              'User-Agent': 'node-magento/' + VERSION
            }
          }
        };
      });

      it('create new instance', function(){
        var client = new Magento();
        assert(client instanceof Magento);
      });

      it('has default options', function(){
        var client = new Magento();
        assert.equal(
          Object.keys(defaults).length,
          Object.keys(client.options).length
        );
        assert.deepEqual(
          Object.keys(defaults),
          Object.keys(client.options)
        );
      });

      it('accepts and overrides options', function(){
        var options = {
          consumer_key: 'XXXXX',
          power: 'Max',
          request_options: {
            headers: {
              'Accept': 'application/json'
            }
          }
        };

        var client = new Magento(options);

        assert(client.options.hasOwnProperty('power'));
        assert.equal(client.options.power, options.power);

        assert.equal(client.options.consumer_key, options.consumer_key);

        assert.equal(
          client.options.request_options.headers.Accept,
          options.request_options.headers.Accept);
      });

      it('has pre-configured request object', function(next){
        var client = new Magento({
          request_options: {
            headers: {
              foo: 'bar'
            }
          }
        });

        assert(client.hasOwnProperty('request'));

        nock('http://node.magento').get('/').reply(200);
        client.request.get('http://node.magento/', function(error, response){

          var headers = response.request.headers;

          assert(headers.hasOwnProperty('foo'));
          assert(headers.foo, 'bar');

          assert.equal(headers['User-Agent'], 'node-magento/' + VERSION);
          assert(headers.hasOwnProperty('Authorization'));
          assert(headers.Authorization.match(/^OAuth/));

          next();
        });


      });
    });
  });

  describe('Prototypes', function() {
    describe('prototype.__buildEndpoint();', function() {
      var client;

      before(function(){
        client = new Magento({});
      });

      it('method exists', function(){
        assert.equal(typeof client.__buildEndpoint, 'function');
      });

      it('build url', function(){
        var path = 'statuses';
        var endpoint = 'https://stream.magento.com/1.1/statuses';

        assert.throws(
          client.__buildEndpoint,
          Error
        );

        assert.equal(
          client.__buildEndpoint(path),
          client.options.rest_base + '/' + path + '.json'
        );

        assert.equal(
          client.__buildEndpoint(path + '.json'),
          client.options.rest_base + '/' + path + '.json'
        );

        assert.equal(
          client.__buildEndpoint('/' + path),
          client.options.rest_base + '/' + path + '.json'
        );

        assert.equal(
          client.__buildEndpoint(path + '/'),
          client.options.rest_base + '/' + path + '.json'
        );

        assert.equal(
          client.__buildEndpoint(path, 'media'),
          client.options.media_base + '/' + path + '.json'
        );

        assert.equal(
          client.__buildEndpoint(endpoint),
          endpoint + '.json'
        );

        assert.equal(
          client.__buildEndpoint(endpoint),
          endpoint + '.json'
        );
      });
    });

    describe('prototype.__request();', function() {
    });

    describe('prototype.__get();', function() {
    });

    describe('prototype.__post();', function() {
    });

    describe('prototype.__stream();', function() {
    });
  });

});
