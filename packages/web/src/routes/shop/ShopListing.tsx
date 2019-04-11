import React from 'react'
import { ShopListController } from '@canteen/common'
import { Waypoint } from 'react-waypoint'
import { Button, Spin, Empty, Icon } from 'antd'
import { RouteComponentProps } from 'react-router'
import classes from './list.styl'
import { defaultShopImg } from 'utils/contants'
import { ShopAddedSubscription_shopAdded } from '@canteen/common/dist/types/ShopAddedSubscription'

interface IProps extends RouteComponentProps {
	addedShop?: ShopAddedSubscription_shopAdded
}

const ShopListing = ({ history, addedShop }: IProps) => {
	const size = 5

	return (
		<ShopListController variables={{ size }}>
			{({ data, loading, fetchMore }) => {
				if (loading)
					return (
						<Spin
							style={{
								position: 'fixed',
								top: '50%',
								left: '50%',
							}}
							size="large"
							spinning={loading}
						/>
					)

				let shops: ShopAddedSubscription_shopAdded[] = []
				if (data) {
					if (addedShop) {
						shops = [addedShop, ...data.cursorShop.data]
					} else {
						shops = [...data.cursorShop.data]
					}
				} else {
					if (addedShop) {
						shops = [addedShop]
					}
				}
				return (
					<div className={classes.shopListContainer}>
						<Button
							className={classes.addBtn}
							type="primary"
							shape="circle"
							icon="plus"
							onClick={() => {
								history.push('/shop/create')
							}}
						/>
						{shops.length > 0 ? (
							shops.map((shop, index) => (
								<div
									key={shop.id}
									className={classes.shopItem}
									onClick={() => {
										history.push(`/shop/detail/${shop.id}`)
									}}
								>
									{shops.length - index === 1 && (
										<Waypoint
											onEnter={() => {
												fetchMore({
													variables: {
														size,
														cursor: shop.id,
													},
													updateQuery: (pv, { fetchMoreResult }) => {
														if (!fetchMoreResult) {
															return pv
														}
														return {
															cursorShop: {
																__typename:
																	fetchMoreResult.cursorShop.__typename,
																data: [
																	...pv.cursorShop.data,
																	...fetchMoreResult.cursorShop.data,
																],
																hasMore: fetchMoreResult.cursorShop.hasMore,
															},
														}
													},
												})
											}}
										/>
									)}
									<div className={classes.shopImg}>
										<img
											width={200}
											height={200}
											src={
												shop.pics && shop.pics.length > 0
													? shop.pics[0]
													: defaultShopImg
											}
										/>
									</div>
									<div className={classes.shopDetail}>
										<div className={classes.shopName}>{shop.name}</div>
										<div className={classes.shopSubTitle}>
											<Icon type="environment" />
											{shop.address || '无'}
										</div>
										<div className={classes.shopSubTitle}>
											<Icon type="phone" />
											{shop.phone || '无'}
										</div>
									</div>
								</div>
							))
						) : (
							<Empty description="没有商户信息,请添加" />
						)}
						{data && data.cursorShop.data.length > 0 && (
							<div
								style={{
									height: 64,
									lineHeight: '64px',
									textAlign: 'center',
								}}
							>
								{data.cursorShop.hasMore ? (
									<>
										<span style={{ marginRight: 8 }}>加载中</span>
										<Spin spinning={true} size="small" />
									</>
								) : (
									<span>没有更多数据</span>
								)}
							</div>
						)}
					</div>
				)
			}}
		</ShopListController>
	)
}

export default ShopListing
