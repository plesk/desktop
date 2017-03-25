import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ServerDetails from './ServerDetails';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to="/">Overview</Link></li>
              </ul>
              <h5>Servers</h5>
              <ul className="nav nav-sidebar">
                <li><Link to="/server/show/example.dom">example.dom</Link></li>
              </ul>
            </div>
            <div className="col-xs-9 col-xs-offset-3 col-xs-10 col-xs-offset-2 main">
              <Route exact path="/" component={Dashboard}/>
              <Route path="/server/show/:serverName" component={ServerDetails}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
