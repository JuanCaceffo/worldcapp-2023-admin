export const DEBUG_MODE = false
export const REST_SERVER_URL = 'http://localhost:9000'
export const USER_KEY_STORAGE = 'userLogedID'

export const BusinessType = {
  Kiosco: 'Kiosco',
  Libreria: 'Libreria',
  Supermercado: 'Supermercado',  
}

export const ElementType = {
  Jugadores: 'Jugadores',
  Figuritas: 'Figuritas',
}

export const PrintType = {
  baja: 'baja',
  media: 'media',
  alta: 'alta',
}

export const iconsDashboard = {  
  "Figuritas Ofrecidas": <i data-testid="figuritas-ofrecidas-icon" className="dashboard__icon fas fa-id-badge" style={{color: 'var(--color-tertiary)'}}/>,
  "Figuritas Faltantes": <i data-testid="figuritas-faltantes-icon" className="dashboard__icon fas fa-id-badge" style={{color: 'var(--color-hot)'}}/>,
  "Puntos de Venta": <i data-testid="puntos-venta-icon" className="dashboard__icon fas fa-store" style={{color: '#62208d'}}/>,
  "Usuarios Activos": <i data-testid="usuarios-icon" className="dashboard__icon fas fa-user" style={{color: '#25982c'}}/>,
  "Selecciones Activas":<i data-testid="selecciones-icon" className="dashboard__icon fas fa-flag" style={{color: '#3d84ff'}}/>
}