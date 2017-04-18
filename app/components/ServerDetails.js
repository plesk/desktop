import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExternalLink from './ExternalLink';
import PleskUtils from '../utils/PleskUtils';

class ServerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { serverLoginGeneration: false };
  }

  render() {
    const { serverName } = this.props.match.params;
    const { servers } = this.context.storage;
    const server = servers[serverName];
    const domains = server && server.domains || [];

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <h1 className="page-header">Server {serverName}</h1>
            <a className="btn btn-default" onClick={this.handleLogin.bind(this)} disabled={this.state.serverLoginGeneration}>
              <span className="glyphicon glyphicon-log-in"/>&nbsp;
              Login to Plesk UI
            </a>&nbsp;
            <a className="btn btn-default" onClick={this.handleSync.bind(this)}>
              <span className="glyphicon glyphicon-refresh"/>&nbsp;
              Sync
            </a>&nbsp;
            <a className="btn btn-default" onClick={this.handleDisconnect.bind(this)}>
              <span className="glyphicon glyphicon-remove"/>&nbsp;
              Disconnect
            </a>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-xs-5">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <th>Version</th>
                  <td>{server && server.details && server.details.version}</td>
                </tr>
                <tr>
                  <th>OS</th>
                  <td>{server && server.details && `${server.details.os} ${server.details.osVersion}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-xs-5">
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <th>Subscriptions</th>
                  <td>{server && server.domains && server.domains.length || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Link to={`/server/subscription/${serverName}`} className="btn btn-default">
              <span className="glyphicon glyphicon-plus"/>&nbsp;
              Create Subscription
            </Link>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-xs-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Subscription</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain) => {
                  return (
                    <tr key={domain.domain}>
                      <td>{domain.domain}</td>
                      <td>
                        <a data-id={domain.domainId} className="btn btn-default btn-xs" onClick={this.handleLogin.bind(this)}>
                          <span className="glyphicon glyphicon-log-in"/>&nbsp;
                          Login
                        </a>&nbsp;
                        <a href="#" data-id={domain.domain} className="btn btn-default btn-xs" onClick={this.handleRemoveSubscription.bind(this)}>
                          <span className="glyphicon glyphicon-remove"/>&nbsp;
                          Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  handleLogin(event) {
    event.preventDefault();
    const serverName = this.props.match.params.serverName;
    const server = this.context.storage.servers[serverName];
    const domainId = event.target.getAttribute('data-id');

    if (!domainId) {
      this.setState({ serverLoginGeneration: true });
    }

    PleskUtils.generateLoginUrl({
      server,
      serverName,
      callback: (url) => {
        if (domainId) {
          url = `${url}&success_redirect_url=/admin/subscription/overview/id/${domainId}`;
        } else {
          this.setState({ serverLoginGeneration: false });
        }

        const electron = window.require('electron');
        electron.shell.openExternal(url);
      }
    });
  }

  handleDisconnect(event) {
    event.preventDefault();
    const {serverName} = this.props.match.params;
    this.context.storage.disconnectServer(serverName);
    this.props.history.push('/');
  }

  handleSync(event) {
    event.preventDefault();
    const serverName = this.props.match.params.serverName;
    const server = this.context.storage.servers[serverName];
    PleskUtils.syncServerState({
      server,
      serverName,
      callback: (webspaces) => {
        this.context.storage.findSubscriptions(serverName, webspaces.map((webspace) => {
          return {
            domain: webspace.data[0].gen_info[0].name[0],
            domainId: webspace.id[0]
          };
        }));
      }
    });
  }

  handleRemoveSubscription(event) {
    event.preventDefault();
    const domain = event.target.getAttribute('data-id');
    const serverName = this.props.match.params.serverName;
    const server = this.context.storage.servers[serverName];

    PleskUtils.subscription.remove({
      server,
      serverName,
      domain,
      callback: () => {
        this.context.storage.removeSubscription(serverName, domain);
      }
    });
  }
}

ServerDetails.contextTypes = {
  storage: PropTypes.object,
};

export default ServerDetails;
