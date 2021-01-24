const https = require("https");
const http = require("http");

class Request {
  isHttps(url) {
    return url.slice(0, 8) == "https://";
  }

  makeErrorObject(errorMessage, url, response) {
    return { errorMessage, url, response };
  }

  isUrl(url) {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    );
    return pattern.test(url);
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == "" || url == null) reject(this.makeErrorObject("The Url is empty", url));
      if (!this.isUrl(url))
        reject(this.makeErrorObject("The URL is invalid", url));
      this.isHttps(url) ? (this.fetcher = https) : (this.fetcher = http);
        this.fetcher.get(url, (res) => {
          let data = "";

          res.on("data", (packet) => {
            data += packet;
          });

          res.on("error", (error) => {
            reject(this.makeErrorObject(error.message, url, res));
          });

          res.on("end", () => {
            if (res.headers["content-type"].includes("application/json")) {
              resolve({ data, statusCode: res.statusCode });
            } else {
              reject(
                this.makeErrorObject(
                  "The requested resource is not in json format",
                  url,
                  res
                )
              );
            }
          });
        });
    });
  }
}

module.exports = Request;
