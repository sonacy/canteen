import { createWriteStream } from 'fs'
import { IUpload } from '../../types/Upload'
import { uploadFile } from '../../utils/cloudinaryUpload'

export const writeFile = (
	stream: NodeJS.ReadableStream,
	filename: string
): Promise<string> => {
	return new Promise((resolve, reject) => {
		stream
			.pipe(createWriteStream(`images/${filename}`))
			.on('error', reject)
			.on('finish', async () => {
				resolve(filename)
			})
	})
}

export const processUpload = async (file: Promise<IUpload>) => {
	const { createReadStream } = await file

	const key = await uploadFile(createReadStream())

	return key
}
