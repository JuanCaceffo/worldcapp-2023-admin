import axios from 'axios'
import { REST_SERVER_URL } from '../../constants'
import { Player } from 'src/domain/models/Player/Player.model'

class PlayerService {
  getAll = async (search) => {
    const playersJson = await axios.get(`${REST_SERVER_URL}/jugadores`, { params: search })
    return playersJson.data.map((player) => Player.fromJson(player))
  }

  getById = async (id) => {
    const playerJson = await axios.get(`${REST_SERVER_URL}/jugador/${id}`)
    return new Player(playerJson.data)
  }

  update = async (player, id) => {
    await axios.patch(`${REST_SERVER_URL}/jugador/${id}/modificar`, player.JSONCreateModifyPlayer)
  }

  delete = async (id) => {
    await axios.delete(`${REST_SERVER_URL}/jugador/${id}/eliminar`)
  }

  create = async (player) => {
    await axios.post(`${REST_SERVER_URL}/jugador/crear`, player.JSONCreateModifyPlayer)
  }

  positions = async () => {
    const response = axios.get(`${REST_SERVER_URL}/jugador/posiciones`)
    return (await response).data
  }
}

export const playerService = new PlayerService()
