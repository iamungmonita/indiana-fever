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
            className='lg:text-black-500 w-full'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '30px' }}
        >
            <h2 className='text-2xl font-black text-center'>Leave us a message </h2>
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
                    // InputProps={{
                    //     style: { borderColor: 'black' },
                    //     // Optionally, you can add classes or other styles here
                    // }}
                    // InputLabelProps={{
                    //     style: { color: 'black' } // Change label color to black if needed
                    // }}
                    // // Alternatively, you could also use sx prop if you're using Material-UI v5
                    // sx={{
                    //     '& .MuiOutlinedInput-root': {
                    //         '& fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //         '&:hover fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //         '&.Mui-focused fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //     },
                    // }}
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
                    // InputProps={{
                    //     style: { borderColor: 'black' },
                    //     // Optionally, you can add classes or other styles here
                    // }}
                    // InputLabelProps={{
                    //     style: { color: 'black' } // Change label color to black if needed
                    // }}
                    // // Alternatively, you could also use sx prop if you're using Material-UI v5
                    // sx={{
                    //     '& .MuiOutlinedInput-root': {
                    //         '& fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //         '&:hover fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //         '&.Mui-focused fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //     },
                    // }}
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
                    // InputProps={{
                    //     style: { borderColor: 'black' },
                    //     // Optionally, you can add classes or other styles here
                    // }}
                    // InputLabelProps={{
                    //     style: { color: 'black' } // Change label color to black if needed
                    // }}
                    // Alternatively, you could also use sx prop if you're using Material-UI v5
                    // sx={{
                    //     '& .MuiOutlinedInput-root': {
                    //         '& fieldset': {
                    //             borderColor: 'black',
                    //         },
                    //         '&:hover fieldset': {
                    //             borderColor: 'white',
                    //         },
                    //         '&.Mui-focused fieldset': {
                    //             borderColor: 'white',
                    //         },
                    //     },
                    // }}
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