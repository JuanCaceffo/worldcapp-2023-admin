export class GentTestId {
  static generate(string, id = -1, size = -1) {
    let resultado = string.toLowerCase().replace(/\s/g, '-')
    
    id !== -1
      ? id === 0
        ? resultado = `${string}-first`
        : id === size - 1
          ? resultado = `${string}-last`
          : resultado = `${string}-${id}`
      : ''
       
    return resultado
  }
}