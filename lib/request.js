const https = require('https');
const http = require('http')

class Request {
  isHttps(url) {
    return url.slice(0, 8) == "https://"
  }

  makeErrorObject(errorMessage, url, response) {
    return { errorMessage, url, response }
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == '') reject(this.makeErrorObject("The Url is invalid", url))
      this.isHttps(url) ? this.fetcher = https : this.fetcher = http
      
      try {
        this.fetcher.get(url, res => {
          let data = ''
  
          res.on('data', packet => {
            data += packet
          })
          
          res.on('error', (error) => {
            reject(this.makeErrorObject(error.message, url, res))
          })
          
          res.on('end', () => {
            if (res.headers['content-type'].includes('application/json')) {
              resolve({ data, statusCode: res.statusCode })
            } else {
              reject(this.makeErrorObject("The requested resource is not in json format", url, res))
            }
          })

        })
      } catch (err) {
        console.log("catching")
        console.log(err)
      }
    })
  }
}

module.exports = Request