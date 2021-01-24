const { it, describe } = require('@jest/globals');
const fetchList = require('../lib/fetchList');

describe('fetchList', () => {
  beforeEach(() => {
    urls = [
      'http://localhost:3100/api/users',
      'http://localhost:3100/api/users',
      'http://localhost:3100/api/users',
    ];

    urlsOneInvalid = [
      'http://localhost:3100/api/users',
      'http://localhost:3100/api/users',
      'invalid/url',
    ];
  });

  it('returns a promise', () => {
    expect(
      fetchList(['http://localhost:3100/api/users']).then instanceof Function
    ).toBe(true);
  });

  it('rejects when passed an empty array', async () => {
    await fetchList([]).catch((error) => {
      expect(error.message).toEqual('Please provide at least one url');
    });
  });

  it('resolves to an array containing json data when passed an array with valid urls', () => {
    return fetchList(urls).then((responses) => {
      for (let response of responses) {
        expect(typeof JSON.parse(response.data)).toBe('object');
      }
    });
  });

  it('rejects when passed an argument that is not an array', async () => {
    await fetchList(100).catch((error) => {
      expect(error.message).toEqual(
        'Invalid argument, must supply input of type array'
      );
    });

    await fetchList({}).catch((error) => {
      expect(error.message).toEqual(
        'Invalid argument, must supply input of type array'
      );
    });

    await fetchList('[]').catch((error) => {
      expect(error.message).toEqual(
        'Invalid argument, must supply input of type array'
      );
    });
  });

  it('does not reject by default if one of the requests fail', async () => {
    let responses = await fetchList(urlsOneInvalid);
    expect(responses.length).toBe(2);
    for (let response of responses) {
      expect(typeof JSON.parse(response.data)).toBe('object');
    }
  });

  it('rejects if ignoreError is true and one of the urls is invalid', async () => {
    await fetchList(urlsOneInvalid, true).catch((error) => {
      expect(error.message).toBe('The URL is invalid');
    });
  });
});
