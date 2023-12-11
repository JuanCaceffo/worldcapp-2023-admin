import axios from "axios"
import { REST_SERVER_URL } from "src/domain/constants" 
import { Team } from "src/domain/models/TeamModel/Team.model"
import { HandleError } from "src/utils/HandleError/HandleError"

class NationalTeamService {
  
  getAllNames = async () =>{
    return (await axios.get(`${REST_SERVER_URL}/selecciones/pais`)).data
  }

  getAll = async (search) => {
    const teamsJson = await axios.get(`${REST_SERVER_URL}/selecciones`, { params: search })
    return teamsJson.data.map((team) => Team.fromJson(team))
  }
  
  getById = async (id) => {
    const teamsJson = await axios.get(`${REST_SERVER_URL}/selecciones/${id}`)
    return Team.fromJson(teamsJson.data)
  }

  delete = async (id) => {
    try {      
      const response = await axios.delete(`${REST_SERVER_URL}/selecciones/${id}/eliminar`)
      console.log('Elemento eliminado correctamente', response.data)
    } catch (err) {
      HandleError(err)      
    }
  }

  create = async (team) => {
    try {
      const teamJSON = Team.toJson(team)
      await axios.post(`${REST_SERVER_URL}/selecciones/crear`, teamJSON)
    } catch (err) {
      HandleError(err) 
    }
  }

  update = async (team, id) => {
    try {
      const teamJSON = Team.toJson(team)
      await axios.put(`${REST_SERVER_URL}/selecciones/${id}/modificar`, teamJSON)
    } catch (err) {
      HandleError(err) 
    }
  }

  getConfederaciones = async () => (await axios.get(`${REST_SERVER_URL}/confederaciones`)).data
}

export const nationalTeamService = new NationalTeamService()