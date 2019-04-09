import { ObjectType } from 'type-graphql'
import { Food } from '../../entity/Food'
import PaginatedResponse from '../shared/pagination'

@ObjectType()
export default class FoodPagination extends PaginatedResponse(Food) {}
