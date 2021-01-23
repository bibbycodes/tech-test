const https = require('https');

class Request {
  constructor() {
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
          throw Error(error.message)
        })

        res.on('end', () => {
          resolve(data)
        })

      })
    })
  }
}

module.exports = Request