import { createWriteStream } from 'fs'
import { IUpload } from 'src/types/Upload'
import { Stream } from 'stream'
import { v4 } from 'uuid'

const writeFile = (stream: Stream, filename: string): Promise<string> => {
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
	const { mimetype, createReadStream } = await file

	const extension = mimetype.split('/')[1]
	const filename = `${v4()}.${extension}`

	return writeFile(createReadStream(), filename)
}
