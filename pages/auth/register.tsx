import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

// Define the validation schema
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters long'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address')
        .notOneOf(['admin123@gmail.com'], 'This email is just an example'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one number, and one special character'),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export interface RegisterFormInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const { control, handleSubmit, reset, setError, formState: { errors } } = useForm<RegisterFormInterface>({
        resolver: yupResolver(validationSchema) // Integrate Yup validation
    });

    const router = useRouter()

    const onSubmit = async (data: RegisterFormInterface) => {
        const { username, email, password } = data;

        fetch('http://localhost:4002/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.admin) {
                    router.push('/auth/sign-in')
                    // alert('success') replace by a modal
                    reset();
                }
                if (data.error) {
                    Object.keys(data.error).forEach((key) => {
                        setError(key as keyof RegisterFormInterface, {
                            type: 'manual',
                            message: data.error[key]
                        });
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form
            className='absolute top-1/2 left-1/2 -translate-x-1/2 rounded-lg -translate-y-1/2'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px', padding: '16px' }}
        >
            <h2 className='text-2xl font-bold text-center'>Register</h2>

            <Controller
                name="username"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                )}
            />

            <Controller
                name="email"
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
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-password"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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

export default RegisterForm;
