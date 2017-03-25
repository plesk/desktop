import React from 'react';

export default class ServerDetails extends React.Component {
  render() {
    const { serverName } = this.props.match.params;
    return (
      <div>
        <h1 className="page-header">Server {serverName}</h1>
        TODO: server details
      </div>
    );
  }
}
