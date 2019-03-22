import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Food } from './Food'

@ObjectType()
@Entity()
export class Shop extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string

	@Field()
	@Column()
	name: string

	@Field({ nullable: true })
	@Column('varchar', { length: 255, nullable: true })
	address: string

	@Field({ nullable: true })
	@Column('varchar', { length: 255, nullable: true })
	phone: string

	@Field(() => [String], { nullable: true })
	@Column('simple-array', { nullable: true })
	pics: string[]

	@Field(() => [Food], { nullable: true })
	@OneToMany(() => Food, food => food.shop)
	foods: Food[]
}
