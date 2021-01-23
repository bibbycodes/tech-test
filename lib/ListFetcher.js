const Request = require('./request')

const listFetcher = listOfUrls => {
  return new Promise((resolve, reject) => {
    if (listOfUrls.length == 0) reject({error: "Please provide at least one url"})

    let calls = listOfUrls.map(url => {
      const request = new Request()
      return request.get(url)
    })

    resolve(Promise.all(calls))
  })
}

module.exports = listFetcher