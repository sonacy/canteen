import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { SENDCLOUD_FROM, SENDCLOUD_KEY, SENDCLOUD_USER } from './constants'

export const sendEmail = async (
	to: string,
	url: string,
	subject: string = 'Confirm Email'
) => {
	const body = new URLSearchParams()

	body.append('apiUser', SENDCLOUD_USER)
	body.append('apiKey', SENDCLOUD_KEY)
	body.append('from', SENDCLOUD_FROM)
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
