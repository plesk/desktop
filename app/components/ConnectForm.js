import React from 'react';
import PropTypes from 'prop-types';
import PleskUtils from '../utils/PleskUtils';

class ConnectForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Add a New Server</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="host">Host</label>
            <input type="text" className="form-control" id="host" placeholder="host.com"/>
          </div>
          <div className="form-group">
            <label type="text" htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="password"/>
          </div>
          <button type="submit" className="btn btn-default">
            <span className="glyphicon glyphicon-ok"></span>&nbsp;
            Connect
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let host = event.target.querySelector('#host');
    let pw = event.target.querySelector('#pw');

    if (!host) {
      alert('Please define the host');
      return;
    }

    PleskUtils.connectServer(host.value, 'admin', pw.value, this.context.storage, () => {
      const serverName = host.value;
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

      this.props.history.push('/');
    });

  }
}

ConnectForm.contextTypes = {
  storage: PropTypes.object,
};

export default ConnectForm;
