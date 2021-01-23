const { it, describe } = require('@jest/globals');
const listFetcher = require('../lib/ListFetcher')

describe('listFetcher', () => {
  it('returns a promise', () => {
    expect(listFetcher(['http://localhost:3100/api/users']).then instanceof Function).toBe(true)
  })

  it('rejects when passed an empty array', async () => {
    await expect(listFetcher([])).rejects.toEqual({
      error: "Please provide at least one url"
    })
  })

  it('resolves to an array containing json data when passed an array with valid urls', () => {
    const urls = [
      'http://localhost:3100/api/users', 
      'http://localhost:3100/api/users', 
      'http://localhost:3100/api/users'
    ]
    return listFetcher(urls).then(data => {
      for (let datum of data) {
        expect(typeof JSON.parse(datum)).toBe('object')
      }
    })
  })
})