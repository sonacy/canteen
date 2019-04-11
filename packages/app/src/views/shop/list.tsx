import React from 'react'
import { ShopListController } from '@canteen/common'
import {
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { NavigationScreenProps } from 'react-navigation'
import { Image, Text, Divider, Icon } from 'react-native-elements'
import { defaultShopImg } from '../../utils/constants'

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
				variables={{ size: 10 }}
				onAuthError={() => {
					this.props.navigation.navigate('Login', {
						next: 'ShopList',
					})
				}}>
				{({ data, loading, fetchMore }) => {
					if (!data || !data.cursorShop) return null

					return (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
							}}>
							<Spinner visible={loading} size='large' />
							<FlatList
								ListFooterComponent={() => {
									return (
										<View
											style={{
												height: 32,
												flex: 1,
												justifyContent: 'center',
												alignItems: 'center',
											}}>
											{data.cursorShop.hasMore ? (
												<ActivityIndicator animating={true} />
											) : (
												<Text>没有更多数据</Text>
											)}
										</View>
									)
								}}
								ItemSeparatorComponent={() => <Divider />}
								keyExtractor={item => item.id}
								data={data ? data.cursorShop.data : []}
								onEndReachedThreshold={0.1}
								onEndReached={() => {
									if (data.cursorShop.hasMore) {
										const lastItem =
											data.cursorShop.data[data.cursorShop.data.length - 1]
										fetchMore({
											variables: {
												size: 10,
												cursor: lastItem.id,
											},
											updateQuery: (pv, { fetchMoreResult }) => {
												if (!fetchMoreResult) {
													return pv
												}
												return {
													cursorShop: {
														__typename: fetchMoreResult.cursorShop.__typename,
														data: [
															...pv.cursorShop.data,
															...fetchMoreResult.cursorShop.data,
														],
														hasMore: fetchMoreResult.cursorShop.hasMore,
													},
												}
											},
										})
									}
								}}
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
												source={{
													uri:
														item.pics && item.pics.length > 0
															? item.pics[0]
															: defaultShopImg,
												}}
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
