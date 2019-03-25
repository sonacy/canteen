import { ApolloError } from 'apollo-client'

export const handleErrors = (error: ApolloError) => {
	const res: Array<{ [key: string]: string }> = []
	const gqlError = error.graphQLErrors

	gqlError.forEach(err => {
		const validationErrors = err.extensions!.exception.validationErrors
		if (validationErrors) {
			validationErrors.forEach((x: any) => {
				res.push({
					[x.property]: x.constraints[Object.keys(x.constraints)[0]],
				})
			})
		} else {
			res.push({ [err.extensions!.code]: err.message })
		}
	})
	return res
}
