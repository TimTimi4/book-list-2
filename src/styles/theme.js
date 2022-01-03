import { ThemeProvider } from 'styled-components'
import GlobalStyle from './global'

const theme = {
  colors:
    {
      header: '#E5E5E5',
      sidebar: '#EDEDED',
      primaryText: '#B1B1B1',
      secondaryText: '#EB434D',
      unactiveIcon: '#B1B1B1',
    },
  sizes:
    {
      blocks:
        {
          container: '930px',
          modalwindow: '340px',
          button: '120px',
        },
      elems:
        {
          icons: '40px',
        },
      fonts:
        {
          maintitle: '40px',
          subtitle: '20px',
          primaryText: '15px',
          btn: '20px',
        },
    },
  fonts:
    {
      primary: "'Roboto', sans-serif;",
    },
  media:
    {
      mobileS: '(max-width: 320px)',
      mobileM: '(max-width: 375px)',
      mobileL: '(max-width: 425px)',
      tablet: '(max-width: 768px)',
      laptop: '(max-width: 1024px)',
      laptopL: '(max-width: 1440px)',
      desktop: '(max-width: 2560px)',
    },
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
)

export default Theme
