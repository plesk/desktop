import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ServerDetails from './ServerDetails';
import ServerList from './ServerList';
import ConnectForm from './ConnectForm';
import About from "./About";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 col-xs-3 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to="/">Dashboard</Link></li>
              </ul>
              <h5>Servers <Link to="/server/add"><span className="fa fa-plus"/></Link></h5>
              <ServerList/>
              <hr className="divider"/>
              <ul className="nav nav-sidebar">
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
            <div className="col-sm-10 col-sm-offset-2 col-xs-9 col-xs-offset-3 main">
              <Route exact path="/" component={Dashboard}/>
              <Route path="/server/add" component={ConnectForm}/>
              <Route path="/server/show/:serverName" component={ServerDetails}/>
              <Route path="/about" component={About}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
