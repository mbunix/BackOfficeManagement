import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography
} from '@material-tailwind/react'

//initialize the yup validation schema
const schema = yup.object({
  FirstName: yup.string().required('First Name is required'),
  LastName: yup.string().required('Last Name is required'),
  Email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  PhoneNumber: yup.string().required('Phone Number is required'),
  Address: yup.string().required('Address is required'),
  Gender: yup.string().required('Enter your gender'),
  Profession: yup.string().required('Profession is required')
})

//the register page componentfunction

const Register = ({ location, history }) => {
  const {
    register,
    formstate: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })
  const useSignup = useSelector(state => state.userSignUp)
  const { userInfo, loading, error } = useSignup
  const { state, setstate } = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    password: '',
    confirmPassword: '',
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
  const redirect = location?.search ? location.search.split('=')[1] : '/login'
  const dispatch = useDispatch()
  const handlePasswordChange = e => {
    const password = e.target.value
    setPasswordStrength({
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    })
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

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
      dispatch(SignUp(name, password, email))
      console.log(name, password, email)
      reset()
    }
    navigate('/homepage')
    setShowLogin(false)
  }
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <Card color='transparent' shadow={false}>
            <Typography variant='h4' color='blue-gray' onSubmit = { submitHandler }>
              Sign Up
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              Enter your details to register.
            </Typography>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
              <div className='mb-4 flex flex-col gap-6'>
                <Input
                  size='lg'
                  label='First Name'
                  placeholder='FirstName'
                  {...register('firstname', {
                    required: 'Firstname is required'
                  })}
                  onChange={e => setName(e.target.value)}
                  value={firstname}
                />
                <Input
                  size='lg'
                  label='Last Name'
                  {...register('lastname', {
                    required: 'Lastname is required'
                  })}
                  onChange={e => setName(e.target.value)}
                  value={lastname}
                />
                <Input
                  size='lg'
                  label='Phone Number'
                  {...register('phonenumber', {
                    required: 'Phone Number is required'
                  })}
                />
                <Input size='lg' label='Email' />
                <Input
                  type='password'
                  size='lg'
                  label='Password'
                  placeholder='Password'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                />
                <Input type='password' size='lg' label='Confirm Password'
                  placeholder='Confirm Password'
                  {...register('confirmPassword', {
                    required: 'Confirm Password ',
                    validate: value => value === password || 'Password does not match'
                  })}
                />
                <Input size='lg' label='Address' />
                <Input type='select' size='lg' label='Gender'>
                  <option>Female</option>
                  <option>Male</option>
                </Input>
                <Input type='select' size='md' label='profession'>
                  <option>Quality Engineer</option>
                  <option>Software Engineer</option>
                  <option>Administrator</option>
                  <option> Human Resource Manager</option>
                </Input>
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
        </div>
      </div>
    </div>
  )
}
export default Register
