import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Theme from './styles/theme'
import Header from './components/Header'
import Container from './components/Container'
import Btn from './components/Button'
import BooksRow from './components/BooksRow'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import { getBooks } from './store/actions/books'

const StyledBtn = styled(Btn)`
  margin: 30px 30px 0px auto;
  `

const App = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books)
  console.log(books)

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn>Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          books={books.books}
          // onClick={() => setShowEditModal(true)}
        />
        <CreateModal />
        <EditModal />
      </Container>
    </Theme>
  )
}

export default App
