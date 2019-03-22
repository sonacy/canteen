import { Field, ID, ObjectType } from 'type-graphql'
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Shop } from './Shop'

@ObjectType()
@Entity()
export class Food extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string

	@Field()
	@Column()
	name: string

	@Field()
	@Column('int')
	price: number

	@Field()
	@Column('int')
	calories: number

	@Field(() => [String])
	@Column('simple-array')
	pics: string[]

	@Field(() => Shop, { nullable: true })
	@ManyToOne(() => Shop, shop => shop.foods)
	shop: Shop
}
