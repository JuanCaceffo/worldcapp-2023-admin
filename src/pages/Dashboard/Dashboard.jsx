import './Dashboard.css'
import { HandleError } from 'utils/HandleError/HandleError'
import { dashboardService } from 'services/Dashboard/DashboardService'
import { DashboardCard } from 'components/DashboardCard/DashboardCard'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from 'hooks/useOnInit'

export const Dashboard = () => {
  const [itemsDashboard, setItemsDashboard] = useState([])
  const navigate = useNavigate()

  useOnInit(async () => {
    try {
      const dataDashboard = await dashboardService.getAll()      
      setItemsDashboard(dataDashboard)      
    } catch (error) {
      HandleError(error, navigate)
    }
  })

  return (
    <>
      {itemsDashboard.map((element, index) =>         
        <DashboardCard key={index} element={element} />
      )}
    </>
  )
}
