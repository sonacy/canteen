import { ObjectType } from 'type-graphql'
import { Shop } from '../../entity/Shop'
import PaginatedResponse from '../shared/pagination'

@ObjectType()
export default class ShopPagination extends PaginatedResponse(Shop) {}
