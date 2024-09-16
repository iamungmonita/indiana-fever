import * as yup from 'yup'


export const RegisterSchema = yup.object({
    username: yup.string().required('username is required'),
    email: yup.string().email('email is invalid').required(),
    password: yup.string()
        .required('password is required')
        .min(8, 'password must be at least 8 characters long')
        .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'password must contain at least one number')
        .matches(/[0-9]/, 'password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
})