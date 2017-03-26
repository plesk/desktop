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
            <label type="text" htmlFor="login">Login</label>
            <input type="text" className="form-control" id="login" placeholder="username"/>
          </div>
          <div className="form-group">
            <label type="text" htmlFor="pw">Passwort</label>
            <input type="password" className="form-control" id="pw" placeholder="password"/>
          </div>
          <button type="submit" className="btn btn-default">Connect</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let host = event.target.querySelector('#host');
    let login = event.target.querySelector('#login');
    let pw = event.target.querySelector('#pw');
    this.connectServer(host.value, login.value, pw.value);
    this.props.history.push('/');
  }

  connectServer(host, login, password) {
    if (!host) return;

    this.context.storage.connectServer(host, login, password);

    // TODO: prepare real server description / details
    const request =
      `<packet>
        <server>
          <get_protos/>
        </server>
      </packet>`;

    const client = new PleskApi.Client(host, 8880, 'http');
    client.setCredentials(login, password);
    client.request(request, (response) => {
      parseString(response, (err, result) => {
        console.dir(result);
      });
    });
  }
}
ConnectForm.contextTypes = {
    storage: React.PropTypes.object,
};

export default ConnectForm;
