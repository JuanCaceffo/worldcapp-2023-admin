import './LogoComponent.css'
import { Box } from '@mui/material'

export const LogoComponent = () => {
  return (
    <Box className="logo">
      <img className="logo__img logo__img--shadow" src="/src/assets/logo-icon.png" alt="WorldCapp Logotipo" />
      <section className="logo__text">
        <span className="logo__first-part">world</span>
        <span className="logo__center-dot">.</span>
        <span className="logo__last-part">capp</span>
      </section>
    </Box>
  )
}

export const LogoFooterComponent = () => {
  const fecha = new Date()
  const handleClick = () => {
    window.location.href = 'https://www.facebook.com/'
  }
  return (
    <Box className="login-footer">
      <i className="login-footer__icon fab fa-square-facebook" onClick={handleClick} />
      <span className="logo__first-part">world</span>
      <span className="logo__center-dot">.</span>
      <span className="logo__last-part">capp | {fecha.getFullYear().toString()}</span>
    </Box>
  )
}
