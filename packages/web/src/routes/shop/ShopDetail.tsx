import React from 'react'
import classes from './detail.styl'
import { ShopDetailController } from '@canteen/common'
import { RouteComponentProps } from 'react-router'
import { Card, Button, Icon, Spin, Empty } from 'antd'
import defaultImg from '../../assets/img/food.png'

const ShopDetail = ({
	match,
	history,
}: RouteComponentProps<{ id: string }>) => {
	const id = match.params.id

	return (
		<ShopDetailController variables={{ id }}>
			{({ data, loading, error }) => {
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
				if (!data || !data.detailShop || error)
					return (
						<Empty description="数据不存在, 请返回">
							<Button
								type="primary"
								onClick={() => {
									history.push('/shop/list')
								}}
							>
								返回
							</Button>
						</Empty>
					)

				const { name, address, phone, pics, foods, id } = data.detailShop

				return (
					<div>
						<Button
							className={classes.backBtn}
							type="primary"
							shape="circle"
							icon="arrow-left"
							onClick={() => {
								history.push('/shop/list')
							}}
						/>
						<div
							className={classes.topPics}
							style={{
								justifyContent:
									pics && pics.length * 204 > window.innerWidth
										? 'left'
										: 'center',
							}}
						>
							{pics && pics.length > 0 ? (
								pics.map(url => (
									<div className={classes.pic} key={url}>
										<img src={`${process.env.QINIU_IMAGE_CDN}/${url}`} />
									</div>
								))
							) : (
								<div className={classes.emptyPic}>暂无图片</div>
							)}
						</div>
						<div className={classes.shopInfo}>
							<div className={classes.shopName}>{name}</div>
							<div className={classes.shopSubTitle}>
								<span>
									<Icon type="environment" />
									{address || '无'}
								</span>
							</div>
							<div className={classes.shopSubTitle}>
								<span>
									<Icon type="phone" />
									{phone || '无'}
								</span>
							</div>
							<div className={classes.btns}>
								<Button.Group>
									<Button
										onClick={() => {
											history.push('/shop/update', {
												name,
												address,
												phone,
												id,
											})
										}}
									>
										修改商店
									</Button>
									<Button
										onClick={() => {
											history.push(`/shop/upload/${id}`)
										}}
									>
										上传图片
									</Button>
									<Button
										onClick={() => {
											history.push('/food/create', {
												shopId: id,
											})
										}}
									>
										添加食物
									</Button>
								</Button.Group>
							</div>
							<div className={classes.foods}>
								<div className={classes.foodTitle}>菜单</div>
								<div className={classes.foodCards}>
									{foods && foods.length > 0 ? (
										foods.map(food => (
											<Card
												onClick={() => {
													history.push('/food/update', {
														shopId: id,
														food,
													})
												}}
												key={food.id}
												hoverable={true}
												style={{
													width: 200,
													marginRight: 8,
													marginBottom: 8,
												}}
												cover={
													<img
														width={200}
														height={180}
														src={
															food.pics && food.pics.length > 0
																? `${process.env.QINIU_IMAGE_CDN}/${
																		food.pics[food.pics.length - 1]
																  }`
																: defaultImg
														}
													/>
												}
											>
												<Card.Meta
													title={food.name}
													description={
														<>
															<span className={classes.foodItem}>
																<Icon type="pay-circle" />
																{food.price}元
															</span>
															<span className={classes.foodItem}>
																<Icon type="rest" />
																{food.calories}千卡
															</span>
														</>
													}
												/>
											</Card>
										))
									) : (
										<div className={classes.emptyFood}>还没有菜单</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)
			}}
		</ShopDetailController>
	)
}

export default ShopDetail
