import { Dashboard } from 'pages/Dashboard/Dashboard'
import { Layout } from 'components/Layout/Layout'
import { dashboardService } from 'services/Dashboard/DashboardService'
import { dashboardServiceGetAllMock } from 'mocks/DashboardServiceMock'
import { beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

vi.spyOn(dashboardService, 'getAll').mockResolvedValue(dashboardServiceGetAllMock)

describe('Dashboard Test', () => {
  beforeEach(async () => {
    await act(async () =>
      render(
        <Router>
          <Layout content={<Dashboard />} headerTitle="dashboard" />
        </Router>,
      ),
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('El Dashboard se renderiza correctamente y se puede encontrar una card en el mismo', async () => {
    const firstCard = await screen.findByTestId('figuritas-ofrecidas-box')
    expect(firstCard).toBeTruthy()
  })

  it('El título es el esperado', async () => {
    const titleElement = await screen.findByTestId('header-title')
    expect(titleElement.textContent).toBe('dashboard')
  })

  it('Se muestra correctamente el icono en la card del dashboard', async () => {
    const iconElement = await screen.findByTestId('figuritas-ofrecidas-icon')
    expect(iconElement.classList.contains('fa-id-badge')).toBe(true)
  })

  it('Se muestra correctamente la cantidad en la card del dashboard', async () => {
    const numberElement = await screen.findByTestId('figuritas-ofrecidas-number')
    expect(numberElement.textContent).toBe('30')
  })

  it('Se muestra correctamente la descripción en la card del dashboard', async () => {
    const textElement = await screen.findByTestId('figuritas-ofrecidas-description')
    expect(textElement.textContent).toBe('Figuritas Ofrecidas')
  })
})
