import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';

// Define your form data interface
export interface FormDataInterface {
    __v?: number,
    _id?: string,
    name: string;
    price: number;
    category: string;
}

// Mock categories data
const categories = ['Beverage', 'Food', 'Others'];

const MyForm: React.FC = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormDataInterface>();

    const onSubmit = async (data: FormDataInterface) => {
        const convertedData = {
            ...data,
            price: parseFloat(data.price as unknown as string), // Convert the price to a number
        };
        try {
            const response = await fetch('http://localhost:4002/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(convertedData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Server response:', result);

            // Optionally handle server response here

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            reset(); // Reset form fields after submission
        }
        // Handle form submission logic
    };

    return (
        <form
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px', padding: '16px' }}
        >
            <h2 className='text-2xl font-black text-center'>ADD ITEM</h2>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />
            <Controller
                name="price"
                control={control}
                defaultValue={0}
                rules={{
                    required: 'Price is required',
                    min: { value: 0.1, message: 'Price must be at least 0.1$' }
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        type="number"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            inputProps: {
                                min: 0.1, // Minimum value for the input
                                step: 'any' // Allows decimal values
                            }
                        }}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                )}
            />

            <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                    <FormControl fullWidth variant="outlined" error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            {...field}
                            label="Category"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value)}
                        >
                            {categories.map((cat, index) => (
                                <MenuItem key={index} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.category && <p className='text-red-500 text-[12px] px-5'>{errors.category.message}</p>}
                    </FormControl>
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

export default MyForm;
