import { cookies, validImgInput, invalidImgInput } from './common.js';
const VercelServerlessApiTests = require('vercel-serverless-tests');

const handler = require('../../api/images/image');

const ApiTest = new VercelServerlessApiTests(handler);

describe('Test image API', () => {
  describe('When try request image', () => {
    it('Should return status code 200 with URL and options in body', async () => {

        await ApiTest.testHandler({
            url: 'api/images/image',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cookies,
            queries: validImgInput,
        }
        ,{
            status: 200,
            body: { 
              url: 'https://cdn.metrofutures.org.uk/conf/Camera4_1_1_0_3_0_1_1.jpg',
              options: {
                'cam': '4',
                'o1': '1',
                'o2': '1',
                'o3': '0',
                'o4': '3',
                'o5': '0',
                'o6': '1',
                'o7': '1',
              },
            },
        });
    });
    it('Should return status code 400 with error due to malformed options', async () => {

      await ApiTest.testHandler({
          url: 'api/images/image',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: invalidImgInput,
      }
      ,{
          status: 400,
          body:  'Incorrectly formatted',
      });
    });
    it('Should return status code 400 with error due to missing cam option', async () => {

      await ApiTest.testHandler({
          url: 'api/images/image',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: {
            'o1' : validImgInput.o1,
            'o2' : validImgInput.o2,
            'o3' : validImgInput.o3,
            'o4' : validImgInput.o4,
            'o5' : validImgInput.o5,
            'o6' : validImgInput.o6,
            'o7' : validImgInput.o7,
          }
      }
      ,{
          status: 400,
          body:  'Incorrectly formatted' ,
      });
    });
    it('Should return status code 400 with error due to missing options', async () => {

      await ApiTest.testHandler({
          url: 'api/images/image',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
      }
      ,{
          status: 400,
          body:  'Error' ,
      });
    });
    it('Should return status code 403 unauthorized due to no cookie', async () => {

      await ApiTest.testHandler({
          url: 'api/images/image',
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
      }
      ,{
          status: 403,
          body: 'Unauthorized',
      });
    });
    it('Should return status code 400 error due to malformed mfsid cookie value', async () => {

      await ApiTest.testHandler({
          url: 'api/images/image',
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
          cookies: {
            'mfsid' : 'abc', 
            'SameSite' : 'Strict',
          },
      }
      ,{
          status: 400,
          body: 'Error',
      });
    });
  });
});