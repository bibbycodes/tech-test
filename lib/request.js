const https = require('https');
const http = require('http')

class Request {
  constructor() {
    this.statusCode
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode
  }

  isHttps(url) {
    return url.slice(0, 8) == "https://"
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == '') reject({"error": "The Url is invalid"})
      this.isHttps(url) ? this.fetcher = https : this.fetcher = http
      
      try {
        this.fetcher.get(url, res => {
          let data = ''
  
          res.on('data', packet => {
            data += packet
          })
          
          res.on('error', (error) => {
            throw Error(error)
          })
          
          res.on('end', () => {
            this.setStatusCode(res.statusCode)
            if (res.headers['content-type'].includes('application/json')) {
              resolve(data)
            } else {
              console.log("error")
              reject({"error": "The requested resource is not in json format"})
            }
          })

        })
      } catch (err) {
        
      }
    })
  }
}

module.exports = Request