import { Market } from '../models/Market/Market.model'

export const marketServiceGetAllMock = [
  {
    id: 0,
    nombre: 'El Inútil',
    tipoPuntoDeVenta: 'Kiosco',
    direccion: {
      calle: 'Vaya a saber donde vive',
      altura: 666,
      ubiGeografica:
        'x: -31.231230688916781446096138097345829010009765625, y: -57.1335906889167830513542867265641689300537109375',
    },
    stockSobres: 0,
    pedidosPendientes: 0,
    distancia: 0,
    precioSobres: 0,
  },
  {
    id: 1,
    nombre: 'La Scaloneta',
    tipoPuntoDeVenta: 'Kiosco',
    direccion: {
      calle: 'rodriguez peña',
      altura: 211,
      ubiGeografica:
        'x: -34.43123068891677718283972353674471378326416015625, y: -58.1335906889167830513542867265641689300537109375',
    },
    stockSobres: 0,
    pedidosPendientes: 1,
    distancia: 0,
    precioSobres: 0,
  },
  {
    id: 2,
    nombre: 'Señor Kioskero',
    tipoPuntoDeVenta: 'Kiosco',
    direccion: {
      calle: 'Urquiza',
      altura: 31,
      ubiGeografica:
        'x: -34.11119065556780327597152790986001491546630859375, y: -58.1111189167800006316610961221158504486083984375',
    },
    stockSobres: 20,
    pedidosPendientes: 0,
    distancia: 0,
    precioSobres: 0,
  },
].map((market) => Market.fromJson(market))