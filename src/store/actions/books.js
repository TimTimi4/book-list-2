import {
  GET_BOOKS_LOADING,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILED,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILED,
  CREATE_BOOK_LOADING,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_LOADING,
  DELETE_BOOK_FAILED,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_LOADING,
  EDIT_BOOK_FAILED } from '../constants'

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

export const setFavorite = (book) => (dispatch) => {
  fetch(`http://localhost:1717/books/update/${book.id}`, {
    method: 'PUT',
    body: JSON.stringify({ isFavorite: !book.isFavorite }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatch(getBooks())
    })
}

export const editBook = (body) => (dispatch) => {
  dispatch({ type: EDIT_BOOK_LOADING })
  const newBody = {
    ...body,
  }
  delete newBody.id
  fetch(`http://localhost:1717/books/update/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(newBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      dispatch({ type: EDIT_BOOK_SUCCESS })
      dispatch(getBooks())
    })
    .catch(() => {
      dispatch({ type: EDIT_BOOK_FAILED, error: 'error add book' })
    })
}

export const deleteBook = (book) => (dispatch) => {
  dispatch({ type: DELETE_BOOK_LOADING })
  fetch(`http://localhost:1717/books/delete/${book.id}`, {
    method: 'DELETE',
  })
    .then(() => {
      dispatch({ type: DELETE_BOOK_SUCCESS })
      dispatch(getBooks())
    })
    .catch(() => {
      dispatch({ type: DELETE_BOOK_FAILED, error: 'error delete book' })
    })
}
