'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../redux/actions/UserActions'
import { Card, Input, Button,Checkbox, Typography } from '@material-tailwind/react'

const schema = yup.object({
  Email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  Password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and one special case Character'
    )
})

export default function login () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, error } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      router.push('/homepage') // Redirect to homepage after successful login
    }
  }, [userInfo, router])

  const onSubmit = data => {
    dispatch(Login(data.Email, data.Password))
  }

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your details to Login.
      </Typography>
      <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <div className='mb-4 flex flex-col gap-6'>
          <Input size='lg' label='Email' />
          <Input type='password' size='lg' label='Password' />
        </div>
        <Checkbox
          label={
            <Typography
              variant='small'
              color='gray'
              className='flex items-center font-normal'
            >
              I agree the
              <a
                href='#'
                className='font-medium transition-colors hover:text-gray-900'
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button className='mt-6' fullWidth>
          Login
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Have no account?{' '}
          <a href='#' className='font-medium text-gray-900'>
            Sign up
          </a>
        </Typography>
      </form>
    </Card>
  )
}
