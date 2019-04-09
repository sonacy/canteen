import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Base extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string

	@Column('bigint')
	@Field()
	createdTime: number

	@Column('bigint')
	@Field()
	updatedTime: number

	@BeforeInsert()
	beforeInsert() {
		this.createdTime = Date.now()
		this.updatedTime = Date.now()
	}

	@BeforeUpdate()
	beforeUpdate() {
		this.updatedTime = Date.now()
	}
}
