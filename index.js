var basicBrowserRequest = require('basic-browser-request');

// Return a promise that resolves with the error, even when it
// catches the error.
async function easyBrowserRequest(opts) {
  return new Promise(executor);

  function executor(resolve) {
    basicBrowserRequest(opts, passBrowserRequestResults);

    function passBrowserRequestResults(error, res, body) {
      resolve({ error, res, body });
    }
  }
}

module.exports = easyBrowserRequest;
