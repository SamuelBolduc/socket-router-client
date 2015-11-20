'use strict';

const JsonSocket = require('json-socket');

class SocketClient {
  constructor(config) {
    if(!config) throw new Error('No config specified');
    if(!config.port) throw new Error('No port specified');
    if(!config.host) throw new Error('No host specified');
    this.serverConfig = {port: config.port, host: config.host};
  }

  query(msg) {
    return new Promise((resolve, reject) => {
      JsonSocket.sendSingleMessageAndReceive(this.serverConfig.port, this.serverConfig.host, msg, (err, res) => {
        if(err) return reject(err);
        if(res.status == 'error') return reject((res.e && res.e.msg) ? res.e.msg : res.msg);
        return resolve(res.data);
      });
    });
  }
};

module.exports = SocketClient;
