import { ClassType, Field, Int, ObjectType } from 'type-graphql'

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType({ isAbstract: true })
	abstract class PaginatedResponseClass {
		// here we use the runtime argument
		@Field(() => [TItemClass])
		// and here the generic type
		data: TItem[]

		@Field(() => Int)
		total: number

		@Field()
		hasMore: boolean
	}
	return PaginatedResponseClass
}
