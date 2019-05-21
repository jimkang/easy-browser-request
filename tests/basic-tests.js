var test = require('tape');
var request = require('../index');
var assertNoError = require('assert-no-error');

console.log(
  'An http server needs to be started at localhost:8000 for this test.'
);

var testCases = [
  {
    name: 'POST test',
    opts: {
      url: 'http://localhost:8000/post-test',
      method: 'POST',
      mimeType: 'application/json',
      body: {
        postTest: 'yes'
      }
    },
    expectedStatusCode: 201,
    expectedStatusMessage: 'Created'
  },
  {
    name: 'PUT test',
    opts: {
      url: 'http://localhost:8000/put-test',
      method: 'PUT',
      mimeType: 'application/json',
      body: {
        putTest: 'yes'
      }
    },
    expectedStatusCode: 201,
    expectedStatusMessage: 'Created'
  },
  {
    name: 'GET test',
    opts: {
      url: 'http://localhost:8000/get-test',
      method: 'GET',
      json: true
    },
    expectedStatusCode: 200,
    expectedStatusMessage: 'OK'
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test(testCase.name, basicTest);

  async function basicTest(t) {
    var { error, res, body } = await request(testCase.opts);

    assertNoError(t.ok, error, 'No error during request.');
    t.equal(body.test, 'ok', 'Received json body with test: ok.');
    t.equal(
      res.statusCode,
      testCase.expectedStatusCode,
      'Response has the correct status code.'
    );
    t.equal(
      res.statusMessage,
      testCase.expectedStatusMessage,
      'Response has the correct status message.'
    );
    t.ok(res.rawResponse, 'Response includes the raw xhr response.');
    t.equal(typeof res.xhr, 'object', 'Response includes the xhr object.');
    t.end();
  }
}
