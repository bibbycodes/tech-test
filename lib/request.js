class Request {
  constructor() {
  }

  get(url) {
    return new Promise((resolve, reject) => {
      if (url == '') reject({"error": "The Url is invalid"})
      return true
    })
  }
}

module.exports = Request