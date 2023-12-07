import './FormPlayer.css'
import { FormActions } from 'components/FormActions/FormActions'
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import { nationalTeamService } from 'src/domain/services/NationalTeam/NationalTeamService'
import { playerService } from 'src/domain/services/Player/PlayerService'
import { Player } from 'src/domain/models/Player/Player.model'
import { useOnInit } from 'hooks/useOnInit'
import { HandleError } from 'utils/HandleError/HandleError'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const FormPlayer = () => {
  const [player, setPlayer] = useState(new Player({}))
  const [playerErrors, setPlayerErrors] = useState({
    nombre: '',
    apellido: '',
    altura: '',
    peso: '',
    debut: '',
    nroCamiseta: '',
    cotizacion: '',
  })
  const [nationalTeamOptions, setNationalTeamOptions] = useState([])
  const [positions, setPositions] = useState({ posicionesGenericas: [], posiciones: [] })
  const params = useParams()
  const navigate = useNavigate()

  useOnInit(() => {
    const setNationalTeams = async () => {
      const data = await nationalTeamService.getAllNames()
      setNationalTeamOptions(data)
    }
    const setPositionsPlayer = async () => {
      setPositions(await playerService.positions())
    }
    const setPlayerInfo = async (id) => {
      const response = await playerService.getById(id)
      setPlayer(new Player({ ...response.JSONCreateModifyPlayer, id: id }))
    }

    if (params.id !== undefined) setPlayerInfo(params.id)
    setNationalTeams()
    setPositionsPlayer()
  })

  const setPlayerValue = (key, value) => {
    setPlayer((prev) => new Player({ id: player.id, ...prev.JSONCreateModifyPlayer, [key]: value }))
  }

  const handleChange = (key, value, objectValidation) => {
    setPlayerValue(key, value)
    if (objectValidation) textFieldValidation(value, key, objectValidation)
  }

  const handleBack = () => {
    navigate('/jugadores')
  }

  const sendData = async () => {
    if (!player.isPolivalente) setPlayerValue('posiciones', [])
    try {
      player.isNew ? await playerService.create(player) : await playerService.update(player, player.id)
      handleBack()
      enqueueSnackbar(player.isNew ? 'Jugador creado exitosamente' : 'Cambios guardados con exito', {
        variant: 'success',
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      })
    } catch (error) {
      HandleError(error, navigate)
    }
  }

  const textFieldValidation = (value, key, { conditionFunction, message }) => {
    setPlayerErrors({
      ...playerErrors,
      [key]: conditionFunction(value) ? message : '',
    })
  }

  const hasErrors = Object.values(playerErrors).some((error) => !!error)

  const setRenderPolivalente = () => {
    return player.isPolivalente
      ? {
        textLabel: 'Posiciones',
        key: 'posiciones',
        props: {
          select: true,
          SelectProps: {
            multiple: true,
          },
        },
        children: positions.posicionesGenericas.map((position) => 
          <MenuItem key={position} value={position}>
            {position}
          </MenuItem>
        ),
      }
      : { element: <></> }
  }

  const inputsData = [
    {
      textLabel: 'Nombre',
      key: 'nombre',
      objectValidation: { conditionFunction: player.isOnlyText, message: 'El nombre debe contener solo texto' },
    },
    {
      textLabel: 'Apellido',
      key: 'apellido',
      objectValidation: { conditionFunction: player.isOnlyText, message: 'El apellido debe contener solo texto' },
    },
    { element: <hr /> },
    {
      textLabel: 'Fecha de nacimineto',
      key: 'fechaNacimiento',
      props: { type: 'date' },
    },
    {
      textLabel: 'Altura',
      key: 'altura',
      props: { type: 'number' },
      objectValidation: { conditionFunction: player.isNegative, message: 'La altura debe ser positiva' },
    },
    {
      textLabel: 'Peso',
      key: 'peso',
      props: { type: 'number' },

      objectValidation: { conditionFunction: player.isNegative, message: 'El peso debe ser positiva' },
    },
    { element: <hr /> },
    {
      textLabel: 'Nro Camiseta',
      key: 'nroCamiseta',
      props: { type: 'number' },
      objectValidation: {
        conditionFunction: player.validateNroCamiseta,
        message: 'El numero de camiseta debe estar entre 0 y 100',
      },
    },
    {
      textLabel: 'Seleccion',
      key: 'seleccion',
      props: {
        select: true,
      },
      children: nationalTeamOptions.map((nationalTeam) => 
        <MenuItem key={nationalTeam} value={nationalTeam}>
          {nationalTeam}
        </MenuItem>
      ),
    },
    {
      textLabel: 'Año de debut en la seleccion',
      key: 'debut',
      props: {
        type: 'number',
      },
      objectValidation: {
        conditionFunction: player.isAInvalidYear,
        message: 'Ingrese un año entreo 1300 y el año actual',
      },
    },
    {
      textLabel: 'Posicion',
      key: 'posicion',
      props: {
        select: true,
      },
      children: positions.posiciones.map((position) => 
        <MenuItem key={position} value={position}>
          {position}
        </MenuItem>
      ),
    },
    setRenderPolivalente(),
    { element: <hr /> },

    {
      element: 
        <FormControlLabel
          control={
            <Checkbox checked={!!player['esLider']} onChange={(e) => handleChange('esLider', e.target.checked)} />
          }
          label="Es Lider"
        />
      ,
    },
    {
      textLabel: 'Cotizacion',
      key: 'cotizacion',
      props: { type: 'number' },
      objectValidation: { conditionFunction: player.isNegative, message: 'La cotizacion debe ser positiva' },
    },
  ]

  return (
    <main className="form-player form-player__container">
      <form className="form-player__form">
        {inputsData.map((data, index) => 
          <section className="form-player__container" key={index}>
            {data.element ?? 
              <TextField
                label={data.textLabel}
                error={!!playerErrors[data.key]}
                helperText={!!playerErrors[data.key] && playerErrors[data.key]}
                value={player[data.key]}
                onChange={(e) => handleChange(data.key, e.target.value, data.objectValidation)}
                {...data.props}
                className={'field ' + data.className}
                InputProps={{
                  className: 'inputField',
                  ...data.InputProps,
                }}
              >
                {data.children}
              </TextField>
            }
          </section>
        )}
      </form>
      <FormActions
        handleLeftButtonClick={sendData}
        handleRightButtonClick={handleBack}
        leftButtonProps={{ disabled: player.isNotComplete || hasErrors }}
      />
    </main>
  )
}
