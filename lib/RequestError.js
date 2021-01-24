class RequestError extends Error {
    constructor(url, response, message, ...params) {
        super(...params)

        this.url = url
        this.response = response
        this.message = message
    }
}