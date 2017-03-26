import React from 'react';
import { Link } from 'react-router-dom';
const storage = window.require('electron-json-storage');

export default class ServerList extends React.Component {
  constructor() {
    super();

    this.state = { servers: {} };
  }

  componentDidMount() {
    storage.get('servers', (error, servers) => {
      this.setState({ 'servers': servers });
    });
  }

  render() {
    const { servers } = this.state;
    return (
      <ul className="nav nav-sidebar">
        {Object.keys(servers).map((name) => {
            return (
              <li key={name}>
                <Link to={`/server/show/${name}`}>
                  {name}<br/>
                  <small className="plesk-version">{servers[name].version}</small>
                </Link>
              </li>
            );
        })}
      </ul>
    );
  }
}
