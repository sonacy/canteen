import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { User } from 'src/entity/User'

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint
	implements ValidatorConstraintInterface {
	validate(name: string) {
		return User.findOne({ where: { name } }).then(user => {
			if (user) {
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
