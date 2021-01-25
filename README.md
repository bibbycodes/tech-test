##

<h1 align=center>Robert Griffith Mid Level Software Engineer Tech Test </h1>

<div align="center">

[Installation ](#installation) |
[Usage ](#usage) | 
[Tests ](#tests) |
[Approach](#Approach)

</div>

## Installation

#### Global Install
`npm install -g @bibbycodes/fetch-list`

#### Local Install
`npm install --save @bibbycodes/fetch-list`

## Usage

`fetchList` returns a promise containing an array of raw json data

```javascript
// import
const fetchList = require('@bibbycodes/fetch-list');

// declare urls to be fetched
const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

// Using Promises, fetch a list of Json endpoints
fetchList(urls).then((responses) => {
  for (response of responses) {
    console.log(response.data);
  }
});
```

`fetchList` gives you the flexiblity to ignore cases when a response fails. This is the behaviour by default. In these cases the function only returns the urls that resolved successfully.

This can be useful in scenarios where you would not want one failed response to jeopardize the rest of the call.

```javascript
const urls2 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'invalid url',
];

fetchList(urls).then((responses) => {
  for (response of responses) {
    console.log(response.data);
  }
});
```

This behaviour can be overriden by passing `ignoreErrors = false`. This will cause the promise to reject should any of the urls be invalid. This can be useful in cases where each call is dependant on the other calls.

```javascript
const urls2 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'invalid url',
];

// An error occurs because one of the urls is incorrect and ignoreErrors is set to false
fetchList(urls2, (ignoreErrors = false))
  .then((responses) => {
    for (response of responses) {
      console.log(response.data);
      }
  })
  .catch(() => console.log("Oops, an error occurred, one of the urls was invalid!"))
```
`fetchList` expects that urls return json data. As such html or xml will cause the function to fail if `ignoreErrors` is set to `true` and will be ignored if set to `false`.

```javascript
const urls3 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://gmail.com',
];

// An error occurs because one of the urls returns html and ignoreErrors is set to false
fetchList(urls3, (ignoreErrors = false))
  .then((responses) => {
    for (response of responses) {
      console.log(response.data);
      }
  })
  .catch(() => console.log("Oops, an error occurred, one of the urls did not return json data!"))
```

## Tests

To run the tests you should first clone this repo

`git clone git@github.com:bibbycodes/tech-test.git`

Then cd into the directory

`cd tech-test`

The tests rely on a mock Http server that must be started before tests can be run.

`node tests/mockHttpServer.js`

You can then run `npm test`. Doing so will give you the results of the unit tests along with test coverage information.

```
 PASS  tests/request.test.js
  Request
    get
      ✓ returns a promise (8 ms)
      ✓ rejects when passed an empty string (5 ms)
      ✓ rejects when passed null (1 ms)
      ✓ returns json data when fetching from a json endpoint (12 ms)
      ✓ has a status code of 200 on successful retrieval of data (3 ms)
      ✓ has a status code of 404 when fetching from an unknown url (3 ms)
      ✓ can fetch https endpoints (159 ms)
      ✓ rejects if the endpoint is not json (5 ms)
      ✓ rejects on an invalid url (1 ms)
    isHttps
      ✓ returns true when the url is https://www.google.com
      ✓ returns false when the url is http://www.google.com
    isValidURL
      ✓ returns true when passed a valid url
      ✓ returns false when passed notvalid/ru
      ✓ returns true when passed 127.0.0.1

 PASS  tests/fetchList.test.js
  fetchList
    ✓ returns a promise (1 ms)
    ✓ rejects when passed an empty array (1 ms)
    ✓ resolves to an array containing json data when passed an array with valid urls (5 ms)
    ✓ rejects when passed an argument that is not an array (1 ms)
    ✓ does not reject by default if one of the requests fail (5 ms)
    ✓ rejects if ignoreError is false and one of the urls is invalid (2 ms)

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   97.73 |      100 |   93.33 |     100 |                   
 RequestError.js |     100 |      100 |     100 |     100 |                   
 fetchList.js    |     100 |      100 |     100 |     100 |                   
 request.js      |   95.65 |      100 |    87.5 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```
### Integration tests

You can also run the integration tests with the command `node tests/integration-test.js`
This runs the code in realistic scenarios:
```bash
Test 3 => Success: Got Error!
Test 5 => Success: Got Error!
Test 2 => Success: Got Response
Test 1 => Success: Got Error!
Test 4 => Success: Got Responses!
Test 6 => Success: Got Error!
```
## Approach
This package was written using TDD. 

The task was to: 

    "Write a javaScript package that is able to:
    - fetch an array of URLS
    - return their contents in a promise."

My first thought was that packages should be light-weight and as such dependencies should be minimized, if not eliminated all together. As such, all of the code is native node with no third party dependencies.

### The Request Class

The first thing I got to working on was a class that would be able to make a single `GET` request and return that in a promise. The `Request` class is the heart of this package.

The `Request` class is made up of three functions. `isHttps`, `isUrl` and `get`. 

`isHttps` returns true if a given url is using the https protocol and false if not. Since we are using Node's `https` and `http` module we need to be able to dynamically switch between the packages to make calls depending on the result of this function.

`isUrl` uses regex to validate the input. If the input is not a valid URL, the function returns false. Use of this function along with some basic null checking ensures that the input is correctly validated.

```javascript
if (url == "" || url == null) reject(new RequestError(url, null, "The Url is empty"));
if (!this.isUrl(url)) reject(new RequestError(url, null, "The URL is invalid"));
```

`get` is the heart of the class. It returns json data for a single url if the url is valid and the returned data is of type json.

#### Other considerations

The Request class does not contain state. This means that it doesn't really have to be a class at all. I decided to keep it as such in order to make it easier to extend should one decide to add a `post` function for instance. Keeping it as a class makes things easier to manage should one decide to increase the complexity of the functionality.

### fetchList

`fetchList` is a wrapper function that allows you to make several, concurrent, asynchronous requests simultaneously and returns the results in a promise containing an array. It takes in an array of urls as the first argument and a boolean value, `ignoreErrors` as the second.

If `ignoreErrors` is set to `true`, the function will only return promises that resolve. A failed call will not stop other successful calls from returning. When set to false, any of the calls rejecting will result in the function rejecting also. I personally believe that there are valid situations in which you would want either behaviour to occur and as such I decided to give the user the option to choose which behaviour best suited their preferences.



