import * as React from 'react'
import { Query } from 'react-apollo'
import { RouteProps, Route, RouteComponentProps, Redirect } from 'react-router'
import gql from 'graphql-tag'

const meQuery = gql`
	query MeQuery {
		me {
			email
		}
	}
`

interface IProps extends RouteProps {}

export const AuthRoute = ({ component, ...rest }: IProps) => {
	return (
		<Query query={meQuery}>
			{({ data, loading }) => {
				const renderRoute = (routeProps: RouteComponentProps) => {
					if (loading) {
						// loading screen
						return null
					}

					if (!data.me) {
						// user not logged in
						return (
							<Redirect
								to={{
									pathname: '/login',
									state: { next: routeProps.location.pathname },
								}}
							/>
						)
					}

					const Component = component as any

					return <Component {...routeProps} />
				}

				return <Route {...rest} render={renderRoute} />
			}}
		</Query>
	)
}
