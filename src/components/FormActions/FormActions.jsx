import { Button } from '@mui/material'
import './FormActions.css'

export const FormActions = ({
  leftButtonText = 'Confirmar',
  rightButtonText = 'Cancelar',
  leftButtonProps = {},
  rightButtonProps = {},
  handleLeftButtonClick = () => {},
  handleRightButtonClick = () => {},
}) => {
  return (
    <footer className="form__actions">
      <Button
        className='button button--primary button--halfwidth'
        variant="contained"        
        type="submit"
        {...leftButtonProps}
        onClick={handleLeftButtonClick}
      >
        {leftButtonText}
      </Button>
      <Button        
        className='button button--primary button--halfwidth button--outlined'
        {...rightButtonProps}
        onClick={handleRightButtonClick}
      >
        {rightButtonText}
      </Button>
    </footer>
  )
}
