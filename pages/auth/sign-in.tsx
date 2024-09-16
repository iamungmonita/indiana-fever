import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { RegisterFormInterface } from './register';

const SignInForm: React.FC = () => {
    const { control, reset, handleSubmit, formState: { errors } } = useForm<RegisterFormInterface>();

    const onSubmit = (data: RegisterFormInterface) => {
        console.log(data);

        // try {
        //     const response = await fetch('http://localhost:4002/sign-in', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }

        //     const result = await response.json();
        //     console.log('Server response:', result);

        //     // Optionally handle server response here

        // } catch (error) {
        //     console.error('There was a problem with the fetch operation:', error);
        // } finally {
        //     reset(); // Reset form fields after submission
        // }
        reset()
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
