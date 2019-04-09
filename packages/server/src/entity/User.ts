import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { Base } from '../shared/Base'

@ObjectType()
@Entity()
export class User extends Base {
	@Field()
	@Column()
	name: string

	@Field()
	@Column('varchar', { length: 255, unique: true })
	email: string

	@Column()
	password: string

	@Column('bool', { default: false })
	confirmed: boolean

	@Column('bool', { default: false })
	isLocked: boolean
}
