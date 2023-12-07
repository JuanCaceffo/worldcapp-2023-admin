import './Searchbar.css'
import { Box, IconButton, InputBase } from '@mui/material'
import { CustomSearch } from 'src/domain/models/CustomSearch/CustomSearch.model'
import { Search } from '@mui/icons-material'

export const Searchbar = ({ getFilterCards }) => {
  const filter = new CustomSearch()

  const handleChange = (value) => {
    filter.palabraClave = value
  }

  return (
    <Box className="searchbar">
      <InputBase className="searchbar__input" onChange={(event) => handleChange(event.target.value)} />
      <IconButton className="searchbar__button" onClick={() => getFilterCards(filter)}>
        <Search className="searchbar__icon" />
      </IconButton>
    </Box>
  )
}
