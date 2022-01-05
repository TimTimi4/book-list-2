import styled from 'styled-components'
import { useReducer, useEffect } from 'react'
import Theme from './styles/theme'
import Header from './components/Header'
import Container from './components/Container'
import Btn from './components/Button'
import BooksRow from './components/BooksRow'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'

const StyledBtn = styled(Btn)`
  margin: 30px 30px 0px auto;
  `

const App = () => {
  const initialState = {
    books: [],
    createModal: {
      isShow: false,
      form: {
        name: '',
        author: '',
      },
    },
    editModal: {
      isShow: false,
      form: {
        name: '',
        author: '',
        isFavorite: false,
      },
    },
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'CREATE_MODAL_SET_SHOW':
        return {
          ...state,
          createModal: {
            isShow: action.isShow,
            form: initialState.createModal.form,
          },
        }
      case 'EDIT_MODAL_SET_SHOW':
        return {
          ...state,
          editModal: {
            isShow: action.isShow,
            form: initialState.createModal.form,
          },
        }
      case 'CREATE_MODAL_CHANGE_FORM':
        return {
          ...state,
          createModal: {
            ...state.createModal,
            form: {
              ...state.createModal.form,
              [action.fieldName]: action.value,
            },
          },
        }
      case 'EDIT_MODAL_CHANGE_FORM':
        return {
          ...state,
          editModal: {
            ...state.editModal,
            form: {
              ...state.editModal.form,
              [action.fieldName]: action.value,
            },
          },
        }
      case 'GET_BOOKS_SUCCESS':
        return {
          ...state,
          books: action.data,
        }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const getBooks = () => {
    fetch('http://localhost:1717/books')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'GET_BOOKS_SUCCESS', data }))
  }
  useEffect(() => {
    getBooks()
  }, [])

  const handleClickFavorite = (book) => {
    fetch(`http://localhost:1717/books/update/${book.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFavorite: !book.isFavorite }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
  }

  const handleFillCreateForm = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'CREATE_MODAL_CHANGE_FORM',
      fieldName: name,
      value,
    })
  }

  const addBook = () => {
    fetch('http://localhost:1717/books/create', {
      method: 'POST',
      body: JSON.stringify(state.createModal.form),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
    dispatch({ type: 'CREATE_MODAL_SET_SHOW', isShow: false })
  }

  const handleOpenEditModal = (book) => {
    dispatch({ type: 'EDIT_MODAL_SET_SHOW', isShow: true })
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM',
      fieldName: 'name',
      value: book.name,
    })
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM', fieldName: 'author', value: book.author })
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM', fieldName: 'isFavorite', value: book.isFavorite })
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM', fieldName: 'id', value: book.id })
  }

  const handleFillEditForm = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM',
      fieldName: name,
      value,
    })
  }

  const handleClickFavoriteEditModal = () => {
    dispatch({ type: 'EDIT_MODAL_CHANGE_FORM', fieldName: 'isFavorite', value: !state.editModal.form.isFavorite })
  }

  const saveEdit = () => {
    const body = {
      ...state.editModal.form,
    }
    delete body.id
    fetch(`http://localhost:1717/books/update/${state.editModal.form.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
    dispatch({ type: 'EDIT_MODAL_SET_SHOW', isShow: false })
  }

  const deleteBook = (book) => {
    fetch(`http://localhost:1717/books/delete/${book.id}`, {
      method: 'DELETE',
    })
      .then(() => getBooks())
  }

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn
        onClick={() => dispatch({ type: 'CREATE_MODAL_SET_SHOW', isShow: true })}
      >Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          books={state.books}
          onEdit={handleOpenEditModal}
          handleClickFavorite={handleClickFavorite}
          deleteBook={deleteBook}
        />
        <CreateModal
          isShow={state.createModal.isShow}
          onClose={() => dispatch({ type: 'CREATE_MODAL_SET_SHOW', isShow: false })}
          handleFillCreateForm={handleFillCreateForm}
          addBook={addBook}
        />
        <EditModal
          isShow={state.editModal.isShow}
          onClose={() => dispatch({ type: 'EDIT_MODAL_SET_SHOW', isShow: false })}
          editState={state.editModal.form}
          handleFillEditForm={handleFillEditForm}
          saveEdit={saveEdit}
          handleClickFavoriteEditModal={handleClickFavoriteEditModal}
        />
      </Container>
    </Theme>
  )
}

export default App
