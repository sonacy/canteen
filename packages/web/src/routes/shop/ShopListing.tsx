import React from 'react'
import { ShopListController } from '@canteen/common'
import { Waypoint } from 'react-waypoint'
import { Button, Spin, Empty, Icon } from 'antd'
import { RouteComponentProps } from 'react-router'
import classes from './list.styl'
import { defaultShopImg } from 'utils/contants'

const ShopListing = ({ history }: RouteComponentProps) => {
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
						{data && data.cursorShop.data.length > 0 ? (
							data.cursorShop.data.map((shop, index) => (
								<div
									key={shop.id}
									className={classes.shopItem}
									onClick={() => {
										history.push(`/shop/detail/${shop.id}`)
									}}
								>
									{data.cursorShop.data.length - index === 1 && (
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
