import React from 'react'
import { ShopListController } from '@canteen/common'
import { View, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationScreenProps, FlatList } from 'react-navigation'
import defaultImg from '../../assets/food.png'
import { Image, Text, Divider } from 'react-native-elements'

class ShopList extends React.Component<NavigationScreenProps> {
	static navigationOptions = {
		title: '餐馆',
	}

	render() {
		return (
			<ShopListController variables={{ pageNo: 1, pageSize: 10 }}>
				{({ data, loading, error }) => {
					return (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
							}}>
							<Spinner visible={loading} size='large' />
							<FlatList
								ItemSeparatorComponent={() => <Divider />}
								keyExtractor={item => item.id}
								data={data ? data.pageShop : []}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity>
											<View
												style={{
													height: 120,
													flexDirection: 'row',
													alignItems: 'center',
													padding: 8,
												}}>
												<Image
													style={{
														width: 60,
														height: 60,
													}}
													source={
														item.pics && item.pics.length > 0
															? {
																	uri: `http://localhost:4000/images/${
																		item.pics[0]
																	}`,
															  }
															: defaultImg
													}
												/>
												<View
													style={{
														flex: 1,
														marginLeft: 8,
													}}>
													<Text
														numberOfLines={1}
														style={{
															fontSize: 16,
															lineHeight: 32,
															fontWeight: '700',
														}}>
														{item.name}
													</Text>
													<Text
														style={{
															fontSize: 12,
															lineHeight: 18,
															color: '#333',
														}}
														numberOfLines={1}>{`电话: ${item.phone ||
														'无'}`}</Text>
													<Text
														style={{
															fontSize: 12,
															lineHeight: 18,
															color: '#999',
														}}
														numberOfLines={2}>{`地址: ${item.address ||
														'无'}`}</Text>
												</View>
											</View>
										</TouchableOpacity>
									)
								}}
							/>
						</View>
					)
				}}
			</ShopListController>
		)
	}
}

export default ShopList
