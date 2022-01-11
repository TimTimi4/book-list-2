import { GET_BOOKS_LOADING, GET_BOOKS_SUCCESS, GET_BOOKS_FAILED, CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILED, CREATE_BOOK_LOADING } from '../constants'

export const getBooks = () => (dispatch) => {
  dispatch({ type: GET_BOOKS_LOADING })
  fetch('http://localhost:1717/books')
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: GET_BOOKS_SUCCESS, data })
    })
    .catch(() => {
      dispatch({ type: GET_BOOKS_FAILED, error: 'error load books' })
    })
}

export const addBook = (body) => (dispatch) => {
  dispatch({ type: CREATE_BOOK_LOADING })
  fetch('http://localhost:1717/books/create', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatch({ type: CREATE_BOOK_SUCCESS })
      dispatch(getBooks())
    })
    .catch(() => {
      dispatch({ type: CREATE_BOOK_FAILED, error: 'error add book' })
    })
}
