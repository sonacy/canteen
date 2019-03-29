import { object, string } from 'yup'

export const registerValidation = object().shape({
	name: string()
		.min(3, '用户名长度不能小于3')
		.max(255, '用户名长度不能高于255')
		.required('用户名不能为空'),
	email: string()
		.min(3, '邮箱长度不能小于3')
		.max(255, '邮箱长度不能高于255')
		.email('邮箱格式不正确')
		.required('邮箱不能为空'),
	password: string()
		.min(6, '密码长度不能小于6')
		.max(255, '密码长度不能高于255')
		.required('密码不能为空'),
})
