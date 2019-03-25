import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Main from './main'
import About from './about'
import Register from './user/register'
import TextPage from './text'
import Login from './user/login'
import ConfirmUser from './user/confirmUser'
import ForgetPassword from './user/forgetPassword'

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
				<Route path="/login" exact={true} component={Login} />
				<Route
					path="/user/confirm/:token"
					exact={true}
					component={ConfirmUser}
				/>
				<Route
					path="/forget-password"
					exact={true}
					component={ForgetPassword}
				/>
				<Route path="/main" exact={true} component={Main} />
				<Route path="/about" exact={true} component={About} />
				<Route path="/m" component={TextPage} />
			</BrowserRouter>
		)
	}
}
