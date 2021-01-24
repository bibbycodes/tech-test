##

<h1 align=center>Robert Griffith Mid Level Software Engineer Tech Test/h1>

<div align="center">

[Installation ](#installation) - [Usage ](#usage) - [Tests ](#tests) 

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

// An error occurs because one of the urls is incorrect
fetchList(urls, (ignoreErrors = false))
  .then((responses) => {
    for (response of responses) {
      console.log(response.data);
      }
  })
  .catch(() => console.log("Oops, an error occurred))
```
`fetchList` expects that urls return json data. As such html or xml will cause the function to fail if `ignoreErrors` is set to `true` and will be ignored if set to `false`.

```javascript
const urls3 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://gmail.com',
];

// An error occurs because one of the urls returns html and ignoreErrors is set to false
fetchList(urls, (ignoreErrors = false))
  .then((responses) => {
    for (response of responses) {
      console.log(response.data);
      }
  })
  .catch(() => console.log("Oops, an error occurred))
```

## Tests

To run the tests you should first clone this repo

`git clone git@github.com:bibbycodes/tech-test.git`

Then cd into the directory

`cd tech-test`

Then run `npm test`. This will give you the results of the unit tests along with test coverage information.
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