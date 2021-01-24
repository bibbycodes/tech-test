class RequestError extends Error {
    constructor(url, response, ...params) {
        super(...params)
        this.url = url
        this.response = response || ''
    }
}

module.exports = RequestError;