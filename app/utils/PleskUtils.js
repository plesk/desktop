import PleskApi from 'plesk-api-client';
import { parseString } from 'xml2js';

const Subscription = {
  _getMultiServerRequestSettings() {
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
  },

  _getSubscriptionCreationPacket(requestSettings, domain, domainLogin, domainPassword, ipAddress) {
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
  },

  create({ domain, domainLogin, password, server, serverName, callback }) {
    if (!domain) {
      alert('Please define the domain name.');
      return;
    }

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
  },

  remove({ domain, server, serverName, callback }) {
    const client = new PleskApi.Client(serverName);
    client.setCredentials(server.login, server.password);

    const request =
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
}

const PleskUtils = {
  subscription: Subscription,

  connectServer(host, login, password, storage, callback) {
    const request =
      `<packet>
        <server><get><stat/></get></server>
      </packet>`;

    const client = new PleskApi.Client(host);
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

          const stats = result.packet.server[0].get[0].result[0].stat[0];
          storage.connectServer(host, 'admin', password, {
            isMultiServer: false, // TODO: add detection of Plesk MultiServer instance
            version: stats.version[0].plesk_version[0],
            os: stats.version[0].plesk_os[0],
            osVersion: stats.version[0].plesk_os_version[0]
          });

          callback();
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

export default PleskUtils;
