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
import { getBooks, addBook } from './store/actions/books'
import { showModal, changeModalForm } from './store/actions/modal'

const StyledBtn = styled(Btn)`
  margin: 30px 30px 0px auto;
  `

const App = () => {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books)
  const modal = useSelector((state) => state.modal)

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  const handleOpenModal = (modalName, isShow) => {
    dispatch(showModal(modalName, isShow))
  }

  const handleChangeModalForm = (modalName, fieldName, value) => {
    dispatch(changeModalForm(modalName, fieldName, value))
  }

  const createBook = () => {
    dispatch(addBook(modal.createBook.form))
    dispatch(showModal('createBook', false))
  }

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn
        onClick={() => handleOpenModal('createBook', true)}
      >
        Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          onClick={() => handleOpenModal('editBook', true)}
          books={books.books}
        />
        <CreateModal
          isShow={modal.createBook.isShow}
          onClose={() => handleOpenModal('createBook', false)}
          handleChangeModalForm={(e) => handleChangeModalForm('createBook', e.target.name, e.target.value)}
          createBook={createBook}
        />
        <EditModal
          isShow={modal.editBook.isShow}
          onClose={createBook}
        />
      </Container>
    </Theme>
  )
}

export default App
