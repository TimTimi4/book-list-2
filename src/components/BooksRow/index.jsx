import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import styled from 'styled-components'
import Like from '../Icons/Like'
import Trash from '../Icons/Trash'
import Edit from '../Icons/Edit'

const books = [
  {
    id: 'tt2462gd3',
    name: 'Гарри Поттер и философский камень',
    author: 'Джоан Роулинг',
    isFavorite: false,
  },
  {
    id: '373yyr74y',
    name: 'Гарри Поттер и тайная комната',
    author: 'Джоан Роулинг',
    isFavorite: false,
  },
  {
    id: '56734jfjjf',
    name: 'Охота на овец',
    author: 'Харуки Мураками',
    isFavorite: true,
  },
  {
    id: '74hg47wjuGG',
    name: 'Война и мир',
    author: 'Лев Толстой',
    isFavorite: false,
  },
  {
    id: '36ggf64gd',
    name: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    isFavorite: false,
  },
]

const StyledLIkeIcon = styled(Like)`
  color: ${({ theme }) => theme.colors.unactiveIcon};
  cursor: pointer;
`

const StyledEditIcon = styled(Edit)`
  color: ${({ theme }) => theme.colors.unactiveIcon};
  cursor: pointer;
`
const StyledTrashIcon = styled(Trash)`
  color: ${({ theme }) => theme.colors.unactiveIcon};
  cursor: pointer;
`

const BooksRow = ({ onClick }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Book Name</TableCell>
          <TableCell align="left">Author</TableCell>
          <TableCell align="center">Like</TableCell>
          <TableCell align="center">Edit</TableCell>
          <TableCell align="center">Delete</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {books.map((book) => (
          <TableRow
            key={book.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{book.name}</TableCell>
            <TableCell align="left">{book.author}</TableCell>
            <TableCell align="center"><StyledLIkeIcon /></TableCell>
            <TableCell align="center"><StyledEditIcon onClick={onClick} /></TableCell>
            <TableCell align="center"><StyledTrashIcon /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default BooksRow
