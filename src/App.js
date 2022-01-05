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
    isShowCreateModal: false,
    isShowEditModal: false,
    books: [],
    formCreateModal: {
      name: '',
      author: '',
    },
    editState: null,
  }
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_SHOW_CREATE_MODAL':
        return {
          ...state,
          isShowCreateModal: action.payload,
        }
      case 'SET_SHOW_EDIT_MODAL':
        return {
          ...state,
          isShowEditModal: action.payload,
        }
      case 'GET_BOOKS':
        return {
          ...state,
          books: action.payload,
        }
      case 'FILL_CREATE_MODAL':
        return {
          ...state,
          formCreateModal: action.payload,
        }
      case 'ADD_BOOK':
        return {
          ...state,
          body: action.payload,
        }
      case 'FILL_EDIT_MODAL':
        return {
          ...state,
          editState: action.payload,
        }
      case 'OPEN_EDIT_MODAL':
        return {
          ...state,
          editState: action.payload,
        }
      case 'SAVE_EDIT_BOOK':
        return {
          ...state,
          body: action.payload,
        }
      case 'LIKE_BOOK':
        return {
          ...state,
          editState: action.payload,
        }
      case 'DELETE_BOOK':
        return {
          ...state,
          editState: action.payload,
        }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const getBooks = () => {
    fetch('http://localhost:1717/books')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'GET_BOOKS', payload: data }))
  }

  useEffect(() => {
    getBooks()
  }, [])

  const handleFillCreateModal = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'FILL_CREATE_MODAL',
      payload: {
        ...state.formCreateModal,
        [name]: value,
      },
    })
  }

  const addBook = () => {
    dispatch({ type: 'ADD_BOOK' })
    fetch('http://localhost:1717/books/create', {
      method: 'POST',
      body: JSON.stringify(state.formCreateModal),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
    dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: false })
  }

  const handleEdit = (book) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: book })
    dispatch({ type: 'SET_SHOW_EDIT_MODAL', payload: true })
  }

  const handleFillEditModal = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'FILL_EDIT_MODAL',
      payload: {
        ...state.editState,
        [name]: value,
      },
    })
  }

  const handleClickFavoriteEditModal = () => {
    dispatch({ type: 'FILL_EDIT_MODAL',
      payload: {
        ...state.editState,
        isFavorite: !state.editState.isFavorite,
      },
    })
  }

  const handleClickFavorite = (book) => {
    dispatch({ type: 'LIKE_BOOK' })
    fetch(`http://localhost:1717/books/update/${book.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isFavorite: !book.isFavorite }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
  }

  const saveEdit = () => {
    dispatch({ type: 'SAVE_EDIT_BOOK' })
    const body = {
      ...state.editState,
    }
    delete body.id
    fetch(`http://localhost:1717/books/update/${state.editState.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => getBooks())
    dispatch({ type: 'SET_SHOW_EDIT_MODAL', payload: false })
  }

  const deleteBook = (book) => {
    dispatch({ type: 'SAVE_EDIT_BOOK' })
    fetch(`http://localhost:1717/books/delete/${book.id}`, {
      method: 'DELETE',
    })
      .then(() => getBooks())
  }

  return (
    <Theme>
      <Header logo="BookList" title="Books" />
      <StyledBtn
        onClick={() => dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: true })}
      >Add Book
      </StyledBtn>
      <Container>
        <BooksRow
          books={state.books}
          onEdit={handleEdit}
          handleClickFavorite={handleClickFavorite}
          deleteBook={deleteBook}
        />
        <CreateModal
          isShow={state.isShowCreateModal}
          onClose={() => dispatch({ type: 'SET_SHOW_CREATE_MODAL', payload: false })}
          handleFillCreateModal={handleFillCreateModal}
          addBook={addBook}
        />
        <EditModal
          isShow={state.isShowEditModal}
          onClose={() => dispatch({ type: 'SET_SHOW_EDIT_MODAL', payload: false })}
          editState={state.editState}
          handleFillEditModal={handleFillEditModal}
          saveEdit={saveEdit}
          handleClickFavoriteEditModal={handleClickFavoriteEditModal}
        />
      </Container>
    </Theme>
  )
}

export default App
