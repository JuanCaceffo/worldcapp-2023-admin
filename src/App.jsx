import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

// Import Pages
import { Login } from 'pages/Login/Login'
import { Dashboard } from 'src/pages/Dashboard/Dashboard'

// Import Styles
import './App.css'
import { Error } from 'pages/Error/Error'
import { SnackbarProvider } from 'notistack'
import { FormPlayer } from 'pages/OneForAll/Forms/FormPlayer/FormPlayer'
import { MarketForm } from 'pages/OneForAll/Forms/MarketForm/MarketForm'
// import { Teams } from 'pages/Teams/Teams'
import { OneForAll } from 'pages/OneForAll/OneForAll'
import { marketService } from 'services/Market/MarketService'
import { CustomMarketContent } from 'components/CustomContent/CustomMarketContent'
import { cardService } from 'services/Card/CardService'
import { CustomCardContent } from 'components/CustomContent/CustomCardContent'
import { playerService } from 'services/Player/PlayerService'
import { CustomPlayerContent } from 'components/CustomContent/CustomPlayerContent'
import { nationalTeamService } from 'services/NationalTeam/NationalTeamService'
import { Layout } from 'components/Layout/Layout'
import { CardForm } from 'pages/OneForAll/Forms/CardForm/CardForm'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Layout content={<Dashboard />} headerTitle="dashboard" />} />
      <Route
        path="figuritas"
        element={
          <Layout
            content={<OneForAll key={0} service={cardService} contentComponent={CustomCardContent} />}
            headerTitle="Figuritas"
          />
        }
      />
      <Route
        path="figuritas/nuevo"
        element={<Layout content={<CardForm />} headerTitle="Nueva figurita" />}
      />
      <Route
        path="figuritas/:id/editar"
        element={<Layout content={<CardForm />} headerTitle="Modificar figurita" />}
      />
      <Route
        path="jugadores"
        element={
          <Layout
            content={<OneForAll key={1} service={playerService} contentComponent={CustomPlayerContent} />}
            headerTitle="Jugadores"
          />
        }
      />
      <Route path="jugadores/nuevo" element={<Layout content={<FormPlayer />} headerTitle="Nuevo jugador" />}></Route>
      <Route
        path="jugadores/:id/editar"
        element={<Layout content={<FormPlayer />} headerTitle="Editar un jugador" />}
      />
      <Route
        path="puntos-de-venta"
        element={
          <Layout
            content={<OneForAll key={2} service={marketService} contentComponent={CustomMarketContent} />}
            headerTitle="Puntos de venta"
          />
        }
      />
      <Route
        path="puntos-de-venta/nuevo"
        element={<Layout content={<MarketForm />} headerTitle="Nuevo punto de venta" />}
      />
      <Route
        path="puntos-de-venta/:id/editar"
        element={<Layout content={<MarketForm />} headerTitle="Editar punto de venta" />}
      />
      <Route
        path="selecciones"
        element={<Layout content={<OneForAll key={3} service={nationalTeamService} />} headerTitle="Selecciones" />}
      />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <SnackbarProvider className="snackbar" />
    </>
  )
}

export default App
