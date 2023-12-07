import { render, screen, act, within, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'
import { OneForAll } from './OneForAll'
import { Layout } from 'components/Layout/Layout'
import { CustomMarketContent } from 'src/components/CustomContent/CustomMarketContent'
import { marketService } from 'src/domain/services/Market/MarketService'
import { marketServiceGetAllMock } from 'mocks/MarketServiceMock'

vi.spyOn(marketService, 'getAll').mockResolvedValue(marketServiceGetAllMock)

describe('Puntos de venta Test', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <Router>
          <Layout
            content={<OneForAll service={marketService} contentComponent={CustomMarketContent} />}
            headerTitle="Puntos de venta"
          />
        </Router>,
      ),
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('El Listado de puestos de venta se renderiza correctamente y se puede encontrar una card en el mismo', async () => {
    const lastCard = await screen.findByTestId('card-last')
    expect(lastCard).toBeTruthy()
  })

  it('El título de la card toma el valor esperado', async () => {
    const cardTitle = await screen.findByTestId('card-last-title')
    expect(cardTitle.textContent.toLowerCase()).toBe('señor kioskero')
  })

  it('La dirección de la card toma el valor esperado', async () => {
    const card = await screen.findByTestId('card-first')
    const cardTitle = await within(card).findByTestId('card-direccion')
    expect(cardTitle.textContent.toLowerCase()).toBe('vaya a saber donde vive 666')
  })

  it('El stock de la card toma el valor esperado', async () => {
    const card = await screen.findByTestId('card-last')
    const cardStock = await within(card).findByTestId('card-stock')
    expect(cardStock.textContent.toLowerCase()).toBe('20 sobres')
  })

  it('El tipo de la card toma el valor esperado', async () => {
    const cardFooter = await screen.findByTestId('card-last-footer')
    expect(cardFooter.textContent.toLowerCase()).toBe('tipo kiosco')
  })

  it('El icono renderizado es el correcto', async () => {
    const cardIcon = await screen.findByTestId('card-last-icon')
    expect(cardIcon.classList.contains('fa-store')).toBeTruthy()
  })

  it('Al hacer click en el tachito se abre el modal de confirmación', async () => {
    const cardDelete = await screen.findByTestId('card-first-delete')
    fireEvent.click(cardDelete)
    const modalDelete = screen.getByTestId('modal-delete')
    expect(modalDelete).toBeTruthy()
  })
})
