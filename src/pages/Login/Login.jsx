import './Login.css'
import { Box, TextField, Button, InputLabel } from '@mui/material'
import { userService } from 'services/User/UserService'
import { DEBUG_MODE } from 'domain/constants'
import { LogoComponent, LogoFooterComponent } from 'components/LogoComponent/LogoComponent'
import { HandleError } from 'utils/HandleError/HandleError'
import { formToJSON } from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // Solicitud de login al service

    try {
      await userService.login(formToJSON(data)).then(() => {
        setRedirect(true)
      })
    } catch (error) {
      HandleError(error, navigate)
    }
    // Reporte de valores que vienen el el formulario
    DEBUG_MODE && report(data)
  }

  const report = (data) => {
    console.log({
      userName: data.get('userName'),
      password: data.get('password'),
    })
  }

  if (redirect) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="layout__content layout__content--login">
      <LogoComponent />
      <Box component="form" onSubmit={handleSubmit} noValidate className="login-form__actions">
        <InputLabel className="field__label" htmlFor="userName">
          Usuario
        </InputLabel>
        <TextField className="field" fullWidth id="userName" name="userName" autoFocus required />
        <InputLabel className="field__label" htmlFor="password">
          Contraseña
        </InputLabel>
        <TextField className="field field--white" fullWidth id="password" name="password" type="password" />
        <Button className="button button--primary button--login" type="submit" fullWidth variant="contained">
          Ingresar
        </Button>
      </Box>
      <LogoFooterComponent />
    </div>
  )
}
