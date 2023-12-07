import './CustomContent.css'
import '../CardBase/CardBase.css'
import { Box, CardContent, Typography } from '@mui/material'

export const CustomMarketContent = (content) => {
  return (
    <CardContent className="card-content card-content--wrap">
      <Box className="card-content__section card-content__section--fullwidth">
        <i className="card-content__icon fas fa-location-dot" />
        <Typography className="card-content__text card-content__text--title" data-testid="card-direccion">
          {content.direccion}
        </Typography>
      </Box>
      <Box className="card-content__section">
        <i className="card-content__icon far fa-envelope" />
        <Typography className="card-content__text" data-testid="card-stock">
          {content.stock}
        </Typography>
      </Box>
    </CardContent>
  )
}
