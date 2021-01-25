const https = require("https");
const http = require("http");
const RequestError = require('./RequestError');
const Validate = require('./Validate')

class Request {
  chooseFetcher(url) {
    return Validate.isHttps(url) ? https : http;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (Validate.isNullString(url)) reject(new RequestError(url, null, "The Url is empty"));
      if (!Validate.isUrl(url)) reject(new RequestError(url, null, "The URL is invalid"));
      
      const fetcher = this.chooseFetcher(url)
        fetcher.get(url, (res) => {
          let data = "";

          res.on("data", (packet) => data += packet);

          res.on("error", (error) => reject(new RequestError(url, res, error)));

          res.on("end", () => {
            if (Validate.isJson(res)) {
              resolve({ data, statusCode: res.statusCode });
            } 
            reject(new RequestError(url, res, "The requested resource is not in json format"));
          });
        });
    });
  }
}

module.exports = Request;
