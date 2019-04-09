import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '../shared/Base'
import { Food } from './Food'

@ObjectType()
@Entity()
export class Shop extends Base {
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
