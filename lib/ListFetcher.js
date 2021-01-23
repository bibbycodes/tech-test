const Request = require('./request')

const listFetcher = listOfUrls => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(listOfUrls)) reject({error: "Invalid argument, must supply input of type array"})
    if (listOfUrls.length == 0) reject({error: "Please provide at least one url"})

    try {
      let calls = listOfUrls.map(url => {
        const request = new Request()
        return request.get(url)
      })
      resolve(Promise.all(calls))
    } catch(err) {
      reject({error: error.message})
    }
  })
}

module.exports = listFetcher