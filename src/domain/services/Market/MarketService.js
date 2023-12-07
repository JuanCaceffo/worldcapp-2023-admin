import axios from 'axios'
import { REST_SERVER_URL } from '../../constants'
import { Market } from 'src/domain/models/Market/Market.model'
import { HandleError } from 'src/utils/HandleError/HandleError'

class MarketService {
  getAll = async (search) => {
    const marketsJson = await axios.get(`${REST_SERVER_URL}/puntos-de-venta`, { params: search })
    return marketsJson.data.map((market) => Market.fromJson(market))
  }

  getById = async (id) => {
    const marketJson = await axios.get(`${REST_SERVER_URL}/punto-de-venta/${id}`)
    return Market.fromJson(marketJson.data)
  }

  delete = async (id) => {
    try {
      const response$ = await axios.delete(`${REST_SERVER_URL}/punto-de-venta/${id}/eliminar`)
      console.log('Elemento eliminado correctamente', response$.data)
    } catch (err) {
      HandleError(err)
    }
  }

  create = async (market) => {
    try {
      const MarketJSON = Market.toJson(market)
      const response = await axios.post(`${REST_SERVER_URL}/punto-de-venta/nuevo`, MarketJSON)
      console.log('Market created successfully', response.data)
    } catch (err) {
      HandleError(err)
    }
  }

  update = async (market) => {
    try {
      const MarketJSON = Market.toJson(market)
      console.log('editado', market.id)
      const response = await axios.put(`${REST_SERVER_URL}/punto-de-venta/editar`, MarketJSON)
      console.log('Market updated successfully', response.data)
    } catch (err) {
      HandleError(err)
    }
  }
}

export const marketService = new MarketService()
