import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from '../shared/Base'
import { Shop } from './Shop'

@ObjectType()
@Entity()
export class Food extends Base {
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
