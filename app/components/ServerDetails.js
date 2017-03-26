import React from 'react';
const electron = window.require('electron');

class ServerDetails extends React.Component {
  render() {
    const { serverName } = this.props.match.params;
    return (
      <div>
        <h1 className="page-header">Server {serverName}</h1>
        <a className="btn btn-default" onClick={this.handleDisconnect.bind(this)}>Disconnect</a>&nbsp;
        <a className="btn btn-default" onClick={this.handleLogin.bind(this)}>Login to Plesk UI</a>
      </div>
    );
  }

  handleDisconnect(event) {
    event.preventDefault();

    const { serverName } = this.props.match.params;

    this.context.storage.disconnectServer(serverName);

    this.props.history.push('/');
  }

  handleLogin(event) {
    event.preventDefault();

    const { serverName } = this.props.match.params;
    const { servers } = this.context.storage;

    const { login, password } = servers[serverName];
    const loginUrl = `http://${serverName}:8880/login_up.php?login_name=${login}&passwd=${password}`;
    electron.shell.openExternal(loginUrl);
  }
}
ServerDetails.contextTypes = {
    storage: React.PropTypes.object,
};

export default ServerDetails;
