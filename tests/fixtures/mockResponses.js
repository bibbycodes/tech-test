const jsonResponse = {
    headers : {
        "content-type" : "application/json; charset=utf-8'"
    }
}

const htmlResponse = {
    headers : {
        "content-type" : "text/html; charset=utf-8'"
    },
    data : "<h1>Hello</h1>"
}

module.exports = { jsonResponse, htmlResponse }