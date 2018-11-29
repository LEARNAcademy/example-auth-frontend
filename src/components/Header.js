import React, { Component } from 'react'
import AuthService from '../services'
import './Header.css'

class Header extends Component {
	constructor(props) {
		super(props)

		this.auth = new AuthService()
	}

	render() {
		let loginButton

		if(this.auth.loggedIn() == true) {
			loginButton = <li onClick={this.logout}>Logout</li>
		} else {
			loginButton = <li><a href="/login">Login</a></li>
		}

		return (
			<header>
				<div>Cool Logo</div>
				<nav>
					<ul>
						<li>Stuff</li>
						{ loginButton }
					</ul>
				</nav>
			</header>
		)
	}

	logout = () => {
		// logout via AuthService
		this.auth.logout()
		// update App.js with auth status change
		this.props.logout()
	}
}

export default Header
