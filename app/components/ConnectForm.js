const storage = window.require('electron-json-storage');
import React from 'react';

export default class ConnectForm extends React.Component {
    render() {
        return (
            <div>
                <h2>Add a new Server</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="host">Host</label>
                        <input type="text" className="form-control" id="host" placeholder="host.com"/>
                    </div>
                    <div className="form-group">
                        <label type="text" htmlFor="login">Login</label>
                        <input type="text" className="form-control" id="login" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label type="text" htmlFor="pw">Passwort</label>
                        <input type="password" className="form-control" id="pw" placeholder="password"/>
                    </div>
                    <button type="submit" className="btn btn-default">Connect</button>
                </form>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let host = event.target.querySelector('#host');
        let login = event.target.querySelector('#login');
        let pw = event.target.querySelector('#pw');
        this.saveLoginData(host.value, login.value, pw.value);
        this.props.history.push('/');
    }

    saveLoginData(host, login, password) {
        if (!host) return;
        storage.set(host, {login: login, password: password}, (error) => {
            if (error) throw error;
        });
    }
}
