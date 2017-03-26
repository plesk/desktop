import React from 'react';
const storage = window.require('electron-json-storage');

export default class ServerDetails extends React.Component {
  render() {
    const { serverName } = this.props.match.params;
    return (
      <div>
        <h1 className="page-header">Server {serverName}</h1>
        <a className="btn btn-default" onClick={this.handleDisconnect.bind(this)}>Disconnect</a>
      </div>
    );
  }

  handleDisconnect(event) {
    event.preventDefault();

    const { serverName } = this.props.match.params;

    storage.get('servers', (error, servers) => {
      delete servers[serverName];
      storage.set('servers', servers, (error) => {
        if (error) throw error;
      });
    });

    this.props.history.push('/');
  }
}
