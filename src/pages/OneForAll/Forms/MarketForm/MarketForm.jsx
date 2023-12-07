import { FormActions } from 'components/FormActions/FormActions'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Market } from 'models/Market/Market.model'
import { marketService } from 'services/Market/MarketService'
import { Fragment, useState } from 'react'
import { BusinessType } from 'domain/constants'
import { Validator, IsEmpty, IsNotAddress, IsNegative, IsNotInRange } from 'models/Validations/InputValidation'
import { useOnInit } from 'hooks/useOnInit'
import { Box, TextField } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { HandleError } from 'src/utils/HandleError/HandleError'

const InputType = {
  TextField: 'TextField',
  Select: 'Select',
}

export const MarketForm = () => {
  const { id } = useParams()
  const [market, setMarket] = useState(new Market())
  const [errors, setErrors] = useState({})
  const loc = useLocation().pathname
  const navigate = useNavigate()

  const fields = {
    nombre: {
      name: 'Nombre',
      type: InputType.TextField,
      value: market.nombre,
      className: 'field',
      elementProps: {},
      options: {},
    },
    direccion: {
      name: 'Dirección',
      type: InputType.TextField,
      value: market.direccion,
      className: 'field',
      elementProps: {},
      options: {},
    },
    geoX: {
      name: 'Coordenada X',
      type: InputType.TextField,
      value: market.geoX,
      className: 'field',
      elementProps: { type: 'number', step: 0.00001, min: -90, max: 90 },
      options: {},
    },
    geoY: {
      name: 'Coordenada Y',
      type: InputType.TextField,
      value: market.geoY,
      className: 'field',
      elementProps: { type: 'number', step: 0.00001, min: -90, max: 90 },
      options: {},
    },
    stock: {
      name: 'Sobres Disponibles',
      type: InputType.TextField,
      value: market.stock,
      className: 'field',
      elementProps: { type: 'number', min: 0 },
      options: {},
    },
    pedidosPendientes: {
      name: 'Pedidos Pendientes',
      type: InputType.TextField,
      value: market.pedidosPendientes,
      className: 'field',
      elementProps: { type: 'number', min: 0 },
      options: {},
    },
    tipoPuntoDeVenta: {
      name: 'Pedidos Pendientes',
      type: InputType.Select,
      value: market.tipoPuntoDeVenta,
      className: 'field',
      elementProps: { native: true },
      options: BusinessType,
    },
  }

  useOnInit(() => {
    id && getCardToEdit()
  })

  const getCardToEdit = async () => {
    const card = await marketService.getById(id)
    setMarket(card)
  }

  const handleChange = (key, value) => {
    market[key] = value
    generarNuevoMarket(market)
  }

  const generarNuevoMarket = (market) => {
    const nuevoMarket = Object.assign(new Market(), market)
    setMarket(nuevoMarket)
  }

  const handleClickConfirm = () => {
    validateFields()
  }

  const validateFields = () => {
    setErrors({})
    const validator = new Validator([
      new IsEmpty(market),
      new IsNotAddress({ direccion: market.direccion }),
      new IsNegative({ stock: market['stock'], pedidosPendientes: market['pedidosPendientes'] }),
      new IsNotInRange({ geoX: market['geoX'], geoY: market['geoY'] }, -100, 100),
    ])

    validator.runValidations()
    setErrors((prev) => ({ ...prev, ...validator.getErrors() }))
    !validator.hasErrors() && saveData()
  }

  const saveData = async () => {
    try {
      loc.endsWith('nuevo') ? await marketService.create(market) : await marketService.update(market)
      navigate('/puntos-de-venta')
      enqueueSnackbar(`Punto de venta ${loc.endsWith('nuevo') ? 'creado' : 'modificado'} con exito`, {
        variant: 'success',
      })
    } catch (error) {
      HandleError(error, navigate)
    }
  }

  return (
    <>
      {Object.entries(fields).map(([field, props], index) => 
        <Fragment key={index}>
          {props.type === InputType.TextField ? 
            <Box key={index} className="field__container">
              <TextField
                key={index}
                className={props.className}
                inputProps={{ ...props.elementProps }}
                value={props.value}
                label={props.name}
                error={!!errors[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                data-testid={
                  index === 0
                    ? `${props.className}-first`
                    : index === fields.length - 1
                      ? `${props.className}-last`
                      : `${props.className}-${index}`
                }
              />
              <span className="field__error">{errors[field]}</span>
            </Box>
            : props.type === InputType.Select ? 
              <TextField
                key={index}
                className={props.className}
                value={props.value}
                select
                SelectProps={{ ...props.elementProps }}
                onChange={(e) => handleChange(field, e.target.value)}
                data-testid={
                  index === 0
                    ? `${props.className}-first`
                    : index === Object.keys(fields).length - 1
                      ? `${props.className}-last`
                      : `${props.className}-${index}`
                }
              >
                {Object.entries(props.options).map(([clave, value]) => 
                  <option key={clave} value={value}>
                    {value}
                  </option>
                )}
              </TextField>
              : 
              <></>
          }
        </Fragment>
      )}
      <FormActions
        handleLeftButtonClick={handleClickConfirm}
        handleRightButtonClick={() => {
          navigate('/puntos-de-venta')
        }}
      />
    </>
  )
}
