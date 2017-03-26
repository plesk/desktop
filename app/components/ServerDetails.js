import React from 'react';
const electron = window.require('electron');

class ServerDetails extends React.Component {
  render() {
    const { serverName } = this.props.match.params;
    const { servers } = this.context.storage;
    const server = servers[serverName];

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="page-header">Server {serverName}</h1>
            <a className="btn btn-default" onClick={this.handleDisconnect.bind(this)}>Disconnect</a>&nbsp;
            <a className="btn btn-default" onClick={this.handleLogin.bind(this)}>Login to Plesk UI</a>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-xs-5">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>Version</td>
                  <td>{server && server.details.version}</td>
                </tr>
                <tr>
                  <td>OS</td>
                  <td>{server && `${server.details.os} ${server.details.osVersion}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-xs-5">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>Domains</td>
                  <td>?</td>
                </tr>
                <tr>
                  <td>Clients</td>
                  <td>?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  handleDisconnect(event) {
    event.preventDefault();

    const {serverName} = this.props.match.params;

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
