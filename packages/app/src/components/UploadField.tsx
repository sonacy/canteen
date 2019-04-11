import * as React from 'react'
import { FieldProps } from 'formik'
import { Image, Icon } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import { ReactNativeFile } from 'apollo-upload-client'
import { View, TouchableOpacity } from 'react-native'

export class UploadField extends React.Component<FieldProps<any>> {
	onPress = async () => {
		const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
		if (status !== 'granted') {
			await Permissions.askAsync(Permissions.CAMERA_ROLL)
		}
		const imageResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'Images',
		})
		if (!imageResult.cancelled) {
			const {
				field: { name, value },
				form: { setFieldValue },
			} = this.props
			const images = value

			let type: string = imageResult.type
			if (!type.includes('image/')) {
				const ext = imageResult.uri.slice(imageResult.uri.lastIndexOf('.') + 1)
				switch (ext) {
					case 'gif':
						type = 'image/gif'
						break
					case 'png':
						type = 'image/png'
						break
					case 'jpeg':
					case 'jpg':
						type = 'image/jpeg'
						break
					case 'bmp':
						type = 'image/bmp'
						break
					case 'webp':
						type = 'image/webp'
						break
					default:
						type = 'image/jpeg'
						break
				}
			}

			images.push(
				new ReactNativeFile({
					uri: imageResult.uri,
					type,
					name: 'picture',
				})
			)

			setFieldValue(name, images)
		}
	}

	render() {
		const {
			field, // { name, value, onChange, onBlur }
			form: _, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
			...props
		} = this.props
		return (
			<View
				{...props}
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					marginHorizontal: '5%',
				}}>
				{field.value.map((image: ReactNativeFile) => (
					<Image
						key={image.uri}
						source={{ uri: image.uri }}
						style={{
							width: 80,
							height: 100,
							margin: 4,
						}}
					/>
				))}
				<TouchableOpacity
					onPress={this.onPress}
					style={{
						margin: 4,
						width: 80,
						height: 100,
						borderWidth: 1,
						borderColor: '#ccc',
						justifyContent: 'center',
					}}>
					<Icon type='antdesign' name='plus' color='#ccc' size={32} />
				</TouchableOpacity>
			</View>
		)
	}
}
