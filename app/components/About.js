import React from 'react';
const shell = window.require('electron').shell;

export default class About extends React.Component {

  open(event) {
    shell.openExternal(event.target.href);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 className="page-header">About</h1>
        <p>
          GitHub: <a onClick={this.open} href="https://github.com/plesk/desktop">https://github.com/plesk/desktop</a>
          <br/>
          Wiki: <a onClick={this.open} href="https://github.com/plesk/desktop/wiki">https://github.com/plesk/desktop/wiki</a>
          <br/>
          Ticket: <a onClick={this.open} href="https://github.com/plesk/desktop/issues/new">https://github.com/plesk/desktop/issues/new</a>
          <br/>
        </p>
      </div>
    );
  }
}
