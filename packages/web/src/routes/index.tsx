import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Main from './main'
import About from './about'
import Register from './user/register'

export default class Routes extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Route
					path="/"
					exact={true}
					render={() => <Redirect to="/register" />}
				/>
				<Route path="/register" exact={true} component={Register} />
				<Route path="/main" exact={true} component={Main} />
				<Route path="/about" exact={true} component={About} />
			</BrowserRouter>
		)
	}
}
