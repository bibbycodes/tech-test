const Request = require('./request')

const fetchList = (listOfUrls, areMutuallyDependent = false) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(listOfUrls)) reject({error: "Invalid argument, must supply input of type array"})
    if (listOfUrls.length == 0) reject({error: "Please provide at least one url"})

    try {
      let calls = listOfUrls.map(url => {
        const request = new Request()
        return request.get(url)
      })

      if (areMutuallyDependent) {
        resolve(Promise.all(calls))
      }

      resolve(Promise.allSettled(
        calls.filter(response => response.status == "fulfilled ")
             .map(response => response.value))
      )
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = fetchList