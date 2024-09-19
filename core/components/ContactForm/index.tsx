import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button } from '@mui/material';

export interface ContactFormInterface {
    __v?: number,
    _id?: string,
    name: string,
    email: string,
    message: string,
}

const schema = Yup.object().shape({
    name: Yup.string().required('Your name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    message: Yup.string().required('Message is required, so we know what you want to talk to us about')
})
const Form = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInterface>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: ContactFormInterface) => {
        fetch('http://localhost:4002/message/send', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then((res) => res.json()).then((data) => {
            if (data.sender) {
                reset()
            }
        }).catch((err) => console.log(err))
    }
    return (
        <form
            className='shadow-lg bg-white'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '30px' }}
        >
            <h2 className='text-2xl font-black text-center'>Say Hello </h2>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        type='text'
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type='email'
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
            <Controller
                name="message"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type='textarea'
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                    />
                )}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
            >
                Send Message
            </Button>
        </form>
    )
}

export default Form