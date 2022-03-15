import { 
  cookies,
  validEndwallInput,
  endwallResponse,
} from './common.js';

const VercelServerlessApiTests = require('vercel-serverless-tests');

const handler = require('../../api/images/endwall');

const ApiTest = new VercelServerlessApiTests(handler);



describe('Test endwall API', () => {
  describe('When design value set to 0', () => {
    it('Should return status code 200 with day and night URL arrays', async () => {

      await ApiTest.testHandler({
          url: 'api/images/endwall',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: validEndwallInput,
      }
      ,{
          status: 200,
          body: endwallResponse,
      });
    });
  });
  describe('When design value set to number', () => {
    it('Should return status code 200 with url', async () => {

      await ApiTest.testHandler({
          url: 'api/images/endwall',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cookies,
          queries: {
            'cam': '6',
            'o1': '1',
            'o2': '1',
            'o3': '0',
            'o4': '0',
            'o5': '0',
            'o6': '1',
            'o7': '2',
            'design': 'D'
          },
      }
      ,{
          status: 200,
          body: endwallResponse,
      });
    });
  });
});