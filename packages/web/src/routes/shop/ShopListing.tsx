import React from 'react'
import { ShopListController } from '@canteen/common'
import { Button, Spin, Empty, Icon } from 'antd'
import defaultImg from '../../assets/img/shop.jpg'
import { RouteComponentProps } from 'react-router'
import classes from './list.styl'

const ShopListing = ({ history }: RouteComponentProps) => {
	return (
		<ShopListController variables={{ pageNo: 1, pageSize: 10 }}>
			{({ data, loading }) => {
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
						{data && data.pageShop.length > 0 ? (
							data.pageShop.map(shop => (
								<div
									key={shop.id}
									className={classes.shopItem}
									onClick={() => {
										history.push(`/shop/detail/${shop.id}`)
									}}
								>
									<div className={classes.shopImg}>
										<img
											width={200}
											height={200}
											src={
												shop.pics && shop.pics.length > 0
													? `${process.env.REACT_APP_SERVER_URL}/images/${
															shop.pics[0]
													  }`
													: defaultImg
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
					</div>
				)
			}}
		</ShopListController>
	)
}

export default ShopListing
