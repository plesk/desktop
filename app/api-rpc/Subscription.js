import PleskApi from 'plesk-api-client';
import { parseString } from 'xml2js';

function Subscription() {

  function _getMultiServerRequestSettings() {
    return (
      `<request-settings>
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
      </request-settings>`
    );
  }

  function _getSubscriptionCreationPacket(requestSettings, domain, domainLogin, domainPassword, ipAddress) {
    return (
      `<packet>
        ${requestSettings}
        <webspace>
          <add>
            <gen_setup>
              <name>${domain}</name>
              <ip_address>${ipAddress}</ip_address>
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
                <ip_address>${ipAddress}</ip_address>
              </vrt_hst>
            </hosting>
            <plan-name>Default domain</plan-name>
          </add>
        </webspace>
      </packet>`
    );
  }

  function create({ domain, password, server, serverName, callback }) {
    if (!domain) {
      alert('Please define the domain name');
      return;
    }

    const domainLogin = domain.replace('.', '');
    const client = new PleskApi.Client(serverName);

    client.setCredentials(server.login, server.password);

    new Promise((resolve) => {
      client
        .request('<packet><ip><get/></ip></packet>')
        .then((response) => {
          parseString(response, (error, result) => {
            resolve(result.packet.ip[0].get[0].result[0].addresses[0].ip_info[0].ip_address[0]);
          });
        });
      })
      .then((ipAddress) => {
        const requestSettings = server.details.isMultiServer ? _getMultiServerRequestSettings() : '';
        const request = _getSubscriptionCreationPacket(requestSettings, domain, domainLogin, password, ipAddress);

        client
          .request(request)
          .then((response) => {
            parseString(response, callback);
          })
          .catch((error) => {
            alert(error.message);
          });
      });
  }

  function remove({ domain, server, serverName, callback }) {
    if (!domain) {
      alert('Please define the domain name');
      return;
    }

    const client = new PleskApi.Client(serverName);

    client.setCredentials(server.login, server.password);

    let request =
      `<packet>
        <webspace>
          <del>
            <filter>
              <name>${domain}</name>
            </filter>
          </del>
        </webspace>
      </packet>`;

    new Promise((resolve) => {
      client
        .request(request)
        .then(callback)
        .catch((error) => {
          alert(error.message);
        });
    });
  }

  return { create, remove };
}

export default (new Subscription);
