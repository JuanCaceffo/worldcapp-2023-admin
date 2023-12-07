import 'src/styles/button.css'
import { HandleError } from 'utils/HandleError/HandleError'
import { Searchbar } from 'components/Searchbar/Searchbar'
import { CustomSearch } from 'models/CustomSearch/CustomSearch.model'
import { CardBase } from 'components/CardBase/CardBase'
import { useNavigate, useLocation } from 'react-router-dom'
import { useOnInit } from 'hooks/useOnInit'
import { GentTestId } from 'utils/GenTestId/GenTestId'
import { useState } from 'react'
import { Button } from '@mui/material'
import { TeamsModal } from 'pages/OneForAll/modals/TeamsModal'

const notNavigable = ["/selecciones"]

export const OneForAll = ({ service, contentComponent = null }) => {
  const [elements, setElements] = useState([])
  const [modalAction, setModalAction] = useState({ showModal: false, newEntity: true, id: -1 })
  const navigate = useNavigate()
  const loc = useLocation().pathname

  const getAll = async (filter = new CustomSearch()) => {
    try {
      const elements$ = await service.getAll(filter)
      setElements(elements$)
    } catch (e) {
      HandleError(e, navigate)
    }
  }

  useOnInit(() => {
    getAll()
  })

  const redirect = (id = -1) => {
    if(isNavigable()){
      id === -1 ? navigate(`${loc}/nuevo`) : navigate(`${loc}/${id}/editar`)
    }
    id === -1 ? setModalAction({showModal: true, newEntity: true, id: -1}) : setModalAction({showModal: true, newEntity: false, id})
  }

  const isNavigable = () => !notNavigable.includes(loc)

  const handleDelete = async (id) => {
    try {
      await service.delete(id)
      await getAll()
    } catch (e) {
      HandleError(e, navigate)
    }
  }

  const handleModalClose = ({refresh = false}) => {
    setModalAction({ ...modalAction, showModal: false })
    refresh && getAll()
  }

  return (
    <>
      <Searchbar getFilterCards={getAll} />
      {elements.map((element, index) => 
        <CardBase
          key={index}
          element={element}
          contentComponent={contentComponent ? contentComponent(element.content) : null}
          onEditClick={redirect}
          onDelete={handleDelete}
          testid={GentTestId.generate('card', index, elements.length)}
        />
      )}
      <Button
        className="button button--circle button--icon button--icon-large button--float"
        onClick={() => redirect(-1)}
      >
        +
      </Button>
      {
        modalAction.showModal && <TeamsModal onClose={handleModalClose} action={modalAction} />
      }
    </>
  )
}
