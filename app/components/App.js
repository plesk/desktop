import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
              <li><a href="#">Overview</a></li>
            </ul>
            <h5>Servers</h5>
            TODO: add servers list
          </div>
          <div className="col-xs-9 col-xs-offset-3 col-xs-10 col-xs-offset-2 main">
            TODO: add content
          </div>
        </div>
      </div>
    );
  }
}
