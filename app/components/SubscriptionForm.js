import React from 'react';
import PropTypes from 'prop-types';
import Subscription from '../api-rpc/Subscription';

class SubscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    return (
      <div>
        <h2>Add a New Subscription</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="domain">Domain Name</label>
            <input type="text" className="form-control" id="domain" placeholder="domain.com" readOnly={this.state.loading}/>
          </div>
          <div className="form-group">
            <label type="text" htmlFor="pw">Password</label>
            <input type="password" className="form-control" id="pw" placeholder="password" readOnly={this.state.loading}/>
          </div>
          <button type="submit" className="btn btn-default" disabled={this.state.loading}>
            {this.state.loading ? (
              'Please wait...'
            ) : (
              <span><span className="glyphicon glyphicon-ok"/> Create</span>
            )}
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const domain = event.target.querySelector('#domain').value;
    const password = event.target.querySelector('#pw').value;
    const serverName = this.props.match.params.serverName;
    const server = this.context.storage.servers[serverName];

    this.setState({ loading: true });

    Subscription.create({
      server,
      serverName,
      domain,
      password,
      callback: (error, result) => {
        this.setState({ loading: false });

        if (error) {
          console.log(error);
          return;
        }
        if (result.packet.system) {
          alert(result.packet.system[0].errtext[0]);
          return;
        }
        if ('error' === result.packet.webspace[0].add[0].result[0].status[0]) {
          alert(result.packet.webspace[0].add[0].result[0].errtext[0]);
          return;
        }
        const ip = !server.details.isMultiServer ? serverName : result.packet.webspace[0].add[0].result[0].ip[0];
        this.context.storage.addSubscription(serverName, domain, password, ip);
        this.props.history.push(`/server/show/${serverName}`);
      },
    });
  }
}

SubscriptionForm.contextTypes = {
  storage: PropTypes.object,
};

export default SubscriptionForm;
