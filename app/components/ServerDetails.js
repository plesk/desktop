import React from 'react';
import ExternalLink from './ExternalLink';

class ServerDetails extends React.Component {
  render() {
    const { serverName } = this.props.match.params;
    const { servers } = this.context.storage;
    const { login, password } = servers[serverName];

    return (
      <div>
        <h1 className="page-header">Server {serverName}</h1>
        <a className="btn btn-default" onClick={this.handleDisconnect.bind(this)}>Disconnect</a>&nbsp;
        <ExternalLink className="btn btn-default" href={`http://${serverName}:8880/login_up.php?login_name=${login}&passwd=${password}`}>Login to Plesk UI</ExternalLink>
      </div>
    );
  }

  handleDisconnect(event) {
    event.preventDefault();

    const { serverName } = this.props.match.params;

    this.context.storage.disconnectServer(serverName);

    this.props.history.push('/');
  }
}
ServerDetails.contextTypes = {
    storage: React.PropTypes.object,
};

export default ServerDetails;
