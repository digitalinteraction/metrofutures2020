const VercelServerlessApiTests = require('vercel-serverless-tests');

const handler = require('../../api/get-session');

const ApiTest = new VercelServerlessApiTests(handler);

import { cookies, differentCookies } from './common.js';

describe('Test session API', () => {
  describe('When sending an existing cookie', () => {
    it('Should return status code 200 with message body and confirm cookie exists', async () => {

      await ApiTest.testHandler({
        url: 'api/get-session',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cookies
      }
      ,{
        status: 200,
        body: { body: 'Cookie already stored.' },
      });
    });
  });
  describe('When sending an no cookie', () => {
    it('Should return status code 200 with message body and set-cookie header', async () => {

      await ApiTest.testHandler({
        url: 'api/get-session',
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      }
      ,{
        status: 200,
        body: { body: 'Session cookie stored.' },
      });
    });
  });
  describe('When sending an array of different cookies', () => {
    it('Should return status code 200 with message body and set-cookie header', async () => {

      await ApiTest.testHandler({
        url: 'api/get-session',
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
        cookies: differentCookies
      }
      ,{
        status: 200,
        body: { body: 'Session cookie stored.' },
      });
    });
  });
});