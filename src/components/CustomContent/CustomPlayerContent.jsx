import './CustomContent.css'
import '../CardBase/CardBase.css'
import { Box, CardContent, Typography } from '@mui/material'

export const CustomPlayerContent = (jugador) => {
  return (
    <CardContent className="card-content card-content--wrap">
      <Box className="card-content__section">
        <i className="card-content__icon far fa-star" />
        <Typography className="card-content__text">{jugador.fechaNacimiento}</Typography>
      </Box>
      <Box className="card-content__section">
        <i className="card-content__icon far fa-flag" />
        <Typography className="card-content__text">{jugador.seleccion}</Typography>
      </Box>
      
      <Box className="card-content__section card-content__section--3column">
        <i className="card-content__icon fas fa-shirt" />
        <Typography className="card-content__text">{jugador.nroCamiseta}</Typography>
      </Box>
      <span className="card-content__text--pipe" />
      <Box className="card-content__section card-content__section--3column">
        <i className="card-content__icon fas fa-arrows-up-down" />
        <Typography className="card-content__text">{jugador.altura}</Typography>
      </Box>
      <span className="card-content__text--pipe" />
      <Box className="card-content__section card-content__section--3column">
        <i className="card-content__icon fas fa-weight-scale" />
        <Typography className="card-content__text">{jugador.peso}</Typography>
      </Box>
      
      <Box className="card-content__section card-content__section--fullwidth">
        <i className="card-content__icon fas fa-person-running" />
        <Typography className="card-content__text">{jugador.posicion}</Typography>
      </Box>
    </CardContent>
  )
}
