import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p>
          <Link to="/server/add" className="btn btn-default">
            <span className="glyphicon glyphicon-plus"></span>&nbsp;
            Connect a server
          </Link>
        </p>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Servers</th>
              <td>{Object.keys(this.context.storage.servers).length}</td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
Dashboard.contextTypes = {
  storage: React.PropTypes.object,
};

export default Dashboard;
