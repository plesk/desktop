import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p>
          <Link to="/server/add" className="btn btn-default">
            <span className="glyphicon glyphicon-plus"/> Connect a Server
          </Link>
        </p>
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th>Servers</th>
              <td>{Object.keys(this.context.storage.servers).length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Dashboard.contextTypes = {
  storage: PropTypes.object,
};

export default Dashboard;
