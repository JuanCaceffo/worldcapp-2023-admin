export class Player {
  constructor(playerdata) {
    this.id = playerdata.id
    this.nombre = playerdata.nombre ?? ''
    this.apellido = playerdata.apellido ?? ''
    this.fechaNacimiento = playerdata.fechaNacimiento ?? 'mm/dd/yyyy'
    this.altura = playerdata.altura ?? ''
    this.peso = playerdata.peso ?? ''
    this.nroCamiseta = playerdata.nroCamiseta ?? ''
    this.seleccion = playerdata.seleccion ?? ''
    this.debut = playerdata.debut ?? 'mm/dd/yyyy'
    this.posicion = playerdata.posicion ?? ''
    this.posiciones = playerdata.posiciones ?? []
    this.esLider = playerdata.esLider ?? false
    this.cotizacion = playerdata.cotizacion ?? ''
  }

  static fromJson = (playerdata) => new Player(playerdata)

  get JSONCreateModifyPlayer() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento,
      altura: this.altura,
      peso: this.peso,
      nroCamiseta: this.nroCamiseta,
      seleccion: this.seleccion,
      debut: this.debut,
      posicion: this.posicion,
      posiciones: this.posiciones,
      esLider: this.esLider,
      cotizacion: this.cotizacion,
    }
  }

  get title() {
    return this.nombre + ' ' + this.apellido
  }

  get content() {
    return {
      fechaNacimiento: this.formatDate(this.fechaNacimiento),
      nroCamiseta: this.nroCamiseta,
      seleccion: this.seleccion,
      posicion: this.posicion,
      altura: this.altura,
      peso: this.peso,
    }
  }

  get footer() {
    return 'U$S ' + this.cotizacion
  }

  get tipo() {
    return 'Jugadores'
  }

  formatDate = (date) => {
    const date$ = date.split('-')
    return date$[2] + '-' + date$[1] + '-' + date$[0]
  }

  get isPolivalente() {
    return this.posicion === 'Polivalente'
  }

  get isNew() {
    return this.id === undefined
  }

  isOnlyText(text) {
    return !/^[a-zA-Z]*$/.test(text)
  }

  validateNroCamiseta(value) {
    return value < 0 || value > 100
  }

  isNegative(value) {
    return value < 0
  }

  isAInvalidYear(value) {
    console.log(new Date().getFullYear())
    return value < 1300 || value > new Date().getFullYear()
  }

  get isNotComplete() {
    return (
      !this.nombre ||
      !this.apellido ||
      this.fechaNacimiento === 'mm/dd/yyyy' ||
      !this.altura ||
      !this.cotizacion ||
      !this.peso ||
      !this.nroCamiseta ||
      !this.seleccion ||
      !this.debut ||
      !this.posicion ||
      (this.isPolivalente && !this.posiciones.length) ||
      !this.cotizacion
    )
  }
}
