const { it, describe } = require('@jest/globals');
const listFetcher = require('../lib/ListFetcher')

describe('listFetcher', () => {
  it('returns a promise', () => {
    expect(listFetcher(['http://localhost:3100/api/users']).then instanceof Function).toBe(true)
  })
})