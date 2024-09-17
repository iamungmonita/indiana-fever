import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';



export interface RegisterFormInterface {
    __v?: number,
    _id?: string,
    username: string;
    email: string;
    password: string;
    confirmPassword: string,
}

const RegisterForm: React.FC = () => {
    const { control, handleSubmit, watch, reset, setError, formState: { errors } } = useForm<RegisterFormInterface>();
    const passwordValue = watch('password');

    const onSubmit = async (data: RegisterFormInterface) => {
        if (data.password !== data.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        const { username, email, password } = data;
        fetch('http://localhost:4002/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password })
        }).then((res) => res.json()).then((data) => {
            if (data.admin) {
                console.log(data.admin);
                reset()

            }
            if (data.error) {
                Object.keys(data.error).forEach((key) => {
                    setError(key as keyof RegisterFormInterface, {
                        type: 'manual',
                        message: data.error[key]
                    });
                });
            }
        }).catch((err) => console.log(err)
        )
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
                defaultValue=''
                control={control}
                rules={{

                    required: 'Username is required',
                    minLength: {
                        value: 6,
                        message: 'Username must be at least 6 characters long'
                    },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        autoComplete="new-username" // To prevent autofill
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                )}
            />

            <Controller
                name="email"
                defaultValue=''
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address'
                    },
                    validate: value => value !== 'admin123@gmail.com' || 'This email is just an example'
                }}
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
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long'
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one number, and one special character'
                    }
                }}
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

            {/* Confirm Password Field */}
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                    required: 'Please confirm your password',
                    validate: value => value === passwordValue || 'Passwords do not match'
                }}
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
