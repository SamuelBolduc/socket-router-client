'use strict';

const Client = require('../index.js');
require('chai').should();

function throwException(e) {
  console.error(e);
  setTimeout(() => {
    throw e;
  });
}

function noop() {
  return;
}

const port = 4444;

describe('Client', () => {
  it(`can't be instanciated without a config`, () => {
    function newClient() {
      new Client();
    }
    newClient.should.throw(`No config specified`);
  });

  it(`can't be instanciated without a host`, () => {
    function newClient() {
      new Client({port});
    }
    newClient.should.throw(`No host specified`);
  });

  it(`can't be instanciated without a port`, () => {
    function newClient() {
      new Client({host: 'localhost'});
    }
    newClient.should.throw(`No port specified`);
  });

  it(`can be instanciated with a host and a port`, () => {
    function newClient() {
      new Client({host: 'localhost', port});
    }
    newClient.should.not.throw();
  });

  it('should have a "query" method', () => {
    const client = new Client({port, host: 'localhost'});
    client.query.should.be.a('function');
  });
});