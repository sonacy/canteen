import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string

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
