import './NavBar.css'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

const navigationButtons = [
  { path: '/dashboard', icon: <i className="navbar__icon fas fa-house-chimney" /> },
  { path: '/figuritas', icon: <i className="navbar__icon fas fa-id-badge" /> },
  { path: '/jugadores', icon: <i className="navbar__icon fas fa-shirt" /> },
  { path: '/puntos-de-venta', icon: <i className="navbar__icon fas fa-store" /> },
  { path: '/selecciones', icon: <i className="navbar__icon fas fa-flag" /> },
  { path: '/login', icon: <i className="navbar__icon fas fa-right-from-bracket" /> },
]

export const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [value, setValue] = useState(location.pathname)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(newValue)
  }

  useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  return (
    <BottomNavigation
      className="navbar"
      component="nav"
      data-testid="navbar"
      value={value}
      onChange={handleChange}
      showLabels={false}
    >
      {navigationButtons.map((route, index) => 
        <BottomNavigationAction
          data-testid="figuritas-button"
          className="navbar-buttons"
          key={index}
          value={route.path}
          icon={route.icon}
        />
      )}
    </BottomNavigation>
  )
}
