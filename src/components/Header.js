import React, { Component } from 'react'
import AuthService from '../services'
import './Header.css'

class Header extends Component {
	constructor(props) {
		super(props)

		this.auth = new AuthService()
	}

	render() {
		let loggedIn

		if(this.auth.loggedIn() == true) {
			loggedIn = <li onClick={this.logout}>Logout</li>
		} else {
			loggedIn = <li><a href="/login">Login</a></li>
		}

		return (
			<header>
				<div>Cool Logo</div>
				<nav>
					<ul>
						<li>Stuff</li>
						{ loggedIn }
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
