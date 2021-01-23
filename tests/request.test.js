const { it, describe } = require('@jest/globals');
const Request = require('../lib/request')

describe('Request', () => {
  
  describe('get', () => {
    beforeEach(() => {
      request = new Request()
    })

    it('returns a promise', () => {
      expect(request.get('https://jsonplaceholder.typicode.com/todos/1').then instanceof Function).toBe(true)
    })

    it('rejects when passed an empty string', async () => {
      await expect(request.get('')).rejects.toEqual({
        error: "The Url is invalid"
      })
    })

    it('returns json data when fetching from a json endpoint', () => {
      return request.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(data => {
          expect(typeof JSON.parse(data)).toBe('object')
        })
    })

    it('has a status code of 200 on successful retrieval of data', () => {
      return request.get('https://jsonplaceholder.typicode.com/todos/1').then(() => {
        expect(request.statusCode).toBe(200)
      })
    })

    it('has a status code of 404 when fetching from an unknown url', () => {
      return request.get('https://www.gmail.com/hello').then(() => {
        expect(request.statusCode).toBe(404)
      })
    })

    it('can fetch http endpoints', () => {
      return request.get('http://jsonplaceholder.typicode.com/todos/1').then(data => {
        expect(request.statusCode).toBe(200)
        expect(typeof JSON.parse(data)).toBe('object')
      })
    })
    
  })
})