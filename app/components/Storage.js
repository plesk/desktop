import React, { Component } from 'react';
import PropTypes from 'prop-types';

const storage = window.require && window.require('electron-json-storage') || {
  set: (key, json, callback) => {
    localStorage.setItem(key, JSON.stringify(json));
    callback();
  },
  get: (key, callback) => {
    const json = JSON.parse(localStorage.getItem(key)) || {};
    callback(null, json);
  },
};

class Storage extends Component {
  constructor() {
    super();

    this.state = {
      servers: {},
    };
  }

  componentDidMount() {
    storage.get('servers', (error, servers) => {
      this.setState({ servers });
    });
  }

  render() {
    return this.props.children;
  }

  getChildContext() {
    return {
      storage: {
        servers: this.state.servers,
        connectServer: this.connectServer.bind(this),
        disconnectServer: this.disconnectServer.bind(this),
        addSubscription: this.addSubscription.bind(this),
        removeSubscription: this.removeSubscription.bind(this),
        findSubscriptions: this.findSubscriptions.bind(this)
      },
    };
  }

  connectServer(host, login, password, details) {
    const { servers } = this.state;
    servers[host] = { login, password, details };
    this.saveServersState(servers);
  }

  disconnectServer(host) {
    const { servers } = this.state;
    delete servers[host];
    this.saveServersState(servers);
  }

  addSubscription(host, domain, domainId, login, password, ip) {
    const { servers } = this.state;
    servers[host].domains = servers[host].domains || [];
    servers[host].domains.push({
      domainId: domainId,
      domain: domain,
      login: login,
      password: password,
      ip: ip
    });
    this.saveServersState(servers);
  }

  removeSubscription(host, domain) {
    const { servers } = this.state;
    servers[host].domains = servers[host].domains || [];
    servers[host].domains = servers[host].domains.filter((item) => domain !== item.domain);
    this.saveServersState(servers);
  }

  findSubscriptions(host, domains) {
    const { servers } = this.state;
    servers[host].domains = [];
    domains.forEach(({ domain, domainId }) => {
      this.addSubscription(host, domain, domainId, '', '', '');
    });
    this.saveServersState(servers);
  }

  saveServersState(servers) {
    storage.set('servers', servers, (error) => {
      if (error) {
        throw error;
      }
      this.setState({ servers });
    });
  }
}

Storage.childContextTypes = {
  storage: PropTypes.object,
};

export default Storage;
