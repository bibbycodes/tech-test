const https = require("https");
const http = require("http");
const url = require("url");

class Request {
  isHttps(url) {
    return url.slice(0, 8) == "https://";
  }

  makeErrorObject(errorMessage, url, response) {
    return { errorMessage, url, response };
  }

  isUrl(url) {
    const pattern = new RegExp(
      "^((ft|htt)ps?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?" +
        "(\\/[-a-z\\d%@_.~+&:]*)*" +
        "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return pattern.test(url);
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == "") reject(this.makeErrorObject("The Url is invalid", url));
      this.isHttps(url) ? (this.fetcher = https) : (this.fetcher = http);

      try {
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
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Request;
