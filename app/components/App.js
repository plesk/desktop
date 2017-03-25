import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to="/">Dashboard</Link></li>
              </ul>
              <h5>Servers <Link to="/server/add"><button className="btn btn-sm glyphicon glyphicon-plus"/></Link></h5>
              <ServerList/>
              <Link to="/about" className="fixed-bottom"><button className="btn btn-sm">About</button></Link>
            </div>
            <div className="col-xs-9 col-xs-offset-3 col-xs-10 col-xs-offset-2 main">
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/server/add" component={ConnectForm}/>
              <Route path="/server/show/:serverName" component={ServerDetails}/>
              <Route path="/about" component={About}/>
            </div>
            <div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
