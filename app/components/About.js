import React from 'react';
import ExternalLink from './ExternalLink';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">About</h1>
        <p>
          GitHub: <ExternalLink href="https://github.com/plesk/desktop">https://github.com/plesk/desktop</ExternalLink><br/>
          Wiki: <ExternalLink href="https://github.com/plesk/desktop/wiki">https://github.com/plesk/desktop/wiki</ExternalLink><br/>
          Ticket: <ExternalLink href="https://github.com/plesk/desktop/issues/new">https://github.com/plesk/desktop/issues/new</ExternalLink><br/>
        </p>
      </div>
    );
  }
}
