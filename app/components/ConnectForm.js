import React from 'react';
import PleskApi from 'plesk-api-client';
import { parseString } from 'xml2js';

class ConnectForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Add a new Server</h2>
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
    this.connectServer(host.value, pw.value);
  }

  connectServer(host, password) {
    if (!host) {
      alert('Please define the host');
      return;
    }

    const request =
      `<packet>
        <server><get><stat/></get></server>
      </packet>`;

    const client = new PleskApi.Client(host);
    client.setCredentials('admin', password);
    client.request(request)
      .then((response) => {
        parseString(response, (error, result) => {
          if (error) {
            console.log(error);
            return;
          }

          if (result.packet.system) {
            alert(result.packet.system[0].errtext[0]);
            return;
          }

          const stats = result.packet.server[0].get[0].result[0].stat[0];
          this.context.storage.connectServer(host, 'admin', password, {
            version: stats.version[0].plesk_version[0],
            os: stats.version[0].plesk_os[0],
            osVersion: stats.version[0].plesk_os_version[0]
          });

          this.props.history.push('/');
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
ConnectForm.contextTypes = {
    storage: React.PropTypes.object,
};

export default ConnectForm;
