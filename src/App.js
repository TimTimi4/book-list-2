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
import { showModal } from './store/actions/modal'

const StyledBtn = styled(Btn)`
  margin: 30px 30px 0px auto;
  `

const App = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books)
  const modal = useSelector((state) => state.modal)
  console.log(modal)
  console.log(books)

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  const showCreateModal = (modalName, isShow, form) => {
    dispatch(showModal(modalName, isShow, form))
  }

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn onClick={() => showCreateModal(modal.createBook, true, modal.createBook.form)}>
        Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          books={books.books}
        />
        <CreateModal />
        <EditModal />
      </Container>
    </Theme>
  )
}

export default App
