import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import styled from 'styled-components'

const Logo = styled(Typography)`
  text-transform: uppercase;
`

const Header = ({ logo, title }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Logo variant="h4" component="div" sx={{ flexGrow: 0.7 }}>
          {logo}
        </Logo>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
)

export default Header
