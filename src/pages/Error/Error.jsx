import './Error.css'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const AXIOSNOTERROR = 'No message available'

export const Error = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const data = state ?? { status: 404, message: 'El recurso no ha sido encontrado' }

  //Si existe mensaje predeterminado desde el back y no es de status 500 muestra el message
  const showMessage = () => data.message && data?.message !== AXIOSNOTERROR && !is500Error()

  const isNetworkError = () => data.status === 0
  const is500Error = () => data.status === 500
  const is404Error = () => data.status === 404

  const getMessage = () => (showMessage() ? data.message : data.errorMessage)

  const getButtonText = () => (isNetworkError() ? 'Actualizar' : 'Volver')

  const pickImage = () => (is500Error() || is404Error() ? data.status : 'unexpected')

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="display-error">
      <h1>Oops... ha ocurrido un error</h1>
      <img
        className="display-error__image"
        src={`/images/${pickImage()}-error.png`}
        alt={`Error ${data.message ?? data.errorMessage}`}
        data-testid="error-image"
      />
      <h2>{getMessage()}</h2>
      <Button className="display-error__button" onClick={goBack}>
        {getButtonText()}
      </Button>
    </div>
  )
}
