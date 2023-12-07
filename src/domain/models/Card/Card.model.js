import { PrintType } from 'src/domain/constants'

export const BASE_VALUE = 100.0
export class Card {
  constructor(data = {}) {
    this.id = data.id
    this.numero = data.numero ?? ''
    this.onFire = data.onFire ?? false
    this.nivelImpresion = data.nivelImpresion ?? ''
    this.nombreApellido = data.nombreApellido ?? ''
    this.valoracionJugador = data.valoracion ?? 0
  }

  static fromJson = (cardata) => new Card(cardata)

  get JSONCreateModifyCard() {
    return {
      numero: this.numero,
      nombreApellido: this.nombreApellido,
      onFire: this.onFire,
      nivelImpresion: this.nivelImpresion,
    }
  }

  get title() {
    return this.nombreApellido
  }

  get content() {
    return {
      numero: this.numero,
      onFire: this.onFire,
      cantidadImpresa: this.nivelImpresion,
    }
  }

  get footer() {
    return 'Valoración: ' + this.totalValoration
  }

  get tipo() {
    return 'Figuritas'
  }

  get totalValoration() {
    return this.valoracionJugador + this.baseValoration
  }

  get baseValoration() {
    return BASE_VALUE * this.onFireMultiplier() * this.evenMultiplier() * this.printMultiplier()
  }

  onFireMultiplier = () => (this.onFire ? 1.2 : 1.0)

  evenMultiplier = () => (this.numero % 2 == 0 ? 1.1 : 1.0)

  printMultiplier = () => (this.nivelImpresion.toLowerCase() === PrintType.baja ? 1.0 : 0.85)

  get isNew() {
    return this.id === undefined
  }
}
