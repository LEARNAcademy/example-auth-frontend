import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import AuthService from '../services'

class LoginPage extends Component {
	constructor(props) {
		super(props)

		this.auth = new AuthService()
		this.state = {
			registerSuccess: false,
			errors: "",
			form: {
				user: {
					email: "test@example.com",
					password: "123134",
				}
			}
		}
	}

	render() {
		let { email, password } = this.state.form.user
		return (
			<main>
				<h2>Welcome! Login here.</h2>
				<form onSubmit={this.onSubmit}>

					<input
						type="email"
						name="email"
						value={email}
						onChange={this.onChange}
					/>
					{this.state.errors.email && <div>Error: Email {this.state.errors.email[0]}</div>}

					<input
						type="password"
						name="password"
						value={password}
						onChange={this.onChange}
					/>
					{this.state.errors.password && <div>Error: Password  {this.state.errors.password[0]}</div>}

					<button onSubmit={this.onSubmit}>Login</button>

				</form>
				{this.state.registerSuccess && <Redirect to="/protected" />}
			</main>
		)
	}

	onChange = (e) => {
		let { form } = this.state

		form.user[e.target.name] = e.target.value

		this.setState({ form })
	}

	onSubmit = (e) => {
		e.preventDefault()

		this.auth.login(this.state.form)
		.then(json => {
			console.log("Got to second then:", json)
			if(json.errors) {
				console.log("!! ERRORS !! ", json.errors);
				this.setState({
					errors: json.errors
				})
			} else {
				this.setState({
					registerSuccess: true
				})
			}
		})
	}
}

export default LoginPage
