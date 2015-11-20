'use strict';

const Server = require('socket-server-router');
const Client = require('../index.js');
const socketParams = {host: 'localhost', port: 4445};
const client = new Client(socketParams);
const server = new Server();

const type = 'my_task';

server.listen(4445).then(() => {
  server.register(type, (body, res) => {
    res.success(`${body.toUpperCase()}`);
  });

  describe('socket-router-client, when used with socket-server-router', () => {
    after(() => {
      server.end();
    });

    it('should receive response to a ping request', done => {
      client.query({type: 'ping', body: null}).then(res => {
        res.should.equal('pong');
        done();
      });
    });

    it('should receive response when calling an existing task', done => {
      client.query({type, body: 'Hello'}).then(() => {
        done();
      });
    });

    it('the received response should have the correct transformation applied to it', done => {
      client.query({type, body: 'Hello'}).then(res => {
        res.should.equal('HELLO');
        done();
      });
    });
  });
});