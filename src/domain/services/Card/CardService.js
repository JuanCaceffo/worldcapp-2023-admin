import axios from 'axios'
import { REST_SERVER_URL } from '../../constants'
import { Card } from 'src/domain/models/Card/Card.model'
import { HandleError } from 'src/utils/HandleError/HandleError'

class CardService {
  getAll = async (search) => {
    const figuritasJSON = await axios.get(`${REST_SERVER_URL}/figuritas`, { params: search })
    return figuritasJSON.data.map((figurita) => Card.fromJson(figurita))
  }

  getById = async (id) => {
    const figuritasJSON = await axios.get(`${REST_SERVER_URL}/figurita/${id}`)
    return Card.fromJson(figuritasJSON.data)
  }

  update = async (card, id) => {
    await axios.patch(`${REST_SERVER_URL}/figurita/modificar/${id}`, card.JSONCreateModifyCard)
  }

  delete = async (id) => {
    try {
      const response$ = await axios.delete(`${REST_SERVER_URL}/figurita/eliminar/${id}`)
      console.log('Elemento eliminado correctamente', response$.data)
    } catch (err) {
      HandleError(err)
    }
  }

  create = async (card) => {
    await axios.post(`${REST_SERVER_URL}/figurita/crear`, card.JSONCreateModifyCard)
  }

  getDataCreateCards = async () => (await axios.get(`${REST_SERVER_URL}/figuritas/data-create-figurita`)).data
}

export const cardService = new CardService()
