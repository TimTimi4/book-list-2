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
import { getBooks, addBook, deleteBook, editBook, setFavorite } from './store/actions/books'
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

  const handleClickFavorite = (book) => {
    dispatch(setFavorite(book))
  }

  const handleOpenModal = (modalName, isShow) => {
    dispatch(showModal(modalName, isShow))
  }

  const saveNewBook = () => {
    dispatch(addBook(modal.createBook.form))
    dispatch(showModal('createBook', false))
  }

  const handleEditBook = (book) => {
    dispatch(showModal('editBook', true))
    dispatch(changeModalForm('editBook', 'name', book.name))
    dispatch(changeModalForm('editBook', 'author', book.author))
    dispatch(changeModalForm('editBook', 'id', book.id))
    dispatch(changeModalForm('editBook', 'isFavorite', book.isFavorite))
  }

  const clickFavoriteEditForm = () => {
    dispatch(changeModalForm('editBook', 'isFavorite', !modal.editBook.form.isFavorite))
  }

  const saveEditBook = () => {
    dispatch(editBook(modal.editBook.form))
    dispatch(showModal('editBook', false))
  }

  const handleChangeModalForm = (modalName, fieldName, value) => {
    dispatch(changeModalForm(modalName, fieldName, value))
  }

  const handleDeleteBook = (book) => {
    dispatch(deleteBook(book))
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
          books={books.books}
          handleDeleteBook={handleDeleteBook}
          handleEditBook={handleEditBook}
          handleClickFavorite={handleClickFavorite}
        />
        <CreateModal
          isShow={modal.createBook.isShow}
          onClose={() => handleOpenModal('createBook', false)}
          handleChangeModalForm={(e) => handleChangeModalForm('createBook', e.target.name, e.target.value)}
          saveNewBook={saveNewBook}
        />
        <EditModal
          isShow={modal.editBook.isShow}
          onClose={() => handleOpenModal('editBook', false)}
          handleChangeModalForm={(e) => handleChangeModalForm('editBook', e.target.name, e.target.value)}
          editState={modal.editBook.form}
          saveEditBook={saveEditBook}
          clickFavoriteEditForm={clickFavoriteEditForm}
        />
      </Container>
    </Theme>
  )
}

export default App
