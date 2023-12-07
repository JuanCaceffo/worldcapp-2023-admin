import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './Navbar'

describe('NavBar Component', () => {
  test('Clickear en el botón de navegación te lleva a la ruta correspondiente', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )

    const buttonElement = screen.queryAllByTestId('figuritas-button')[1]
    await fireEvent.click(buttonElement)

    expect(window.location.pathname).toBe('/figuritas')
  })
  test('Clickear en el cuarto botón de navegación te lleva a la ruta correspondiente', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )

    const buttonElement = screen.queryAllByTestId('figuritas-button')[3]
    await fireEvent.click(buttonElement)

    expect(window.location.pathname).toBe('/puntos-de-venta')
  })
  test('Cambia el estilo del icono al navegar de /home a /jugadores', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )

    await screen.findByTestId('navbar')
    const buttonElement1 = screen.queryAllByTestId('figuritas-button')[1]
    await fireEvent.click(buttonElement1)
    
    const initialIcon = screen.getByTestId('navbar').querySelector('.fa-shirt')
    expect(initialIcon).toHaveStyle({ color: 'rgba(0, 0, 0, 0.6)' })


    const buttonElement2 = screen.queryAllByTestId('figuritas-button')[2]
    await fireEvent.click(buttonElement2)


    await screen.findByTestId('navbar')

    const updatedIcon = screen.getByTestId('navbar').querySelector('.fa-shirt')
    expect(updatedIcon).toHaveStyle({ color: 'rgb(25, 118, 210)' })
  })

  
})







