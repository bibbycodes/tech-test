const { it, describe } = require('@jest/globals');
const Request = require('../lib/request')

describe('Request', () => {
  describe('get', () => {
    it('returns a promise', () => {
      const request = new Request()
      expect(request.get('https://jsonplaceholder.typicode.com/todos/1').then instanceof Function).toBe(true)
    })

    it('rejects when passed an empty string', async () => {
      const request = new Request()
      await expect(request.get('')).rejects.toEqual({
        error: "The Url is invalid"
      })
    })
  })
})