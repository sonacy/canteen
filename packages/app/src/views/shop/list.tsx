import React from 'react'
import { ShopListController } from '@canteen/common'
import { View, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationScreenProps, FlatList } from 'react-navigation'
import defaultImg from '../../assets/shop.jpg'
import { Image, Text, Divider, Icon } from 'react-native-elements'

class ShopList extends React.Component<NavigationScreenProps> {
	static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
		title: '餐馆列表',
		headerLeft: (
			<TouchableOpacity
				style={{ marginLeft: 12 }}
				onPress={() => {
					navigation.navigate('ShopCreate')
				}}>
				<Icon name='add' color='#fff' />
			</TouchableOpacity>
		),
	})

	render() {
		return (
			<ShopListController
				variables={{ pageNo: 1, pageSize: 10 }}
				onAuthError={() => {
					this.props.navigation.navigate('Login', {
						next: 'ShopList',
					})
				}}>
				{({ data, loading }) => {
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
										<TouchableOpacity
											style={{
												height: 96,
												flexDirection: 'row',
												alignItems: 'center',
												padding: 8,
											}}
											onPress={() => {
												this.props.navigation.navigate('ShopDetail', {
													id: item.id,
												})
											}}>
											<Image
												style={{
													width: 60,
													height: 60,
												}}
												source={
													item.pics && item.pics.length > 0
														? {
																uri: `http://30.22.108.11:4000/images/${
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
														lineHeight: 24,
														fontWeight: '700',
													}}>
													{item.name}
												</Text>
												<Text
													style={{
														fontSize: 12,
														lineHeight: 24,
														color: '#333',
													}}
													numberOfLines={1}>{`电话: ${item.phone ||
													'无'}`}</Text>
												<Text
													style={{
														fontSize: 12,
														lineHeight: 24,
														color: '#999',
													}}
													numberOfLines={1}>{`地址: ${item.address ||
													'无'}`}</Text>
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
