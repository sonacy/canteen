import React from 'react'
import { NavigationScreenProps, ScrollView } from 'react-navigation'
import { ShopDetailController } from '@canteen/common'
import { View, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import styles, { sliderWidth, itemWidth } from './slide.style'
import { Text, Icon, Divider, Image } from 'react-native-elements'
import defaultImg from '../../assets/food.png'

export default class ShopDetail extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '餐馆详情',
	}

	render() {
		const { getParam, navigate } = this.props.navigation
		const id = getParam('id', null)

		return (
			<ShopDetailController
				variables={{ id }}
				onAuthError={() => {
					navigate('Login', {
						next: 'ShopDetail',
						id,
					})
				}}>
				{({ data, loading }) => {
					return (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								backgroundColor: '#f5f5f5',
							}}>
							<Spinner visible={loading} size='large' />
							{data && data.detailShop && (
								<ScrollView>
									<Carousel
										loop={true}
										inactiveSlideScale={0.94}
										inactiveSlideOpacity={0.7}
										loopClonesPerSide={2}
										sliderWidth={sliderWidth}
										itemWidth={itemWidth}
										layout={'default'}
										hasParallaxImages={true}
										data={data.detailShop.pics || []}
										renderItem={({ item }, parallaxProps) => {
											return (
												<ParallaxImage
													{...parallaxProps}
													style={styles.image}
													containerStyle={styles.slideInnerContainer}
													source={{
														uri: `http://30.22.108.13:4000/images/${item}`,
													}}
												/>
											)
										}}
									/>
									<View
										style={{
											backgroundColor: '#fff',
											marginVertical: 24,
											padding: 12,
										}}>
										<Text
											style={{
												fontSize: 24,
												lineHeight: 36,
												fontWeight: '700',
											}}>
											{data.detailShop.name}
										</Text>
										<View
											style={{
												flexDirection: 'row',
												height: 36,
												alignItems: 'center',
											}}>
											<Icon size={18} name='phone' type='antdesign' />
											<Text
												numberOfLines={1}
												style={{
													fontSize: 16,
													lineHeight: 36,
													color: '#999',
													marginLeft: 12,
												}}>
												{data.detailShop.phone || '无'}
											</Text>
										</View>
										<View
											style={{
												flex: 1,
												flexDirection: 'row',
												alignItems: 'flex-start',
											}}>
											<Icon size={18} name='enviromento' type='antdesign' />
											<Text
												numberOfLines={2}
												style={{
													fontSize: 16,
													lineHeight: 24,
													paddingRight: 12,
													color: '#999',
													marginLeft: 12,
												}}>
												{data.detailShop.address || '无'}
											</Text>
										</View>
										<Divider style={{ marginVertical: 12 }} />
										<View
											style={{
												flexDirection: 'row',
											}}>
											<TouchableOpacity
												onPress={() => {
													navigate('ShopUpdate', {
														shop: {
															id: data.detailShop.id,
															address: data.detailShop.address,
															name: data.detailShop.name,
															phone: data.detailShop.phone,
														},
													})
												}}
												style={{
													flex: 1,
												}}>
												<Icon
													size={24}
													color='#999'
													type='antdesign'
													name='edit'
												/>
												<Text
													style={{
														textAlign: 'center',
														color: '#999',
														fontSize: 14,
														marginTop: 8,
													}}>
													编辑商铺
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => {
													navigate('ShopUpload', {
														id: data.detailShop.id,
													})
												}}
												style={{
													flex: 1,
												}}>
												<Icon
													size={24}
													color='#999'
													type='antdesign'
													name='upload'
												/>
												<Text
													style={{
														textAlign: 'center',
														color: '#999',
														fontSize: 14,
														marginTop: 8,
													}}>
													上传图片
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => {
													navigate('FoodCreate', {
														id: data.detailShop.id,
													})
												}}
												style={{
													flex: 1,
												}}>
												<Icon
													size={24}
													color='#999'
													type='antdesign'
													name='plus'
												/>
												<Text
													style={{
														textAlign: 'center',
														color: '#999',
														fontSize: 14,
														marginTop: 8,
													}}>
													添加菜单
												</Text>
											</TouchableOpacity>
										</View>
									</View>

									<View>
										<Text
											style={{
												color: '#999',
												fontSize: 18,
												lineHeight: 24,
												marginLeft: 8,
												marginBottom: 12,
											}}>
											菜单
										</Text>

										{(data.detailShop.foods || []).map(item => (
											<TouchableOpacity
												onPress={() => {
													navigate('FoodUpdate', {
														id: data.detailShop.id,
														food: item,
													})
												}}
												style={{
													height: 96,
													flexDirection: 'row',
													marginBottom: 12,
													backgroundColor: '#fff',
												}}
												key={item.id}>
												<Image
													style={{
														width: 148,
														height: 96,
													}}
													source={
														item.pics && item.pics.length > 0
															? {
																	uri: `http://30.22.108.13:4000/images/${
																		item.pics[0]
																	}`,
															  }
															: defaultImg
													}
												/>
												<View
													style={{
														justifyContent: 'center',
														marginLeft: 18,
													}}>
													<Text
														numberOfLines={1}
														style={{
															fontSize: 24,
															lineHeight: 40,
															fontWeight: '700',
														}}>
														{item.name}
													</Text>
													<View
														style={{
															flexDirection: 'row',
															height: 24,
															alignItems: 'center',
														}}>
														<Icon
															size={16}
															color='#999'
															name='rmb'
															type='font-awesome'
														/>
														<Text
															style={{
																fontSize: 16,
																color: '#666',
																marginLeft: 8,
															}}>
															{item.price || 0}
														</Text>
													</View>
													<View
														style={{
															flexDirection: 'row',
															height: 24,
															alignItems: 'center',
														}}>
														<Icon
															size={16}
															color='#999'
															name='fire'
															type='font-awesome'
														/>
														<Text
															style={{
																fontSize: 16,
																color: '#666',
																marginLeft: 8,
															}}>
															{item.calories || 0}
														</Text>
													</View>
												</View>
											</TouchableOpacity>
										))}
									</View>
								</ScrollView>
							)}
						</View>
					)
				}}
			</ShopDetailController>
		)
	}
}
