export const formToJSON = (data) => {
  const formData = {}

  data.forEach((value, key) => {
    formData[key] = value
  })
  return formData
}

export const splitDireccion = (direccion) => {
  var partes = direccion.split(/\s+/)
  var altura = partes.pop()
  var nombreCalle = partes.join(' ')
  return [nombreCalle, altura]
}