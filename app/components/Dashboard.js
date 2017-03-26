import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
const storage = window.require('electron-json-storage');

export default class Dashboard extends React.Component {
  componentDidMount() {
    storage.get('servers', (error, servers) => {
      this.setState({'servers': servers});
    });
  }

  serverCount() {
    if (this.state && this.state.servers) {
      return Object.keys(this.state.servers).length || 0;
    }
    return 0;
  }

  render() {
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
            <td>{this.serverCount()}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
