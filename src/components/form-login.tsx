'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineMail } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'

import { Input } from './input-component'
import {
  LoginValidationData,
  loginValidation,
} from '@/validation/login-validation'
import { Button } from './button'
import { useAuth } from '@/hooks/auth'

export const Form = () => {
  const { isLoading, signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationData>({
    resolver: zodResolver(loginValidation),
  })

  const handleLogin = async ({ email, password }: LoginValidationData) => {
    await signIn({ email, password })
  }

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Input
        type="text"
        label="email"
        placeholder="Email"
        icon={AiOutlineMail}
        {...register('email')}
        error={errors.email && errors.email.message}
      />
      <Input
        type="password"
        label="password"
        placeholder="Senha"
        icon={BsKey}
        {...register('password')}
        error={errors.password && errors.password.message}
      />

      <Button
        type="submit"
        title="Entrar"
        isLoading={isLoading}
        isPrimary={true}
      />
    </form>
  )
}
