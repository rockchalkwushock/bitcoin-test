import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mutation, useMutation } from '@tanstack/react-query'

const RegistrationFormSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: 'Must be of type string.',
        required_error: 'Email is a required field.',
      })
      .email(),
    firstName: z.string({
      invalid_type_error: 'Must be of type string.',
      required_error: 'First name is a required field.',
    }),
    lastName: z.string({
      invalid_type_error: 'Must be of type string.',
      required_error: 'Last name is a required field.',
    }),
    phone: z.string({
      invalid_type_error: 'Must be of type string.',
      required_error: 'Phone is a required field.',
    }),
    password: z.string({
      invalid_type_error: 'Must be of type string.',
      required_error: 'Password is a required field.',
    }),
  })
  .required()

type RegistrationFormType = z.infer<typeof RegistrationFormSchema>

export const RegistrationForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(RegistrationFormSchema),
  })

  const mutate = useMutation(async data => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    } catch (error) {
      throw new Error('useMutation')
    }
  })

  const onSubmit: SubmitHandler<RegistrationFormType> = async inputs => {
    try {
      await mutate.mutateAsync(inputs)
    } catch (error) {
      throw new Error('onSubmit')
    }
  }
  return (
    <form
      className="flex flex-col space-y-6 w-1/4 mx-auto"
      id="registration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="outline-none border-0 rounded-lg shadow-md shadow-pink-500 text-black"
        placeholder="turd@gmail.com"
        type="email"
        {...register('email')}
      />
      {errors.email && <span className="">{errors.email.message}</span>}
      <input
        className="outline-none border-0 rounded-lg shadow-md shadow-pink-500 text-black"
        placeholder="Turd"
        type="text"
        {...register('firstName')}
      />
      {errors.firstName && <span className="">{errors.firstName.message}</span>}
      <input
        className="outline-none border-0 rounded-lg shadow-md shadow-pink-500 text-black"
        placeholder="Ferguson"
        type="text"
        {...register('lastName')}
      />
      {errors.lastName && <span className="">{errors.lastName.message}</span>}
      <input
        className="outline-none border-0 rounded-lg shadow-md shadow-pink-500 text-black"
        placeholder="316-226-3833"
        type="tel"
        {...register('phone')}
      />
      {errors.phone && <span className="">{errors.phone.message}</span>}
      <input
        className="outline-none border-0 rounded-lg shadow-md shadow-pink-500 text-black"
        placeholder="that's a funny name"
        type="password"
        {...register('password')}
      />
      {errors.password && <span className="">{errors.password.message}</span>}

      <button
        className="border-0 bg-pink-500 text-white rounded-lg"
        disabled={isSubmitting}
        type="submit"
      >
        Register
      </button>
    </form>
  )
}
