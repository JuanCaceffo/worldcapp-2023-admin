import './CardForm.css'
import { useOnInit } from 'src/hooks/useOnInit'
import { cardService } from 'src/domain/services/Card/CardService'
import { HandleError } from 'utils/HandleError/HandleError'
import { Card } from 'src/domain/models/Card/Card.model'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Checkbox, FormControlLabel, MenuItem, TextField, Typography } from '@mui/material'
import { FormActions } from 'src/components/FormActions/FormActions'
import { enqueueSnackbar } from 'notistack'

export const CardForm = () => {
  const [players, setPlayers] = useState([])
  const [printsLevel, setPrintsLevel] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  const [card, setCard] = useState(new Card())

  useOnInit(async () => {
    try {
      const { jugadores, levelPrints } = await cardService.getDataCreateCards()
      setPlayers(jugadores)
      setPrintsLevel(levelPrints.map((level) => level.nombre))

      const setCardInfo = async (id) => {
        const response = await cardService.getById(id)
        setCard(new Card({ ...response.JSONCreateModifyCard, id: id }))
      }

      if (params.id !== undefined) {
        setCardInfo(params.id)
      }
      setPlayers(jugadores)
      setPrintsLevel(levelPrints.map((level) => level.nombre))
    } catch (error) {
      HandleError(error, navigate)
    }
  })

  useEffect(() => {
    console.log(card)
  })

  const setCardValue = (key, value) => {
    setCard((prev) => new Card({ id: card.id, ...prev.JSONCreateModifyCard, [key]: value }))
  }

  const handleBack = () => {
    navigate('/figuritas')
  }

  const handleChange = (value, key) => {
    setCard(new Card({ ...card.JSONCreateModifyCard, [key]: value }))
    setCardValue(key, value)
  }
  const handleSave = async () => {
    try {
      card.isNew ? await cardService.create(card) : await cardService.update(card, card.id)
      handleBack()
      enqueueSnackbar(`Figurita ${card.isNew ? 'creada' : 'modificada'} con exito`, { variant: 'success' })
    } catch (error) {
      HandleError(error, navigate)
    }
  }

  return (
    <>
      <TextField
        className="field"
        label="Número de Figurita"
        inputProps={{ type: 'number', min: 0 }}
        value={card.numero}
        onChange={(e) => handleChange(e.target.value, 'numero')}
        data-testid="figurita-numero"
      />

      <TextField
        select
        className="field"
        label="Jugador"
        value={card.nombreApellido}
        onChange={(e) => {
          handleChange(e.target.value, 'nombreApellido')
        }}
        data-testid="figurita-nombre"
      >
        {players.map((player) => 
          <MenuItem
            className="field__option"
            key={`${player.nombre} ${player.apellido}`}
            value={`${player.nombre} ${player.apellido}`}
          >
            {`${player.nombre} ${player.apellido}`}
          </MenuItem>
        )}
      </TextField>

      <FormControlLabel
        className="checkbox"
        control={<Checkbox checked={card.onFire} onChange={(e) => handleChange(e.target.checked, 'onFire')} />}
        label="On Fire"
        data-testid="figurita-onfire"
      />

      <TextField
        className="field"
        label="Nivel de impresion"
        select
        value={card.nivelImpresion}
        onChange={(e) => handleChange(e.target.value, 'nivelImpresion')}
        data-testid="figurita-impresion"
      >
        {printsLevel.map((printLevel) => 
          <MenuItem className="field__option" key={printLevel} value={printLevel}>
            {printLevel}
          </MenuItem>
        )}
      </TextField>

      <TextField className="field" inputProps={{ type: 'url' }} label="Imagen Jugador" data-testid="figurita-imagen" />

      <Box className="text__container">
        <Typography className="text text--strong text--uppercase text--2col">
          Valoración base: {parseFloat(card.baseValoration.toFixed(2))}
        </Typography>
        <Typography className="text text--strong text--uppercase text--2col">
          Valoración total: {parseFloat(card.totalValoration.toFixed(2))}
        </Typography>
      </Box>

      <FormActions handleLeftButtonClick={handleSave} handleRightButtonClick={handleBack} />
    </>
  )
}