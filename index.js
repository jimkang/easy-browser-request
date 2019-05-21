var basicBrowserRequest = require('basic-browser-request');

// Return a promise that resolves with the error, even when it
// catches the error.
async function easyBrowserRequest(opts) {
  var acceptableErrorCodeRanges = opts.acceptableErrorCodeRanges;
  if (!acceptableErrorCodeRanges) {
    acceptableErrorCodeRanges = [[200, 300]];
  }

  return new Promise(executor);

  function executor(resolve) {
    basicBrowserRequest(opts, passBrowserRequestResults);

    function passBrowserRequestResults(error, res, body) {
      if (!error && opts.checkHTTPErrorCode && !statusCodeOK(res.statusCode)) {
        error = new Error(
          `Received status code ${res.statusCode} from ${opts.url}.`
        );
      }

      resolve({ error, res, body });
    }
  }

  function statusCodeOK(code) {
    for (let i = 0; i < acceptableErrorCodeRanges.length; ++i) {
      let range = acceptableErrorCodeRanges[i];
      if (code >= range[0] && code <= range[1]) {
        return true;
      }
    }
    return false;
  }
}

module.exports = easyBrowserRequest;
