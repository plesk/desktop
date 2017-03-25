import React from 'react';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p>
          <a className="btn btn-default" href="#" role="button">Connect a server</a>
        </p>
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th>Servers</th>
              <td>?</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
