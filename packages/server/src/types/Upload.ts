export interface IUpload {
	filename: string
	mimetype: string
	encoding: string
	createReadStream: () => NodeJS.ReadableStream
}
