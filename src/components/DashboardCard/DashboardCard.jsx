import './DashboardCard.css'
import { GentTestId } from 'src/utils/GenTestId/GenTestId'
import { Box } from '@mui/material'

export const DashboardCard = ({ element }) => {
  return (
    <Box data-testid={`${GentTestId.generate(element.name)}-box`} className="dashboard">
      {element.icon}
      <section className="dashboard__info">
        <div data-testid={`${GentTestId.generate(element.name)}-number`} className="dashboard__number">
          {element.quantity}
        </div>
        <div data-testid={`${GentTestId.generate(element.name)}-description`} className="dashboard__desc">
          {element.name}
        </div>
      </section>
    </Box>
  )
}
