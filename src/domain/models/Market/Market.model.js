import { BusinessType } from 'src/domain/constants'
import { splitDireccion } from 'utils/serializers'

export class Market {
  constructor(storedata = {}) {
    this.id = storedata.id ?? -1
    this.nombre = storedata.nombre ?? ''
    this.tipoPuntoDeVenta = storedata.tipoPuntoDeVenta ?? BusinessType.Kiosco
    this.direccion = storedata.direccion ? `${storedata.direccion.calle} ${storedata.direccion.altura}` : ''
    this.geoX = storedata.direccion ? this.splitGeo(storedata.direccion.ubiGeografica)[0] : 0.0
    this.geoY = storedata.direccion ? this.splitGeo(storedata.direccion.ubiGeografica)[1] : 0.0
    this.stock = storedata.stockSobres ?? 0
    this.pedidosPendientes = storedata.pedidosPendientes ?? 0
  }

  static fromJson = (storedata) => new Market(storedata)

  get title() {
    return this.nombre
  }

  get content() {
    return {
      direccion: this.direccion,
      stock: this.stock + ' sobres',
    }
  }

  get footer() {
    return 'Tipo ' + this.tipoPuntoDeVenta
  }

  get tipo() {
    return this.tipoPuntoDeVenta
  }

  static toJson = (marketData) => {
    return {
      id: marketData.id,
      nombre: marketData.nombre,
      tipoPuntoDeVenta: marketData.tipoPuntoDeVenta,
      direccion: {
        calle: splitDireccion(marketData.direccion)[0],
        altura: splitDireccion(marketData.direccion)[1],
        ubiGeografica: `x: ${marketData.geoX}, y: ${marketData.geoY}`,
      },
      stockSobres: marketData.stock,
      pedidosPendientes: marketData.pedidosPendientes,
    }
  }

  splitGeo(geo) {
    const geos = geo.split(',')
    const geoX = parseFloat(geos[0].split('x: ')[1])
    const geoY = parseFloat(geos[1].split('y: ')[1])
    return [geoX, geoY]
  }
}
