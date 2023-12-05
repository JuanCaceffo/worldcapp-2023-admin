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
            : 'fa-futbol'
  }

  const handleConfirm = (id) => {
    setDeleteDialogOpen(false)
    onDelete(id)
  }

  return (
    <>
      <Card className="card-base" data-testid={testid}>
        <Box className="card-base__header">
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
        props={{ title: 'Confirmar eliminación', message: '¿Confirma desea borrar el punto de venta?' }}
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => handleConfirm(element.id)}
      />
    </>
  )
}
