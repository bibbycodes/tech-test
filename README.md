##

<h1 align=center>Robert Griffith Mid Level Software Engineer Tech Test/h1>

<div align="center">

[Installation ](#installation) - [Usage ](#usage) 

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