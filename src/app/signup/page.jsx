'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from '../../redux/actions/UserActions'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography
} from '@material-tailwind/react'

// Initialize the yup validation schema
const schema = yup.object({
  UserName: yup.string().required('Username is required'),
  Email: yup.string().email().required('Email is required'),
  Password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  ConfirmPassword: yup
    .string()
    .oneOf(['', yup.ref('Password')], 'Passwords must match') // Updated validation
    .required('Confirm Password is required')
})

const Register = ({ location, history }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const useSignup = useSelector(state => state.userSignUp)
  const { userInfo, loading, error } = useSignup
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false
  })

  const [state, setState] = useState({
    UserName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '', // Added ConfirmPassword to state
    message: ''
  })

  const dispatch = useDispatch()
  const handlePasswordChange = e => {
    const password = e.target.value
    setPasswordStrength({
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    })
  }
  const redirect = location?.search ? location.search.split('=')[1] : '/login'
  const submitHandler = e => {
    e.preventDefault()
    if (
      !passwordStrength.length ||
      !passwordStrength.letter ||
      !passwordStrength.number
    ) {
      setMessage('Password is too weak')
    } else {
      if (!email) {
        setMessage('Email is required')
      }
      dispatch(SignUp(UserName, Password, Email))
      reset()
    }
    navigate('/homepage')
    useEffect(() => {
      if (userInfo) {
        history.push(redirect)
      }
    }, [history, userInfo, redirect])
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Card color='transparent' shadow={false} className='w-80 max-w-screen-md'>
        <img src='/logo.png' className='mx-auto mt-10 w-20' alt='logo-image' />

        <Typography variant='h4' color='blue-gray' className='text-center mt-6'>
          Sign Up
        </Typography>
        <Typography color='gray' className='text-center mt-2 font-normal'>
          Enter your details to register.
        </Typography>
        <form className='mt-6 w-full' onSubmit={handleSubmit(submitHandler)}>
          <div className='mb-10 space-y-6'>
            <Input
              size='lg'
              label='UserName'
              type='text'
              placeholder='UserName'
              {...register('UserName', { required: 'Username is required' })}
              onChange={e => setState({ ...state, UserName: e.target.value })}
              {...errors.UserName}
              value={state.UserName}
            />
            <Input
              size='lg'
              label='Email'
              placeholder='Email'
              {...register('Email')}
              onChange={e => setState({ ...state, Email: e.target.value })}
              {...errors.Email}
              value={state.Email}
            />
            <Input
              type='password'
              size='lg'
              label='Password'
              placeholder='Password'
              {...register('Password')}
              onChange={e => setState({ ...state, Password: e.target.value })}
              value={state.Password}
              {...errors.Password}
            />
            <Input
              type='password'
              size='lg'
              label='Confirm Password'
              placeholder='Confirm  Password'
              {...register('ConfirmPassword')}
              onChange={e =>
                setState({ ...state, ConfirmPassword: e.target.value })
              }
              value={state.ConfirmPassword}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant='small'
                color='gray'
                className='flex items-center font-normal'
              >
                I agree to the
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
          <Button className='mt-6' fullWidth type='submit'>
            Register
          </Button>
          <Typography color='gray' className='mt-4 text-center font-normal'>
            Already have an account?{' '}
            <a href='#' className='font-medium text-gray-900'>
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Register
