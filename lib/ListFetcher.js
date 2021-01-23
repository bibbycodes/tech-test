const listFetcher = listOfUrls => {
  return new Promise((resolve, reject) => {
    if (listOfUrls.length == 0) reject({error: "Please provide at least one url"})
    resolve(true)
  })
}

module.exports = listFetcher