import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

export interface SignInInterface {
    email: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one number, and one special character'),
});

const SignInForm: React.FC = () => {
    const { control, handleSubmit, setError, formState: { errors } } = useForm<SignInInterface>({
        resolver: yupResolver(validationSchema)
    });
    const router = useRouter()
    const onSubmit = (data: SignInInterface) => {
        const { email, password } = data
        fetch('http://localhost:4002/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        }).then((res) => res.json()).then((data) => {
            if (data.admin) {
                router.push('/dashboard')
            }
            if (data.error) {
                Object.keys(data.error).forEach((key) => {
                    setError(key as keyof SignInInterface, {
                        type: 'manual',
                        message: data.error[key]
                    });
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <form
            className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-lg -translate-y-1/2'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px', padding: '16px' }}
        >
            <h2 className='text-2xl font-bold text-center'>Sign In</h2>

            <Controller
                name="email"
                defaultValue=''
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-password" // To prevent autofill
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Submit
            </Button>
        </form>
    );
};

export default SignInForm;
