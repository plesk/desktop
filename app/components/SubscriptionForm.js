import React from 'react';
import PleskApi from 'plesk-api-client';
import { parseString } from 'xml2js';

class SubscriptionForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Add a New Subscription</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="domain">Domain Name</label>
            <input type="text" className="form-control" id="domain" placeholder="domain.com"/>
          </div>
          <div className="form-group">
            <label type="text" htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="password"/>
          </div>
          <button type="submit" className="btn btn-default">
            <span className="glyphicon glyphicon-ok"/> Create
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let domain = event.target.querySelector('#domain');
    let pw = event.target.querySelector('#pw');
    const button = event.target.querySelector('.btn');
    button.textContent = 'Please wait...';
    this.createSubscription(domain.value, pw.value);
  }

  createSubscription(domain, domainPassword) {
    if (!domain) {
      alert('Please define the domain name');
      return;
    }

    const domainLogin = domain.replace('.', '');

    const { serverName } = this.props.match.params;
    const { servers } = this.context.storage;
    const server = servers[serverName];

    const { login, password } = server;

    const request =
      `<packet>
        <request-settings>
          <setting>
            <name>plesk_rpc_forwarding_to_ext</name>
            <value>plesk-multi-server</value>
          </setting>
          <setting>
            <name>ext-plesk-multi-server:ipv4</name>
            <value>shared</value>
          </setting>
          <setting>
            <name>ext-plesk-multi-server:sync</name>
            <value>true</value>
          </setting>
        </request-settings>
        <webspace>
          <add>
            <gen_setup>
              <name>${domain}</name>
            </gen_setup>
            <hosting>
              <vrt_hst>
                <property>
                  <name>ftp_login</name>
                  <value>${domainLogin}</value>
                </property>
                <property>
                  <name>ftp_password</name>
                  <value>${domainPassword}</value>
                </property>
              </vrt_hst>
            </hosting>
            <plan-name>Default domain</plan-name>
          </add>
        </webspace>
      </packet>`;

    const client = new PleskApi.Client(serverName, 8880, 'http');
    client.setCredentials(login, password);
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

          const ip = result.packet.webspace[0].add[0].result[0].ip[0];
          this.context.storage.addSubscription(serverName, domain, domainPassword, ip);
          this.props.history.push(`/server/show/${serverName}`);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}
SubscriptionForm.contextTypes = {
    storage: React.PropTypes.object,
};

export default SubscriptionForm;
