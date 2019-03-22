import { IsEmail, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist'
import { IsNameAlreadyExist } from './isNameAlreadyExist'

@InputType()
export default class RegisterInput {
	@Field()
	@Length(3, 255)
	@IsNameAlreadyExist({
		message: 'name already taken',
	})
	name: string

	@Field()
	@Length(6, 18)
	password: string

	@Field()
	@IsEmail()
	@IsEmailAlreadyExist({
		message: 'email already in use',
	})
	email: string
}
