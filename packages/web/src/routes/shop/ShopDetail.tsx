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

				const { name, address, phone, pics, foods } = data.detailShop

				return (
					<div>
						<div className={classes.topPics}>
							{pics ? (
								pics.map(url => (
									<div className={classes.pic} key={url}>
										<img src={`http://localhost:4000/images/${url}`} />
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
									<Button>修改商店</Button>
									<Button>上传图片</Button>
									<Button>添加食物</Button>
								</Button.Group>
							</div>
							<div className={classes.foods}>
								<div className={classes.foodTitle}>菜单</div>
								<div className={classes.foodCards}>
									{foods && foods.length > 0 ? (
										foods.map(food => (
											<Card
												key={food.id}
												hoverable={true}
												style={{ width: 200, marginRight: 4 }}
												cover={
													<img
														width={200}
														height={180}
														src={
															food.pics
																? `http://localhost:4000/images/${food.pics[0]}`
																: defaultImg
														}
													/>
												}
												actions={[
													<Icon type="edit" key="update" />,
													<Icon type="close" key="del" />,
													<Icon type="info-circle" key="info" />,
												]}
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
