const https = require("https");
const http = require("http");
const RequestError = require('./RequestError');
const { throws } = require("assert");

class Request {
  isHttps(url) {
    return url.slice(0, 8) == "https://";
  }

  isUrl(url) {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    );
    return pattern.test(url);
  }

  isJson(response) {
    return (response.headers["content-type"].includes("application/json") ? true : false);
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == "" || url == null) reject(new RequestError(url, null, "The Url is empty"));
      if (!this.isUrl(url)) reject(new RequestError(url, null, "The URL is invalid"));
      
      this.isHttps(url) ? (this.fetcher = https) : (this.fetcher = http);
        this.fetcher.get(url, (res) => {
          let data = "";

          res.on("data", (packet) => data += packet);

          res.on("error", (error) => reject(new RequestError(url, res, error)));

          res.on("end", () => {
            if (this.isJson(res)) {
              resolve({ data, statusCode: res.statusCode });
            } 
            reject(new RequestError(url, res, "The requested resource is not in json format"));
          });
        });
    });
  }
}

module.exports = Request;
