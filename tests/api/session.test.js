const VercelServerlessApiTests = require('vercel-serverless-tests');

const handler = require('../../api/get-session');

const ApiTest = new VercelServerlessApiTests(handler);

import { cookies } from './common.js';

describe('Test session API', () => {
  describe('When try the It Block', () => {
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
});