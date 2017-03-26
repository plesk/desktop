import React from 'react';
import { Link } from 'react-router-dom';

class ServerList extends React.Component {
  render() {
    const { servers } = this.context.storage;
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
ServerList.contextTypes = {
    storage: React.PropTypes.object,
};

export default ServerList;
