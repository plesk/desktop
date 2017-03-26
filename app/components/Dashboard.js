import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
const storage = window.require('electron-json-storage');

export default class Dashboard extends React.Component {
  componentDidMount() {
    storage.get('servers', (error, servers) => {
      this.setState({'servers': servers});
    });
  }

  serverCount(servers) {
    if (servers) {
      return Object.keys(servers).length || 0;
    }
    return 0;
  }

  render() {
    const { servers } = this.context.storage;
    return (
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p>
          <Link to="/server/add" className="btn btn-default">Connect a server</Link>
        </p>
        <table className="table table-bordered table-hover">
          <tbody>
          <tr>
            <th>Servers</th>
            <td>{this.serverCount(servers)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  storage: React.PropTypes.object,
};