const https = require('https');

class Request {
  constructor() {
    this.statusCode
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == '') reject({"error": "The Url is invalid"})
      https.get(url, res => {
        let data = ''

        res.on('data', packet => {
          data += packet
        })

        res.on('error', (error) => {
          throw Error(error)
        })

        res.on('end', () => {
          this.setStatusCode(res.statusCode)
          resolve(data)
        })
      })
    })
  }
}

module.exports = Request