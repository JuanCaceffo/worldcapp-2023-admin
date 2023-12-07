import './CardBase.css'
import { Box, Card, Typography } from '@mui/material'
import { CustomDialog } from '../CustomDialog/CustomDialog'
import { useState } from 'react'
import { ElementType, BusinessType } from 'domain/constants'

export const CardBase = ({ element, contentComponent, onEditClick, onDelete, testid }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const marketIcon = () => {
    return element.tipo === BusinessType.Kiosco
      ? 'fa-store'
      : element.tipo === BusinessType.Libreria
        ? 'fa-book'
        : element.tipo === BusinessType.Supermercado
          ? 'fa-basket-shopping'
          : element.tipo === ElementType.Figuritas
            ? 'fa-id-badge' 
            : element.tipo === ElementType.Jugadores
              ? 'fa-futbol'
              : 'fa-flag'
  }

  const handleConfirm = (id) => {
    setDeleteDialogOpen(false)
    onDelete(id)
  }
  
  return (
    <>
      <Card className={contentComponent ? 'card-base' : 'card-base card-base--nocontent'} data-testid={testid}>
        <Box className={contentComponent ? 'card-base__header' : 'card-base__header card-base__header--noshadow'}>
          <Box className="card-base__title">
            <i
              className={`card-base__icon card-base__icon--large fas ${marketIcon()}`}
              data-testid={`${testid}-icon`}
            />
            <Typography className="card-base__text card-base__text--title" data-testid={`${testid}-title`}>
              {element.title}
            </Typography>
          </Box>
          <Box className="card-base__actions">
            <i
              className="card-base__icon fas fa-trash-arrow-up fa--hot"
              onClick={() => setDeleteDialogOpen(true)}
              data-testid={`${testid}-delete`}
            />
            <i className="card-base__icon fas fa-pen" onClick={() => onEditClick(element.id)} />
          </Box>
        </Box>
        {contentComponent}
        <Typography
          className="card-base__footer card-base__text card-base__text--upper"
          data-testid={`${testid}-footer`}
        >
          {element.footer}
        </Typography>
      </Card>

      <CustomDialog
        props={{ title: 'Confirmar eliminación', message: 'Esta acción es irreversible. ¿Deseas continuar?' }}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleConfirm(element.id)}
      />
    </>
  )
}
