const Request = require('../lib/request')
const fetchList = require('../lib/fetchList')

request = new Request()
request.get('https://localhost:3100/api/users')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

const urls = [
    'http://localhost:3100/api/users', 
    'http://localhost:3100/api/users', 
    'http://localhost:3100/api/users'
  ]

fetchList(urls).catch()
request.get("notvalid/ru").catch(e => console.log(e))