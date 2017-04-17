import React from 'react';
import { Link } from 'react-router-dom';

class ServerList extends React.Component {
  render() {
  const { servers } = this.context.storage;

  return (
    <ul className="nav nav-sidebar">
      {Object.keys(servers).map((name) => {
        const serverDetails = servers[name].details || {};
        return (
          <li key={name}>
          <Link to={`/server/show/${name}`}>
            <span className="glyphicon glyphicon-globe"></span>&nbsp;
            {name}<br/>
            <small className="plesk-version">{`${serverDetails.version}, ${serverDetails.os} ${serverDetails.osVersion}`}</small>
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
