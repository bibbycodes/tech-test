const Request = require('./request')

request = new Request()
request.get('localhost:3100/api/users')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

// request.get("notvalid/ru").catch(e => console.log(e))