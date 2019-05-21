easy-browser-request
=====================

An abstraction that wraps a promise around [basic-browser-request](https://github.com/basic-browser-request) so it can be used in async/await for those that want to use async/await. It also returns the error (in the style of [https://github.com/scopsy/await-to-js](to)) as well as the response and body.

These are provided in the hopes of:

- Discouraging (generally) bad patterns like ignoring the error or handling the error only in a single catch for several async operations
- Encouraging handling errors as they come and always thinking about errors when performing async operations

Does not support chunking and cancelling; use basic-browser-request directly for that.

Installation
------------

    npm install easy-browser-request

Usage
-----

    var easyR = require('easy-browser-request');
    var { error, res, body } = await easyR({ method: 'GET', json: true, url: 'http://something.whatever/yeah' });

If you don't specify a mimeType, it defaults to `application/json` and `done()` will be passed a parsed JSON object.

The promise fulfillment delivers an object with three properties:

- error: An error object, if there was an error while making the request.
- response: An object containing the `statusCode`, the `statusMessage` , `rawResponse`, and `xhr`: [XMLHttpRequest.response](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response). This is not at all the same as a [Node response](https://nodejs.org/api/http.html#http_class_http_serverresponse), though, so proceed with caution. The `xhr` is the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/) used to run the request operation.
- body: This is going to be a string or, if the mimeType was `application/json`, an object.

Tests
-----

Run in Chrome and Firefox with `make test`.

License
-------

Copyright (c) 2019 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
HE SOFTWARE.
