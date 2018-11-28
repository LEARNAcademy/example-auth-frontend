import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import AuthService from './services'
import Register from './pages/Register'
import ProtectedExample from './pages/ProtectedExample'
import PublicExample from './pages/PublicExample'
import Header from './components/Header'
import { styles } from './BaseStyles'

class App extends Component {
	constructor(props) {
		super(props)

		this.auth = new AuthService()
		this.state = {
			authenticated: this.auth.loggedIn()
		}
	}

	render() {
		// creates new instance of AuthService class

		return (
			<div style={styles()}>
				<Header logout={this.authStatusUpdate}/>

				<Router>
					{(this.auth.loggedIn())
					// if logged in
					? <Switch>
						<Route path="/public" component={PublicExample} />
						<Route path="/protected" component={ProtectedExample} />
						<Route path="/register" component={Register} />
					</Switch>
					// if not logged in (ie Guest User)
					: <Switch>
						<Route path="/public" component={PublicExample} />
						<Redirect from="/protected" to="/register" />
						<Route path="/register" component={Register} />
					</Switch>}
				</Router>
			</div>
		);
	}

	authStatusUpdate = () => {
		this.setState({
			authenticated: this.auth.loggedIn()
		})
	}
}

export default App;
