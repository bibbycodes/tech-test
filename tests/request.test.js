const { it, describe, expect } = require('@jest/globals');

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
      await request.get('').catch(e => {
        expect(e.message).toEqual("The Url is empty")
      })
    })

    it('rejects when passed null', async () => {
      await request.get().catch(e => {
        expect(e.message).toEqual("The Url is empty")
      })
    })

    it('returns json data when fetching from a json endpoint', () => {
      return request.get('http://localhost:3100/api/users')
        .then(response => {
          expect(typeof JSON.parse(response.data)).toBe('object')
        })
    })

    it('has a status code of 200 on successful retrieval of data', () => {
      return request.get('http://localhost:3100/api/users')
        .then(response => {
          expect(response.statusCode).toBe(200)
        })
    })

    it('has a status code of 404 when fetching from an unknown url', async () => {
      await request.get('http://localhost:3100/unknown')
        .catch(e => {
          expect(e.message).toEqual("The requested resource is not in json format")
          expect(e.response.statusCode).toBe(404)
        })
    })

    it('can fetch https endpoints', () => {
      return request.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
        expect(response.statusCode).toBe(200)
        expect(typeof JSON.parse(response.data)).toBe('object')
      })
    })

    it('rejects if the endpoint is not json', async () => {
      await request.get('http://localhost:3100/index').catch(e => {
        expect(e.message).toEqual("The requested resource is not in json format")
      })
    })

    it('rejects on an invalid url', async () => {
      await request.get("not valid/ru").catch(e => {
        expect(e.message).toBe("The URL is invalid")
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

  describe('isValidURl', () => {
    it('returns true when passed a valid url', () => {
      expect(request.isUrl('https://www.google.com')).toBe(true)
    })

    it('returns false when passed notvalid/ru', () => {
      expect(request.isUrl("notvalid/ru")).toBe(false)
    })

    it('returns true when passed 127.0.0.1', () => {
      expect(request.isUrl('https://127.0.0.1')).toBe(true)
    })
  })

})