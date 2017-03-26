import React, { Component, PropTypes } from 'react';
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
            },
        };
    }

    connectServer(host, login, password) {
        const { servers } = this.state;
        servers[host] = { login, password };

        storage.set('servers', servers, error => {
            if (error) {
                throw error;
            }
            this.setState({ servers });
        });
    }

    disconnectServer(host) {
        const { servers } = this.state;
        delete servers[host];

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
