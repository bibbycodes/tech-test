class Validate {
  static isHttps(url) {
    return url.slice(0, 8) == 'https://';
  }

  static isUrl(url) {
    const pattern = new RegExp(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    );
    return pattern.test(url);
  }

  static isJson(response) {
    return response.headers['content-type'].includes('application/json')
      ? true
      : false;
  }

  static stringIsNull(string) {
    return string == "" || string == null
  }
}

module.exports = Validate;
