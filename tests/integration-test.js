const fetchList = require('../lib/fetchList');

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

const urls2 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'invalid url',
];

const urls3 = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://gmail.com',
];

fetchList(['http://google.com'], false)
  .then(() => console.log("Test 1 => Fail: Got Response!"))
  .catch(() => console.log("Test 1 => Success: Got Error!"));

fetchList(urls)
  .then(() => console.log("Test 2 => Success: Got Response!"))
  .catch(() => console.log("Test 2 => Fail: Got Error!"));

fetchList(urls2, false)
  .then(() => console.log("Test 3 => Fail: Got Response!"))
  .catch(() => console.log("Test 3 => Success: Got Error!"));

fetchList(urls2)
  .then(() => console.log("Test 4 => Success: Got Response!"))
  .catch(() => console.log("Test 4 => Fail: Got Error"));

fetchList(urls2, (ignoreErrors = false))
  .then(() => console.log("Test 5 => Fail: Got Response"))
  .catch(() => console.log("Test 5 => Success: Got Error!"))

fetchList(urls3, (ignoreErrors = false))
  .then(() => console.log("Test 6 => Fail: Got Response"))
  .catch(() => console.log("Test 6 => Success: Got Error!"))