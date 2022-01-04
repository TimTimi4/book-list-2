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

const StyledLIkeIcon = styled(Like)`
  color: ${({ theme, $isFavorite }) => ($isFavorite ? theme.colors.activeIcon : theme.colors.unactiveIcon)};
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

const BooksRow = ({ onEdit, books, getBooks }) => {
  const handleClick = (book) => {
    fetch(`http://localhost:1717/books/update/${book.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFavorite: !book.isFavorite }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
  }

  const handleDelete = (book) => {
    fetch(`http://localhost:1717/books/delete/${book.id}`, {
      method: 'DELETE',
    })
      .then(() => getBooks())
  }
  return (
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
              key={book.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{book.name}</TableCell>
              <TableCell align="left">{book.author}</TableCell>
              <TableCell align="center"><StyledLIkeIcon
                onClick={() => handleClick(book)}
                $isFavorite={book.isFavorite}
              />
              </TableCell>
              <TableCell align="center"><StyledEditIcon onClick={() => onEdit(book)} /></TableCell>
              <TableCell align="center"><StyledTrashIcon onClick={() => handleDelete(book)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BooksRow
