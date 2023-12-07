import axios from 'axios'
import { REST_SERVER_URL, iconsDashboard } from '../../constants'
import { Dashboard } from 'src/domain/models/DashBoard/DashBoard.model'

class DashboardService {
  getAll = async () => {
    const dashboardJson = await axios.get(`${REST_SERVER_URL}/dashboard`)
    return dashboardJson.data.map((dashboardBox) => ({...Dashboard.fromJson(dashboardBox),icon:iconsDashboard[dashboardBox.name]}))    
  }
}

export const dashboardService = new DashboardService()
