import './TeamsModal.css'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { FormActions } from 'src/components/FormActions/FormActions'
import { useOnInit } from 'src/hooks/useOnInit'
import { nationalTeamService } from 'src/domain/services/NationalTeam/NationalTeamService'
import { useState } from 'react'
import { Team } from 'src/domain/models/TeamModel/Team.model'
import { HandleError } from 'src/utils/HandleError/HandleError'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

export const TeamsModal = ({ onClose, action }) => {
  const [team, setTeam] = useState(new Team())
  const [confederaciones, setConfederaciones] = useState([])
  const navigate = useNavigate()

  useOnInit(async () => {
    const data = await nationalTeamService.getConfederaciones()
    setConfederaciones(data)
    if (action.id !== -1) {
      setTeam(await nationalTeamService.getById(action.id))
    }
  })

  const handleChange = (key, value) => {
    team[key] = value
    generarNuevoTeam(team)
  }

  const generarNuevoTeam = (team) => {
    const nuevoteam = Object.assign(new Team(), team)
    setTeam(nuevoteam)
  }

  const handleSave = async () => {
    try {
      action.newEntity ? await nationalTeamService.create(team) : await nationalTeamService.update(team, action.id)
      enqueueSnackbar(`Seleccion ${action.newEntity ? 'creada' : 'modificada'} con exito`, { variant: 'success' })
      onClose({ refresh: true })
    } catch (error) {
      HandleError(error, navigate)
    }
  }

  const handleTitle = () => action.newEntity ? 'Nueva' : 'Editar'

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="teams-modal">
          <Typography align="center" sx={{ fontSize: 32 }}>{`${handleTitle()} Selección`}</Typography>
          <TextField
            data-testid="input-pais"
            required
            label="Nombre"
            type="text"
            value={team.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
          />
          <TextField
            required
            select
            SelectProps={{ native: true }}
            value={team.confederacion}
            onChange={(e) => handleChange('confederacion', e.target.value)}
          >
            {confederaciones.map((confederacion) => 
              <option key={confederacion}>{confederacion}</option>
            )}
          </TextField>
          <TextField
            data-testid="input-copasDelMundo"
            required
            label="Copas del mundo"
            type="number"
            value={team.copasDelMundo}
            onChange={(e) => handleChange('copasDelMundo', e.target.value)}
          />
          <TextField
            required
            label="Copas confederacion"
            type="number"
            value={team.copasConfederacion}
            onChange={(e) => handleChange('copasConfederacion', e.target.value)}
          />
          <FormActions handleLeftButtonClick={handleSave} handleRightButtonClick={onClose} />
        </Box>
      </Modal>
    </>
  )
}
