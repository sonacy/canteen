import qiniu from 'qiniu'

const accessKey = process.env.QINIU_ACCESS_KEY || ''
const secretKey = process.env.QINIU_SECRET_KEY || ''

const config = new qiniu.conf.Config({
	zone: qiniu.zone.Zone_z2,
})

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
	scope: 'canteen',
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

// http://ppf806kjz.bkt.clouddn.com/06eeed06-33a4-41d5-84a0-f05b56949cfc.jpeg
export const streamUpload: (
	filename: string,
	stream: NodeJS.ReadableStream
) => Promise<string> = (filename, stream) => {
	return new Promise((resolve, reject) => {
		formUploader.putStream(
			uploadToken,
			filename,
			stream,
			putExtra,
			(respErr, respBody, respInfo) => {
				if (respErr) {
					reject(respErr)
				}
				if (respInfo.statusCode === 200) {
					// hash key
					resolve(respBody.key)
				} else {
					console.log(respInfo.statusCode)
					console.log(respBody)
					reject(respBody)
				}
			}
		)
	})
}
