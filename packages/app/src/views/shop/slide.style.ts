import { StyleSheet, Dimensions, Platform } from 'react-native'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
	'window'
)

function wp(percentage: number) {
	const value = (percentage * viewportWidth) / 100
	return Math.round(value)
}

const slideHeight = viewportHeight * 0.24
const slideWidth = wp(75)
const itemHorizontalMargin = wp(2)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2

const entryBorderRadius = 8

export default StyleSheet.create({
	slideInnerContainer: {
		width: itemWidth,
		height: slideHeight,
		paddingHorizontal: itemHorizontalMargin,
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: 'white',
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
		borderRadius: IS_IOS ? entryBorderRadius : 0,
		borderTopLeftRadius: entryBorderRadius,
		borderTopRightRadius: entryBorderRadius,
	},
})
