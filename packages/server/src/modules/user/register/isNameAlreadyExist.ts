import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { User } from '../../../entity/User'

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint
	implements ValidatorConstraintInterface {
	validate(name: string) {
		return User.findOne({ where: { name } }).then(user => {
			if (user && user.confirmed) {
				return false
			}
			return true
		})
	}
}

export function IsNameAlreadyExist(validationOptions?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsNameAlreadyExistConstraint,
		})
	}
}
