const { it, describe } = require('@jest/globals');

const Request = require('../lib/request')

describe('Request', () => {
  
  describe('get', () => {
    beforeEach(() => {
      request = new Request()
    })

    it('returns a promise', () => {
      expect(request.get('http://localhost:3100/api/users').then instanceof Function).toBe(true)
    })

    it('rejects when passed an empty string', async () => {
      await expect(request.get('')).rejects.toEqual({
        error: "The Url is invalid"
      })
    })

    it('returns json data when fetching from a json endpoint', () => {
      return request.get('http://localhost:3100/api/users')
        .then(data => {
          expect(typeof JSON.parse(data)).toBe('object')
        })
    })

    it('has a status code of 200 on successful retrieval of data', () => {
      return request.get('http://localhost:3100/api/users').then(() => {
        expect(request.statusCode).toBe(200)
      })
    })

    it('has a status code of 404 when fetching from an unknown url', async () => {
      await expect(request.get('http://localhost:3100/unknown')).rejects.toEqual({
        error: "The requested resource is not in json format"
      })
      expect(request.statusCode).toBe(404)
    })

    it('can fetch https endpoints', () => {
      return request.get('https://jsonplaceholder.typicode.com/todos/1').then(data => {
        expect(request.statusCode).toBe(200)
        expect(typeof JSON.parse(data)).toBe('object')
      })
    })

    it('rejects if the endpoint is not json', async () => {
      await expect(request.get('http://localhost:3100/index')).rejects.toEqual({
        error: "The requested resource is not in json format"
      })
    })
  })

  describe('isHttps', () => {
    it('returns true when the url is https://www.google.com', () => {
      expect(request.isHttps('https://www.google.com')).toBe(true)
    })

    it('returns false when the url is http://www.google.com', () => {
      expect(request.isHttps('http://www.google.com')).toBe(false)
    })
  })
})