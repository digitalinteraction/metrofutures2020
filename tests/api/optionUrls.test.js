import { 
  cookies,
  validOptionInput,
  invalidOptionInput,
  optionUrlResponse
} from './common.js';

const VercelServerlessApiTests = require('vercel-serverless-tests');

const handler = require('../../api/images/optionUrls');

const ApiTest = new VercelServerlessApiTests(handler);

describe('Test optionUrl API', () => {
  describe('When qindex set to valid number', () => {
    it('Should return status code 200 with array or imageUrls', async () => {

      await ApiTest.testHandler({
          url: 'api/images/optionUrl',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: validOptionInput,
      }
      ,{
          status: 200,
          body: optionUrlResponse,
      });
    });
  });
  describe('When qindex set to invalid number', () => {
    it('Should return status code 400 incorrectly formatted', async () => {

      await ApiTest.testHandler({
          url: 'api/images/optionUrl',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: invalidOptionInput,
      }
      ,{
          status: 400,
          body: "Incorrectly formatted",
      });
    });
  });
  describe('When missing an argument', () => {
    it('Should return status code 400 incorrectly formatted', async () => {

      await ApiTest.testHandler({
          url: 'api/images/optionUrl',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: {
            'cam': invalidOptionInput.cam,
            'o1': invalidOptionInput.o1,
            'o2': invalidOptionInput.o2,
            'o3': invalidOptionInput.o3,
            'o4': invalidOptionInput.o4,
            'o5': invalidOptionInput.o5,
            'o7': invalidOptionInput.o7,
            'qindex': invalidOptionInput.qindex,
            
          },
      }
      ,{
          status: 400,
          body: "Incorrectly formatted",
      });
    });
  });
  describe('When missing mfsid cookie', () => {
    it('Should return status code 403 unauthorized', async () => {

      await ApiTest.testHandler({
          url: 'api/images/optionUrl',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          queries: validOptionInput,
      }
      ,{
          status: 403,
          body: "Unauthorized",
      });
    });
  });
});