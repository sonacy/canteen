import fetch from 'node-fetch'
import { URLSearchParams } from 'url'

export const sendEmail = async (
	to: string,
	url: string,
	subject: string = 'Confirm Email'
) => {
	const body = new URLSearchParams()

	body.append('apiUser', process.env.SENDCLOUD_USER || '')
	body.append('apiKey', process.env.SENDCLOUD_KEY || '')
	body.append('from', process.env.SENDCLOUD_FROM || '')
	body.append('to', to)
	body.append('subject', subject)
	body.append(
		'html',
		`<html>
      <body>
        <p>welcome to sonacy land, click the link to complete the action!</p>
        <a href="${url}">${subject}</a>
      </body>
    </html>`
	)

	const resp = await fetch('http://api.sendcloud.net/apiv2/mail/send', {
		method: 'POST',
		body,
	})
	const json = await resp.json()

	return json
}
