import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import useInput from '../../hooks/use-input'
import useApi from '../../hooks/use-api'
import { authActions } from '../../store/auth-slice'

import { login } from '../../utils/formFields'

import { Button, Box, TextField } from '@mui/material'

export default function LoginForm() {
  const [formIsValid, setFormIsValid] = useState(false)
  const { data: token, error, callPost: requestLogin } = useApi();
  const emailInput = useInput(login.loginName.validate)
  const passwordInput = useInput(login.password.validate)

  const dispatch = useDispatch();

  const inputs = [
    { ...emailInput, ...login.loginName },
    { ...passwordInput, ...login.password },
  ]

  const inputFields = inputs.map((input, index) => {
    return (
      <TextField
        key={index}
        type={input.type}
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        label={input.label}
        required={input.required}
      />
    )
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    } else {
      const data = {
        email: emailInput.value,
        password: passwordInput.value,
      }
      requestLogin(data, 'user/login')
    }
  }

  useEffect(() => {
    setFormIsValid(emailInput.isValid && passwordInput.isValid)
  }, [emailInput.isValid, passwordInput.isValid])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('TODO_TOKEN', token)
      dispatch(authActions.login(token))
    }
    if (error) {
      // dispatch(usiActions.setNotification(error))
      console.log(error)
    }
  }, [token, error, dispatch]);

  return (
    <Box
      onSubmit={handleLogin}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      {inputFields}
      <Button type="submit" sx={{ display: 'block', mx: 'auto' }}>
        Login
      </Button>
    </Box>
  )
}