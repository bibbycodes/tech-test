const Request = require('./request');
const RequestError = require('./RequestError');

const fetchList = (listOfUrls, ignoreErrors = false) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(listOfUrls)) reject(Error('Invalid argument, must supply input of type array'));
    if (listOfUrls.length == 0) reject(Error('Please provide at least one url'));

    let calls = listOfUrls.map((url) => {
      const request = new Request();
      return request.get(url);
    });

    if (ignoreErrors) resolve(Promise.all(calls));

    Promise.allSettled(calls).then((responsePromises) => {
      resolve(
        responsePromises
          .filter((response) => response.status == 'fulfilled')
          .map((response) => response.value)
      );
    });
  });
};

module.exports = fetchList;
