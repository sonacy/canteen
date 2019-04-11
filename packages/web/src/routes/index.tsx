import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Register from './user/register'
import TextPage from './text'
import Login from './user/login'
import ConfirmUser from './user/confirmUser'
import ForgetPassword from './user/forgetPassword'
import ChangePassword from './user/changePassword'
import ShopAdded from './shop/ShopAdded'
import { AuthRoute } from '@canteen/common'
import ShopCreate from './shop/ShopCreate'
import ShopDetail from './shop/ShopDetail'
import ShopUpdate from './shop/ShopUpdate'
import ShopUploadPics from './shop/ShopUploadPics'
import FoodCreate from './food/FoodCreate'
import FoodUpdate from './food/FoodUpdate'

export default class Routes extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Route
					path="/"
					exact={true}
					render={() => <Redirect to="/shop/list" />}
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
				<Route
					path="/user/change-password/:token"
					exact={true}
					component={ChangePassword}
				/>
				<Route path="/m" component={TextPage} />
				<AuthRoute path="/shop/list" exact={true} component={ShopAdded} />
				<AuthRoute path="/shop/create" exact={true} component={ShopCreate} />
				<AuthRoute path="/shop/update" exact={true} component={ShopUpdate} />
				<AuthRoute
					path="/shop/detail/:id"
					exact={true}
					component={ShopDetail}
				/>
				<AuthRoute
					path="/shop/upload/:id"
					exact={true}
					component={ShopUploadPics}
				/>
				<AuthRoute path="/food/create" exact={true} component={FoodCreate} />
				<AuthRoute path="/food/update" exact={true} component={FoodUpdate} />
			</BrowserRouter>
		)
	}
}
