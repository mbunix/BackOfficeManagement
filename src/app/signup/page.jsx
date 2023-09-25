'use client'
import { Link } from 'next/link'
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
  FirstName: yup.string().required('First Name is required'),
  LastName: yup.string().required('Last Name is required'),
  Email: yup.string().email().required('Email is required'),
  Password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  PhoneNumber: yup.string().required('Phone Number is required'),
  Address: yup.string().required('Address is required'),
  Gender: yup.string().required('Enter your gender'),
  Profession: yup.string().required('Profession is required')
})

const Register = () => {
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

  const [state, setState] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
    Address: '',
    Gender: '',
    Profession: '',
    message: ''
  })

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false
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

  const submitHandler = data => {
    // Use "data" from the form for submission
    if (
      !passwordStrength.length ||
      !passwordStrength.letter ||
      !passwordStrength.number
    ) {
      setState({ ...state, message: 'Password is too weak' })
    } else {
      if (!data.Email) {
        setState({ ...state, message: 'Email is required' })
      } else {
        // Dispatch the signup action with form data
        dispatch(SignUp(data.FirstName, data.Password, data.Email))
        console.log(data.FirstName, data.Password, data.Email)
        // Reset the form
        setState({ ...state, message: '' })
      }
    }
    // router.push('/dashboard') // Navigate using router.push
  }

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Sign Up
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your details to register.
      </Typography>
      <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <div className='mb-4 flex flex-col gap-6'>
          <Input size='lg' label='Name' />
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
  )
}

export default Register
