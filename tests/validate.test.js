const { it, describe, expect } = require('@jest/globals');
const { jsonResponse, htmlResponse } = require('./fixtures/mockResponses');
const Validate = require('../lib/Validate');

describe('Validate', () => {
  describe('isHttps', () => {
    it('returns true when the url is https://www.google.com', () => {
      expect(Validate.isHttps('https://www.google.com')).toBe(true);
    });

    it('returns false when the url is http://www.google.com', () => {
      expect(Validate.isHttps('http://www.google.com')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('returns true when passed a valid url', () => {
      expect(Validate.isUrl('https://www.google.com')).toBe(true);
    });

    it('returns false when passed notvalid/ru', () => {
      expect(Validate.isUrl('notvalid/ru')).toBe(false);
    });

    it('returns true when passed 127.0.0.1', () => {
      expect(Validate.isUrl('https://127.0.0.1')).toBe(true);
    });
  });

  describe('isValidURL', () => {
    it('returns true when passed a valid url', () => {
      expect(Validate.isUrl('https://www.google.com')).toBe(true);
    });

    it('returns false when passed notvalid/ru', () => {
      expect(Validate.isUrl('notvalid/ru')).toBe(false);
    });

    it('returns true when passed 127.0.0.1', () => {
      expect(Validate.isUrl('https://127.0.0.1')).toBe(true);
    });
  });

  describe('isJsonData', () => {
    it('returns true when passed a json object', () => {
      expect(Validate.isJson(jsonResponse)).toBe(true);
    });

    it('returns false when passed an html object', () => {
      expect(Validate.isJson(htmlResponse)).toBe(false);
    });
  });
});
