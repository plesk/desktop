import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class ServerList extends React.Component {
  constructor() {
    super();

    this.state = { servers: [] };
  }

  componentDidMount() {
    // TODO: replace with electron-json-storage
    this.setState({
      servers: {
        'example.dom': {
          version: '17.5.3'
        },
        'plesk.com': {
          version: '12.5.30'
        }
      }
    });
  }

  render() {
    const { servers } = this.state || {};
    return (
      <ul className="nav nav-sidebar">
        {Object.keys(servers).map((name) => {
            return (
              <li>
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
