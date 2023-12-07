# Funcionamiento

Manejador de errores, navega a la page /error en caso de no tener conexión con el servidor, de obtener un error 500 o de no encontrar el recurso (404). Para el resto de casos se obtiene un pop up con el error obtenido

# Uso

Importar en el componente a utilizar useNavigate() y pasarlo junto al error al HandleError

# Ejemplo

const Home = () => {
  const navigate = useNavigate()
  
  useOnInit(async ()=> {
    try {
      ...Logica requerida...
    } catch (error) {
      HandleError(error, navigate)
    }
  })
  
  # Opcional

  No se recomienda por discrepancia entre las otras paginas pero en el caso de querer posicionar el notistack se puede pasar un parametro opcional

  HandleError(error, navigate, {vertical: 'top', horizontal: 'right'})

  Vertical      Horizontal
  top           left
  bottom        center
                right
