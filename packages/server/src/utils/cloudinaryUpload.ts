import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME || '',
	api_key: process.env.CLOUDINARY_KEY || '',
	api_secret: process.env.CLOUDINARY_SECRET || '',
})

export const uploadFile = (
	readStream: NodeJS.ReadableStream
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			(result: any) => {
				resolve(result.url)
			},
			{
				folder: 'canteen',
			}
		)
		readStream.pipe(stream).on('error', reject)
	})
}
