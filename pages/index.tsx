import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/register";

export interface FormValues {
  username: string,
  email: string,
  password: string
}

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(RegisterSchema)
  })
  const submitFunction = async (data: FormValues) => {
    console.log('submitted form', data);
    try {
      const response = await fetch('http://localhost:4002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
  }



  return (
    <form
      className="min-w-[500px] space-y-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onSubmit={handleSubmit(submitFunction)} noValidate>
      <label htmlFor="username">Username</label>
      <p className="text-sm text-red-500">{errors.username?.message}</p>
      <input
        type="text"
        id="username"
        className="border outline-none p-2 w-full bg-gray-200"
        {...register('username')} />

      <label htmlFor="email">Email</label>
      <p className="text-sm text-red-500">{errors.email?.message}</p>
      <input
        type="email"
        id="email"
        className="border outline-none p-2 w-full bg-gray-200"
        {...register('email')} />

      <label htmlFor="Password">Password</label>
      <p className="text-sm text-red-500">{errors.password?.message}</p>
      <input
        type="password"
        id="password"

        className="border outline-none p-2 w-full bg-gray-200"
        {...register('password')} />

      <input
        type="submit"
        value="Submit"
        className="bg-blue-400 w-full p-2" />
    </form>
  );
}
