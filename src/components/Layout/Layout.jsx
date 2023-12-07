import { NavBar } from '../Navbar/Navbar'
import { Typography } from '@mui/material'
import './Layout.css'

export const Layout = ({ content, headerTitle = 'Sin título' }) => {
  return (
    <main className="layout">
      <header className="layout__header">
        <Typography data-testid="header-title" className="layout__header-title" variant="h2">
          {headerTitle}
        </Typography>
      </header>
      <article className="layout__content">{content}</article>
      <footer className="layout__footer">
        <NavBar />
      </footer>
    </main>
  )
}
