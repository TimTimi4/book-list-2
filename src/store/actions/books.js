import { GET_BOOKS_LOADING, GET_BOOKS_SUCCESS, GET_BOOKS_FAILED } from '../constants'

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
