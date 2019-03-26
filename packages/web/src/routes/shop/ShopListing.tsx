import React from 'react'
import { ShopListController } from '@canteen/common'
import { List, Button, Card } from 'antd'
import defaultImg from '../../assets/img/default.jpg'
import { RouteComponentProps } from 'react-router'

const ShopListing = ({ history }: RouteComponentProps) => {
	return (
		<ShopListController variables={{ pageNo: 1, pageSize: 10 }}>
			{({ data, error, loading, fetchMore }) => {
				return (
					<div style={{ width: 800, height: '100%', margin: 'auto' }}>
						<List
							header={
								<Button
									onClick={() => {
										history.push('/shop/create')
									}}
									type="primary"
									ghost={true}
								>
									添加
								</Button>
							}
							grid={{ gutter: 16, column: 4 }}
							loading={loading}
							dataSource={data!.pageShop}
							renderItem={(item: any) => (
								<List.Item key={item.id}>
									<Card
										hoverable={true}
										cover={
											<img
												height={160}
												src={
													item.pics
														? `http://localhost:4000/images/${item.pics[0]}`
														: defaultImg
												}
											/>
										}
									>
										<Card.Meta
											title={item.name}
											description={
												<>
													<div
														style={{
															whiteSpace: 'nowrap',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>{`地址: ${item.address || '无'}`}</div>
													<div
														style={{
															whiteSpace: 'nowrap',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
														}}
													>{`电话: ${item.phone || '无'}`}</div>
												</>
											}
										/>
									</Card>
								</List.Item>
							)}
						/>
					</div>
				)
			}}
		</ShopListController>
	)
}

export default ShopListing
